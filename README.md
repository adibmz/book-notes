# Book Notes

A full-stack web application to manage and review your book reading notes. Users can add, edit, delete, and sort books, including details like title, author, ISBN, rating, notes, and cover image. The app uses Node.js, Express, EJS, and PostgreSQL.

## Features
- Add new books with title, author, ISBN, rating, and notes
- Edit or delete existing books
- View all books with cover images (fetched by ISBN)
- Sort and filter books by title, rating, or date finished
- Responsive and clean UI

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (Ensure the service is running)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd "Book Notes"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a PostgreSQL database named `book_notes`.
   - Update the database connection settings in `index.js` if your PostgreSQL user, password, or port differ from the defaults:
     ```js
     const db = new pg.Client({
         user: "postgres",      // your PostgreSQL username
         host: "localhost",
         database: "book_notes", // database name
         password: "your_password",     // your PostgreSQL password
         port: 5432,             // default PostgreSQL port
     });
     ```
   - Create the required table and insert a sample book by running the SQL in `queries.sql`:
     ```bash
     psql -U postgres -d book_notes -f queries.sql
     ```
     (Replace `postgres` with your PostgreSQL username if different.)

## Running the App

1. **Start the server**
   ```bash
   npx nodemon index.js
   ```
   Or, if you don't have nodemon installed globally:
   ```bash
   npm install -g nodemon
   npx nodemon index.js
   ```
   The server will run at [http://localhost:3000](http://localhost:3000)

## Usage
- Visit the home page to see all books.
- Use the "Add" button to add a new book.
- Edit or delete books using the respective buttons.
- Use the sort/filter form to organize your book list.

## Project Structure
- `index.js` - Main server file (Express app)
- `views/` - EJS templates for UI
- `public/` - Static assets (CSS, images)
- `queries.sql` - SQL for table creation and sample data

## License
MIT 