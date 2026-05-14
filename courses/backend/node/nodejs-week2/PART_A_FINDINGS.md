# Part A: SQL Injection - Vulnerability & Fix

## Summary

This document shows how I found and fixed a **SQL Injection vulnerability** in the `/api/snippets` endpoint. The problem was in the `sort` query parameter, which let attackers inject dangerous SQL code.

---

## The Problem

The original code allowed users to pass any value to the `sort` parameter without checking:

```javascript
if ("sort" in req.query) {
  const orderBy = req.query.sort.toString();
  query = query.orderByRaw(orderBy);
}
```

This means an attacker could write: `?sort=title; DROP TABLE snippets;--` and the database would try to delete the table.

---

## Demonstrating the Vulnerability

I tested 3 requests to show the problem:

### Test 1: Normal Request (Should Work)

```
GET http://localhost:3000/api/snippets?sort=title ASC
```

**SQL Generated:** `select * from snippets order by title ASC`
**Result:** Works fine. Returns snippets sorted by title
**Screenshot:** `screenshots/02-vulnerable-console-all-sql-statements.png`

---

### Test 2: DROP TABLE Attack (Very Dangerous!)

```
GET http://localhost:3000/api/snippets?sort=title; DROP TABLE snippets;--
```

**SQL Generated:** `select * from snippets order by title; DROP TABLE snippets;--`
**Result:** The attack code was accepted and executed.
**What Could Happen:** The entire `snippets` table could be deleted.
**Screenshots:**

- `screenshots/03-vulnerable-drop-table-attack-success.png` (Postman request)
- `screenshots/02-vulnerable-console-all-sql-statements.png` (SQL in console)

---

### Test 3: UNION SELECT Attack (Extract Data)

```
GET http://localhost:3000/api/snippets?sort=1) UNION SELECT * FROM users--
```

**SQL Generated:** `select * from snippets order by 1) UNION SELECT * FROM users--`
**Result:** Got a syntax error (attack didn't work perfectly, but shows the intent)
**What Could Happen:** An attacker could extract usernames, emails, or passwords from the `users` table.
**Screenshot:** `screenshots/01-vulnerable-union-attempt.png`

---

## The Fix

I created a **validation middleware** that checks the `sort` parameter before it reaches the database:

### Middleware Code (`middleware/validateSort.js`)

```javascript
export const validateSort = (allowedColumns = []) => {
  return (req, res, next) => {
    if (!req.query.sort) {
      return next();
    }

    const sortParam = req.query.sort.toString();
    const parts = sortParam.split(" ");
    const column = parts[0];
    let direction = "ASC";

    if (parts.length > 1) {
      direction = parts[1].toUpperCase();
    }

    if (!allowedColumns.includes(column)) {
      return res.status(400).json({
        error: `Invalid sort column. Allowed: ${allowedColumns.join(", ")}`,
      });
    }

    if (!["ASC", "DESC"].includes(direction.toUpperCase())) {
      return res.status(400).json({
        error: "Sort direction must be ASC or DESC",
      });
    }

    req.sortColumn = column;
    req.sortDirection = direction.toUpperCase();
    next();
  };
};
```

### Safe Endpoint Code

```javascript
router.get(
  "/",
  validateSort(["id", "title", "created_at", "is_private"]),
  async (request, response) => {
    try {
      let query = knexInstance.select("*").from("snippets");

      if (request.sortColumn) {
        query = query.orderBy(request.sortColumn, request.sortDirection);
      }

      console.log("SQL", query.toSQL().sql);

      const data = await query;
      response.json({ data });
    } catch (e) {
      console.error(e);
      response.status(500).json({ error: "Internal server error" });
    }
  },
);
```

---

## Testing the Fix

Now when I test the same attacks, they're blocked:

### Test 1: DROP TABLE (Now Blocked)

```
GET http://localhost:3000/api/snippets?sort=title; DROP TABLE snippets;--
```

**Response:** 400 Bad Request

```json
{
  "error": "Invalid sort column. Allowed: id, title, created_at, is_private"
}
```

**Why:** The middleware saw `column = "title;"` which is NOT in the allowed list, so it rejected it.
**Screenshot:** `screenshots/04-secure-drop-table-blocked.png`

---

### Test 2: UNION SELECT (Now Blocked)

```
GET http://localhost:3000/api/snippets?sort=1) UNION SELECT * FROM users--
```

**Response:** 400 Bad Request

```json
{
  "error": "Invalid sort column. Allowed: id, title, created_at, is_private"
}
```

**Why:** The middleware saw `column = "1)"` which is NOT allowed.
**Screenshot:** `screenshots/05-secure-union-attack-blocked.png`

---

### Test 3: Valid Request (Still Works!)

```
GET http://localhost:3000/api/snippets?sort=title ASC
```

**Response:** 200 OK. Returns sorted snippets
**Why:** The middleware saw `column = "title"` (in the whitelist) and `direction = "ASC"` (valid), so it allowed it.
**Screenshot:** `screenshots/06-secure-valid-sort-working.png`

---

## How the Fix Works

The middleware does 3 things:

1. **Whitelist Check** - Only allows specific columns: `id`, `title`, `created_at`, `is_private`
2. **Direction Check** - Only allows `ASC` or `DESC`
3. **Rejects Everything Else** - If either check fails, returns 400 error

This way, even if someone tries to inject SQL code, it gets rejected before it reaches the database.

---

## What I Changed

| What            | Before           | After                                   |
| --------------- | ---------------- | --------------------------------------- |
| Validation      | None             | Whitelist                               |
| SQL Method      | `.orderByRaw()`  | `.orderBy()`                            |
| Allowed Columns | Any              | Only: id, title, created_at, is_private |
| Error Response  | 500 Server Error | 400 Bad Request                         |
