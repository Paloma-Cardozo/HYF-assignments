CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT);

SELECT * FROM user;

CREATE TABLE task (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  created DATETIME NOT NULL,
  updated DATETIME NOT NULL,
  due_date DATETIME,
  status TEXT NOT NULL
);

SELECT * FROM task;

INSERT INTO user (name, email, phone) VALUES
  ('John Doe', '', '+4512345678'),
  ('Jane Smith', 'jane@gmail.com', '+4512345679');

INSERT INTO task (title, description, created, updated, due_date, status) VALUES
  ('Study SQL Queries', 'Practice writing SQL queries for data retrieval', datetime('now'), datetime('now'), '2025-08-02', 'Done'),
  ('Learn Database Design', 'Study ER modeling and normalization', datetime('now'), datetime('now'), '2025-08-10', 'Not started'),
  ('Write Unit Tests', 'Add test coverage for user authentication', datetime('now'), datetime('now'), '2025-08-05', 'Not started'),
  ('Deploy Application', 'Set up production environment', datetime('now'), datetime('now'), '2025-08-20', 'Not started');

CREATE TABLE status (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

INSERT INTO status (name) VALUES ('Not started'), ('In progress'), ('Done');

SELECT * FROM status;

ALTER TABLE task ADD COLUMN status_id INTEGER REFERENCES status(id) DEFAULT 1;

UPDATE task SET status_id = 1 WHERE status = 'Not started';
UPDATE task SET status_id = 2 WHERE status = 'In progress';
UPDATE task SET status_id = 3 WHERE status = 'Done';

ALTER TABLE task DROP COLUMN status;

CREATE TABLE user_task (
  user_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, task_id),
  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE 
);

INSERT INTO user_task (user_id, task_id) VALUES (1, 1);

SELECT * FROM user_task;

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT NOT NULL);

SELECT * FROM category;

CREATE TABLE IF NOT EXISTS task_category (
  task_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (task_id, category_id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM task_category;

-- How many tasks are overdue? (due_date < today)

SELECT COUNT(*) AS tasks_overdue FROM task t
WHERE due_date < date('now')

-- What's the average number of tasks per user?

SELECT ROUND(AVG(task_count)) AS tasks_per_user
FROM (
    SELECT user_id, COUNT(*) AS task_count FROM user_task
    GROUP BY user_id
);

-- Which status has the most tasks?

SELECT s.name, COUNT(*) AS frequent_status FROM task t 
JOIN status s ON t.status_id = s.id  
GROUP BY status_id
ORDER BY frequent_status DESC LIMIT 1;

-- Find the user with the most completed tasks.

SELECT u.name, COUNT(*) AS completed_tasks FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task t ON ut.task_id = t.id
JOIN status s ON t.status_id = s.id  
WHERE s.name = 'Done'
GROUP BY u.id
ORDER BY completed_tasks DESC LIMIT 1;

-- ============================================================
-- Week 2 Assignment — Databases
-- Student: Paloma Cardozo
-- ============================================================

-- Part A, Question 1: Count the total number of tasks in the database

SELECT COUNT(*) FROM task t;

-- Part A, Question 2: Count how many tasks each user has been assigned (include users with zero tasks)

SELECT u.name, COUNT(t.id) FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
LEFT JOIN task t ON ut.task_id = t.id
GROUP BY u.id; 

-- Part A, Question 3: Find the number of tasks per status (e.g., how many are "To Do", "In Progress", "Done")

SELECT s.name, COUNT(t.id) FROM status s
JOIN task t ON s.id = t.status_id
GROUP BY s.id; 

-- Part A, Question 4: Find the user who has the most tasks assigned

SELECT u.name, COUNT(t.id) AS total FROM user u
JOIN user_task ut ON u.id = ut.user_id 
JOIN task t ON ut.task_id = t.id 
GROUP BY u.id
ORDER BY total DESC LIMIT 1; 

-- Part A, Question 5: Calculate the average number of tasks per user (only count users who have at least one task)

SELECT ROUND(AVG(task_count)) AS tasks_per_user
FROM (
    SELECT user_id, COUNT(*) AS task_count FROM user_task
    GROUP BY user_id
);

-- Part A, Question 6: Find the earliest and latest due date across all tasks

SELECT MIN(t.due_date) AS earliest, MAX(t.due_date) AS latest FROM task t
WHERE t.due_date IS NOT NULL;

-- Part A, Question 7: List each category along with the number of tasks it contains, ordered from most to least tasks

SELECT c.name, COUNT (t.id) AS total FROM category c 
LEFT JOIN task_category tc ON tc.category_id = c.id 
LEFT JOIN task t ON tc.task_id = t.id 
GROUP BY c.name 
ORDER BY total DESC;

-- Part A, Question 8: Find all users who have more than 2 tasks assigned to them

SELECT u.name, COUNT(t.id) AS total FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task t ON ut.task_id = t.id 
GROUP BY u.id
HAVING total > 2
ORDER BY total DESC;

-- Part B, Question 1: Spot the Vulnerability

-- 1. Vulnerable input: ' OR '1'='1

-- Generated SQL: SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = '' OR '1'='1')

-- What happens: The condition '1'='1' is ALWAYS TRUE, so the WHERE clause returns ALL rows from the task table.

-- Data returned: All tasks in the database (complete data leak)

-- Why it's dangerous:
-- - String concatenation allows arbitrary SQL injection
-- - Attacker leaks all tasks without knowing user IDs or names
-- - Violates confidentiality: unauthorized access to sensitive data

-- The user input should NEVER be concatenated into SQL

-- 2. Malicious input: '; DELETE FROM task; --

-- How the attack works:
-- 1. ' closes the string that was opened by: WHERE name = '
-- 2. ; terminates the SELECT statement
-- 3. DELETE FROM task; executes a second SQL statement, deleting ALL rows
-- 4. -- comments out the rest of the line (the closing ')

-- Generated SQL breakdown: SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = ''; DELETE FROM task; --')

-- Impact:
-- - Complete data loss (integrity violation)
-- - No way to track who did it (attacker had no account)
-- - The app accepted this from a public, unsanitized search box
-- - This is a DESTRUCTIVE attack (worse than data theft)

-- SQL Injection is a critical vulnerability

-- Part B, Question 2: Fix the Vulnerability

-- function getTasksByUser(userName) {
--   const query = `SELECT * FROM task 
--     WHERE user_id = (
--       SELECT id FROM user 
--       WHERE name = ?
--     )`;
--
--   db.all(query, [userName], (err, rows) => {
--     displayResults(rows);
--   });
-- }

-- Why this is safe:
-- 1. The ? placeholder separates SQL code from user data
-- 2. userName is passed separately in [userName], never concatenated
-- 3. The database library automatically escapes the input
-- 4. User input is treated as a DATA VALUE, not as CODE
-- 5. Injection attacks become impossible

-- Part C, Question 1: Write a transaction that reassigns all tasks from one user to another, then deletes the original user. 

BEGIN TRANSACTION; 
  UPDATE user_task SET user_id = ? WHERE user_id = ?;
  DELETE FROM user WHERE id = ?;
COMMIT; 

-- Part C, Question 2: Write a second transaction that demonstrates a deliberate rollback: attempt to reassign tasks and then intentionally trigger a failure. 

BEGIN TRANSACTION; 
  UPDATE user_task SET user_id = 5 WHERE user_id = 1;

  INSERT INTO task (title, description, created, updated, status_id) 
  VALUES ('Impossible Task', 'This will fail', datetime('now'), datetime('now'), 999);
ROLLBACK;
  
-- Part D, Question 1: Write a transaction that:
-- 1. Creates a new category called "Urgent"
-- 2. Finds all tasks that are "In Progress" or "To Do"
-- 3. Assigns all of those tasks to the new "Urgent" category
--4. If anything goes wrong, rolls back the entire operation

BEGIN TRANSACTION; 
	INSERT INTO category (name, color) VALUES ('Urgent', 'Yellow'); 

	INSERT INTO task_category (task_id, category_id)
	SELECT t.id, c.id FROM task t
	JOIN status s ON t.status_id = s.id  
	JOIN category c ON c.name = 'Urgent'
	WHERE s.name IN ('In progress', 'Not started');
COMMIT;

SELECT * FROM status;


-- Part D, Question 2: Write a query that generates a simple dashboard summary with a single result set containing:
-- 1. Total number of tasks
-- 2. Number of completed tasks (status = "Done")
-- 3. Number of overdue tasks (due_date < today)
-- 4. Number of users with at least one task

SELECT 
	(SELECT COUNT(*) FROM task t) AS total_tasks,
	(SELECT COUNT(*) FROM task t
	JOIN status s ON t.status_id = s.id  
	WHERE s.name = 'Done') AS completed_tasks,
	(SELECT COUNT(*) FROM task t
	WHERE due_date < date('now') AND due_date IS NOT NULL) AS tasks_overdue,
	(SELECT  COUNT(DISTINCT u.id) FROM user u
	JOIN user_task ut ON u.id = ut.user_id) AS total_user;
