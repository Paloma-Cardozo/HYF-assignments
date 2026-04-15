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

SELECT u.name, COUNT (ut.task_id) AS total FROM task t
RIGHT JOIN user_task ut ON t.id = ut.task_id 
RIGHT JOIN user u ON ut.user_id = u.id 
GROUP BY u.id;

SELECT u.name, COUNT (t.id) AS total FROM task t
RIGHT JOIN user_task ut ON t.id = ut.task_id AND t.status_id = 3
RIGHT JOIN user u ON ut.user_id = u.id 
GROUP BY u.name 
ORDER BY total DESC;

-- Part 1: Basic CRUD Operations

-- Part 1, Question 1: Insert a new user 

INSERT INTO user (name, email, phone) VALUES
  ('Paloma Cardozo', 'palomacardozo88@gmail.com', '');

-- Part 1, Question 2: Insert a new task

INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES
  ('Learn SQL', 'Practice database queries', datetime('now'), datetime('now'), '2026-04-21', 2);

INSERT INTO user_task (user_id, task_id) VALUES(14, 40);

-- Part 1, Question 3: Update the title of the task

UPDATE task SET title = 'Master SQL Basics' WHERE id = '40';

-- Part 1, Question 4: Change the due date of your task

UPDATE task SET due_date = '2026-04-28' WHERE id = '40';

-- Part 1, Question 5: Change the status of your task 

UPDATE task SET status_id = '3' WHERE id = '40';

-- Part 1, Question 6: Delete one of the tasks

DELETE FROM task WHERE id = '18';

-- Part 2: Working with Relationships

-- Part 2, Question 1: List all users who don't have any tasks assigned

SELECT u.name FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
WHERE ut.user_id IS NULL;

-- Part 2, Question 2: Find all tasks with a status of "Done"

SELECT t.title, t.description FROM task t
JOIN status s ON t.status_id = s.id  
WHERE t.status_id = 3
ORDER BY t.title;

-- Part 2, Question 2: Find all overdue tasks

SELECT t.title, t.description, t.due_date, s.name AS status FROM task t
JOIN status s ON t.status_id = s.id  
WHERE t.due_date < date('now')
GROUP BY t.due_date;
