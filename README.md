# Book Notes

A full-stack web application to manage and review your book reading notes. Users can add, edit, delete, and sort books, including details like title, author, ISBN, rating, notes, and cover image. The app uses Node.js, Express, EJS, and PostgreSQL.

## Features
- Add new books with title, author, ISBN, rating, and notes
- Edit or delete existing books
- View all books with cover images (fetched by ISBN)
- Sort and filter books by title, rating, or date finished
- Responsive and clean UI
- Deployable to Vercel with Aiven PostgreSQL

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/) (local) or [Aiven](https://aiven.io/) (cloud)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd book-notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory (already in `.gitignore`):
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=book_notes
   DB_PASSWORD=
   DB_PORT=5432
   ```

   For Aiven, use your service credentials:
   ```env
   DB_USER=avnadmin
   DB_HOST=your-service.aivencloud.com
   DB_NAME=defaultdb
   DB_PASSWORD=your_aiven_password
   DB_PORT=12345
   ```

4. **Database Setup**

   Create the required table and insert a sample book by running the SQL in `queries.sql`:

   **Local PostgreSQL:**
   ```bash
   psql -U postgres -d book_notes -f queries.sql
   ```

   **Aiven:**
   Use the Query Editor in the [Aiven Console](https://console.aiven.io) or connect via `psql`:
   ```bash
   psql 'postgresql://avnadmin:PASSWORD@HOST:PORT/defaultdb?sslmode=require' -f queries.sql
   ```

## Running Locally

```bash
npm start
```

The server will run at [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add the following environment variables in Vercel → Settings → Environment Variables:

   | Variable | Value |
   |---|---|
   | `DB_USER` | Your Aiven username |
   | `DB_HOST` | Your Aiven host |
   | `DB_NAME` | Your Aiven database name |
   | `DB_PASSWORD` | Your Aiven password |
   | `DB_PORT` | Your Aiven port |

4. Deploy — Vercel will use `api/index.js` as the serverless entry point

## Usage
- Visit the home page to see all books.
- Use the "Add" button to add a new book.
- Edit or delete books using the respective buttons.
- Use the sort/filter form to organize your book list.

## Project Structure
- `index.js` — Main server file for local development
- `api/index.js` — Vercel serverless entry point
- `vercel.json` — Vercel routing configuration
- `views/` — EJS templates for UI
- `public/` — Static assets (CSS, images)
- `queries.sql` — SQL for table creation and sample data
- `.env` — Environment variables (not committed)

## License
MIT