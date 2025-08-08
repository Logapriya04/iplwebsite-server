const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors");

const PORT = 8000;
const DB_URL = "mongodb://localhost:27017/todo-db";

const todos = [
    {id: "1", task: "html"},
    {id: "2", task: "css"},
    {id: "3", task: "js"},
]

const app = express();
app.use(express.json()) //parse json
app.use(cors())
mongoose
.connect(DB_URL)
.then(()=> console.log("db connected"))
.catch((e)=> console.log("error: ", e))

const todoSchema = new mongoose.Schema({
    id: String,
    task: String,
    date: {type: Date, default: Date.now}
})

const Todo = mongoose.model("todoList", todoSchema)

app.get("/todos", (req,res) => {
    res.json({status: 200, message: todos})
})

app.post("/todo", async (req,res) => {
    try{
        await Todo.create({id: "002", task: "css"})
        res.json({status:200})
    }
    catch (e) {
        res.json({error: e})
    }
})

app.get("/todo", async (req,res) => {
    try{
        const todos = await Todo.find();
        res.json({status:200, message: todos})
    }
    catch (e) {
        res.json({error: e})
    }
})

app.get("/",(req,res) => {
    res.send("Hello world")
})


app.get("/invite",(req,res) => {
    res.send(`welcome ${req.query.name || "Guest"} `)
})

app.listen(PORT, ()=> {
    console.log(`Success, running in http://localhost:${PORT}`)

})
