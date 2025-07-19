CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) UNIQUE, 
  rating FLOAT CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  date_finished DATE DEFAULT CURRENT_DATE,
  cover_url VARCHAR(255) 
);

INSERT INTO book (title, author, isbn, rating, notes, cover_url)
VALUES (
  'Deep Work', 
  'Cal Newport', 
  '9781455586691', 
  4, 
  'Focuses on the value of deep concentration in a distracted world.', 
  'https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg'
);