const express= require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookiePaser = require('cookie-parser');
dotenv.config({path: './.env'})

const app =express();

const db = mysql.createConnection({
    host: process.env.DARABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookiePaser());


app.set('view engine', 'hbs');


 db.connect((err) => {
     if(err){
         console.log(error)
     } else {
         console.log("MYSQL conected...")
     }
 });

//Define routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, () => {
    console.log("server stand on port 5000")
})