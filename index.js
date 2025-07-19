import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"book_notes",
    password:"adibmz",
    port:5432,
});

db.connect();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async (req,res)=>{
    const result = await db.query("SELECT * FROM book ORDER BY id ASC");
    const data = result.rows;
    res.render("index.ejs",{books:data});
});
app.get("/add",(req,res)=>{
    res.render("new.ejs")
});
app.post("/new",async (req,res)=>{
    const title = req.body.title.trim();
    const author = req.body.author.trim();
    const isbn = req.body.isbn.trim();
    const rating = parseFloat(req.body.rating);
    const notes = req.body.notes.trim();
    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    if(title && author && isbn && isbn.length >= 1 && isbn.length <= 13 && !isNaN(rating) && rating >= 1 && rating <= 5 && notes){
      try{
        await db.query(
          "INSERT INTO book (title, author, isbn, rating, notes, cover_url) VALUES ($1, $2, $3, $4, $5, $6)",
          [title, author, isbn, rating, notes, url]
        );
        res.redirect("/");
        } catch(err){
            console.log(err)
        }  
    } else {
        let error = "Please enter all the informations.";
        res.render("new.ejs",{error:error})
    } 
});
app.get("/delete/:id", async (req,res)=>{
    const id = parseInt(req.params.id);
    try{
        await db.query(`DELETE FROM book WHERE id=${id};`);
        res.redirect("/");
    } catch(err){
        console.log(err);
    }
});
app.get("/edit/:id", async(req,res)=>{
    const id = parseInt(req.params.id);
    const result = await db.query(`SELECT * FROM book WHERE id=${id}`);
    const data = result.rows[0];
    res.render("update.ejs",{book:data});
});
app.post("/update", async (req,res)=>{
    const id = parseInt(req.body.id);
    const title = req.body.title.trim();
    const author = req.body.author.trim();
    const isbn = req.body.isbn.trim();
    const rating = parseFloat(req.body.rating);
    const notes = req.body.notes.trim();
    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
    if(title && author && isbn && isbn.length >= 1 && isbn.length <= 13 && !isNaN(rating) && rating >= 1 && rating <= 5 && notes){
      try{
        await db.query(
          "UPDATE book SET title = $2, author = $3, isbn = $4, rating = $5, notes = $6, cover_url = $7 WHERE id = $1  ",
          [id,title, author, isbn, rating, notes, url]
        );
        res.redirect("/");
        } catch(err){
            console.log(err)
        }  
    } else {
        let error = "Please enter all the informations.";
        res.render("update.ejs",{error:error})
    }
});

app.post("/sort", async (req,res)=>{
    const title_entry = req.body.title_entry.trim();
    const title = req.body.title;
    const rating = req.body.rating;
    const recently = req.body.recently;
    let counter = 0;
    let query = "SELECT * FROM book ";
    const params = [];
    if(title_entry){
        query += `WHERE LOWER(title) LIKE $1 `;
        params.push(`%${title_entry.toLowerCase()}%`);
    }
    if(title){
        query += `ORDER BY title ${title}`;
        counter = 1;
    }
    if(rating){
        if(counter === 1){
            query+=`, rating ${rating}`;
        } else {
            query += `ORDER BY rating ${rating}`;
            counter = 1;
        }
    }
    if(recently){
        if(counter === 1){
            query += `, date_finished ${recently}`;
        } else {
            query += `ORDER BY date_finished ${recently}`;
            counter = 1;
        }
    }
    const result = await db.query(query, params);
    const data = result.rows;
    if(!title_entry && !title && !rating && ! recently){
        res.redirect("/")
    } else {
        res.render("index.ejs",{books:data,
            query:title_entry,
            title:title,
            rating:rating,
            recently:recently,
        });
    }
    

});

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});