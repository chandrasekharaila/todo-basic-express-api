const express = require("express")
const bodyParser = require("body-parser")
const port = 3000
const app = express()

app.use(bodyParser.json())

let todos = [{ id: "id1", title: "todo-1", description: "Todo task one" },
             { id : "id2", title: "todo-1", description: "Todo task one"}]

//GET - retrieve all todos
app.get("/todos", (req, res) => {
    res.send(todos)
})

//GET - retrieve specific todo
app.get("/todos/:id", (req, res) =>{
    const todoId = req.params.id
    const todo = todos.find((tod) => tod.id === todoId)
    if (todo) {
        res.send(todo)
    } else {
        res.status(404).send({error:`no todo found with id ${todoId}`})
    }
})

//POST - Create new todo
app.post("/addtodo", (req, res) => {
    const todoId = req.body.id
    const title = req.body.title
    const description = req.body.description

    const newTodo = {
        id: todoId,
        title: title,
        description: description
    }
    todos.push(newTodo)
    res.send(newTodo)
})

//PUT - Update the existing body
app.put("/updatetodo", (req, res) => {
    const todoId = req.body.id
    const description = req.body.newDescription
    
    let todo = todos.find((td) => td.id === todoId)
    if (todo) {
        todo.description = description
        res.send(todo)
    } else {
        res.status(404).send({error: `no todo with the task id ${todoId}`})
    }
}) 

//DELETE - Delete a todo task
app.delete("/delete/:id", (req, res) => {
    const todoId = req.params.id
    const todoIndex = todos.findIndex((td)=>td.id === todoId)
    
    if (todoIndex!==-1) {
        todos.splice(todoIndex, 1)
        res.send(todos)
    } else {
        res.status(404).send({error: `no todo with the id ${todoId}`})
    }
      
})

app.listen(port, () => {
    console.log(`server is live at ${port}`)
})