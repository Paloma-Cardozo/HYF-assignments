CREATE TABLE authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
  );

SELECT * FROM authors;

CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
  );

SELECT * FROM tags;

CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL
  );

SELECT * FROM articles;

CREATE TABLE author_article (
  author_id INTEGER NOT NULL,
  article_id INTEGER NOT NULL,
  PRIMARY KEY (author_id, article_id),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE ON UPDATE CASCADE 
);

SELECT * FROM author_article;

CREATE TABLE article_tag (
  article_id INTEGER NOT NULL,
  tag_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM article_tag;

INSERT INTO authors (name) VALUES
  ('James Smith'),
  ('Jane Jones'),
  ('Aliya Awad'),
  ('Igor Vladimir'),
  ('Kim Jensen');

INSERT INTO tags (name) VALUES
  ('science'),
  ('breaking'),
  ('weather'),
  ('winter'),
  ('clickbait');

INSERT INTO articles (title, content) VALUES
  ('BREAKING NEWS: Water is wet!', 'Scientists have discovered that water is wet, it is amazing what.... ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'),
  ('Heavy Snowfall Expected this Weekend', 'Lots of snow is expected... Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
  ('BREAKING NEWS: These 10 Clickbait Titles Are Bad for Your Health, Number 7 Will SHOCK You!', 'Haha, you clicked! Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat');

INSERT INTO author_article VALUES (1,1), (2,1);
INSERT INTO author_article VALUES (3,2), (4,2);
INSERT INTO author_article VALUES (2,3), (5,3);

INSERT INTO article_tag VALUES (1,1), (1,2);
INSERT INTO article_tag VALUES (2,3), (2,4);
INSERT INTO article_tag VALUES (3,5), (3,2);

