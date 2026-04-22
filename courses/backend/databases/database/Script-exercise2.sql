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
  




-- Part 1, Question 2: Insert a new task

-- Part 1, Question 3: Update the title of the task

-- Part 1, Question 4: Change the due date of your task

-- Part 1, Question 5: Change the status of your task 

-- Part 1, Question 6: Delete one of the tasks

-- Part 2: Working with Relationships

-- Part 2, Question 1: List all users who don't have any tasks assigned

-- Part 2, Question 2: Find all tasks with a status of "Done"

SELECT t.title, t.description FROM task t
JOIN status s ON t.status_id = s.id  
WHERE s.name = 'Done'
ORDER BY t.title;

-- Part 2, Question 3: Find all overdue tasks

SELECT t.title, t.description, t.due_date, s.name AS status FROM task t
JOIN status s ON t.status_id = s.id  
WHERE t.due_date < date('now')
ORDER BY t.due_date;

-- Part 3: Modifying the Database Schema

-- Part 3, Question 1: Add a new column

ALTER TABLE task ADD COLUMN priority TEXT NOT NULL DEFAULT 'Medium';

-- Part 3, Question 2: Update some existing tasks

UPDATE task SET priority = 'Low', updated = datetime('now') WHERE due_date IS NULL;
UPDATE task SET priority = 'High', updated = datetime('now') WHERE due_date > date('now');

-- Part 3, Question 3: Create a new table

CREATE TABLE category (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  color TEXT NOT NULL);

SELECT * FROM category;

-- Part 3, Question 4: Create a linking table

CREATE TABLE task_category (
  task_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (task_id, category_id),
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM task_category;

-- Part 3, Question 5: Insert at least 3 categories

INSERT INTO category (name, color) VALUES ('Work', 'Red'); 
INSERT INTO category (name, color) VALUES ('Personal', 'Blue'); 
INSERT INTO category (name, color) VALUES ('Study', 'Green');

-- Part 3, Question 6: Assign categories to at least 5 different tasks

INSERT INTO task_category (task_id, category_id) VALUES(1, 3);
INSERT INTO task_category (task_id, category_id) VALUES(2, 3);
INSERT INTO task_category (task_id, category_id) VALUES(6, 2);
INSERT INTO task_category (task_id, category_id) VALUES(12, 2);
INSERT INTO task_category (task_id, category_id) VALUES(5, 2);
INSERT INTO task_category (task_id, category_id) VALUES(8, 2);
INSERT INTO task_category (task_id, category_id) VALUES(7, 1);
INSERT INTO task_category (task_id, category_id) VALUES(10, 2);
INSERT INTO task_category (task_id, category_id) VALUES(13, 2);
INSERT INTO task_category (task_id, category_id) VALUES(14, 3);
INSERT INTO task_category (task_id, category_id) VALUES(15, 2);
INSERT INTO task_category (task_id, category_id) VALUES(17, 2);
INSERT INTO task_category (task_id, category_id) VALUES(11, 2);
INSERT INTO task_category (task_id, category_id) VALUES(16, 2);
INSERT INTO task_category (task_id, category_id) VALUES(21, 1);
INSERT INTO task_category (task_id, category_id) VALUES(22, 3);
INSERT INTO task_category (task_id, category_id) VALUES(24, 1);
INSERT INTO task_category (task_id, category_id) VALUES(23, 1);
INSERT INTO task_category (task_id, category_id) VALUES(26, 2);
INSERT INTO task_category (task_id, category_id) VALUES(34, 2);
INSERT INTO task_category (task_id, category_id) VALUES(39, 3);
INSERT INTO task_category (task_id, category_id) VALUES(40, 3);

-- Part 4: Advanced Queries

-- Part 4, Question 1: Find all tasks in a specific category

SELECT t.title, t.description FROM task t
JOIN task_category tc ON tc.task_id = t.id
WHERE tc.category_id = 3
ORDER BY t.title;

-- Part 4, Question 2: List tasks ordered by priority and by due date

SELECT t.title, t.description, t.priority, t.due_date FROM task t
ORDER BY
	CASE 
        WHEN t.priority = 'High' THEN 3
        WHEN t.priority = 'Medium' THEN 2
        WHEN t.priority = 'Low' THEN 1
        ELSE 0 
    END DESC, t.due_date ASC;

-- Part 4, Question 3: Find which category has the most tasks

SELECT c.name, COUNT(*) AS total FROM category c
JOIN task_category tc ON tc.category_id = c.id
JOIN task t ON tc.task_id = t.id
GROUP BY c.name
ORDER BY total DESC LIMIT 1;

-- Part 4, Question 4: Get all high priority tasks that are either "In Progress" or "To Do"

SELECT t.title, t.description, s.name FROM task t
JOIN status s ON t.status_id = s.id  
WHERE t.priority = 'High' AND s.name IN ('Not started', 'In progress')
ORDER BY t.title;

-- Part 4, Question 5: Find users who have tasks in more than one category

SELECT u.name, COUNT(DISTINCT tc.category_id) AS total FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task_category tc ON ut.task_id = tc.task_id 
GROUP BY u.name
HAVING COUNT(DISTINCT tc.category_id) > 1 
ORDER BY total;

