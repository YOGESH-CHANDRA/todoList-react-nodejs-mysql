require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mysql2 = require("mysql2");
const port = process.env.PORT;

// use cors middleware for authorized resource(domain) sharing with external third parties (domain)
app.use(cors());

// parse the incomming json data
app.use(express.json());

var db = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME,
});
// connection with Mysql
db.connect(function (err) {
  if (err) {
    console.log("error occurred while connecting");
  } else {
    console.log("connection created with Mysql successfully");
  }
});

// get all todo data from todolist database table todos
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos",(err,result,field)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
});

// // Add todo data in todolist database table todos
app.post("/todos", (req, res) => {
  const task  = req.body.item;
  db.query("INSERT INTO todos (task) values (?)",[task],(err,result,field)=>{
    if(err) throw err
    console.log(result);
    res.status(200).send(result);
});
});

// // Delete task/item from todolist database table todos
app.delete("/todos/:id",(req, res) => {
  const id=req.params.id;
  console.log(id)
  db.query("delete from todos where id=?",[id],(err,result,field)=>{
    if(err) throw err;
    res.status(200).send("task completed succesfully");
  })
});


// app listen on port no 5000
app.listen(port, () => console.log(`Server is running on port no. ${port}`));
