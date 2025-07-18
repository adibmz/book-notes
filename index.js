import bodyParser from "body-parser";
import express from "express";
import axios from "axios";
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

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})