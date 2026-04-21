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

SELECT t.title, s.name FROM task t
JOIN status s ON t.status_id = s.id;

SELECT t.title, s.name AS status_name, u.name AS user_name
FROM task t
JOIN status s ON t.status_id = s.id
JOIN user_task ut ON t.id = ut.task_id
JOIN user u ON ut.user_id = u.id
WHERE u.phone LIKE '+45%'; 

SELECT t.title, t.description, s.name AS status, u.name FROM task t
JOIN status s ON t.status_id = s.id
JOIN user_task ut ON t.id = ut.task_id 
JOIN user u ON ut.user_id = u.id 
WHERE u.name LIKE '%John%'; 

SELECT t.title, u.name FROM task t
JOIN user_task ut ON t.id = ut.task_id 
JOIN user u ON ut.user_id = u.id 
WHERE t.title LIKE '%Deploy%'; 

SELECT u.name, COUNT (ut.task_id) AS total FROM user u
LEFT JOIN user_task ut ON ut.user_id = u.id 
LEFT JOIN task t ON ut.task_id = t.id 
GROUP BY u.id;

SELECT u.name, COUNT (t.id) AS total FROM user u
LEFT JOIN user_task ut ON ut.user_id = u.id 
LEFT JOIN task t ON ut.task_id = t.id AND t.status_id = 3
GROUP BY u.name 
ORDER BY total DESC;

-- Part 1: Basic CRUD Operations

-- Part 1, Question 1: Insert a new user 

INSERT INTO user (name, email, phone) VALUES
  ('Paloma Cardozo', 'palomacardozo88@gmail.com', '');

-- Part 1, Question 2: Insert a new task

INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES
  ('Learn SQL', 'Practice database queries', datetime('now'), datetime('now'), datetime('now', '+7 days'), 2);

INSERT INTO user_task (user_id, task_id) 
SELECT u.id, t.id FROM user u, task t
WHERE u.name = 'Paloma Cardozo' AND t.title = 'Learn SQL';

-- Part 1, Question 3: Update the title of the task

UPDATE task SET title = 'Master SQL Basics', updated = datetime('now') WHERE id = 40;

-- Part 1, Question 4: Change the due date of your task

UPDATE task SET due_date = datetime('now', '+14 days'), updated = datetime('now') WHERE id = 40;

-- Part 1, Question 5: Change the status of your task 

UPDATE task SET status_id = 3, updated = datetime('now') WHERE id = 40;

-- Part 1, Question 6: Delete one of the tasks

DELETE FROM user_task WHERE task_id = 18;
DELETE FROM task WHERE id = 18;

-- Part 2: Working with Relationships

-- Part 2, Question 1: List all users who don't have any tasks assigned

SELECT u.name FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
WHERE ut.user_id IS NULL;

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

