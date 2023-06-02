const { default: mongoose } = require("mongoose");
const { Schema } = mongoose

const express = require('express')
const app = express();

app.use(express.json())


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

mongoose.connect('mongodb+srv://Ravana_Piriyeva:ravana123@cluster0.l8nrpia.mongodb.net/todoDb');


//table - collections

let todoSchema = new Schema({
    description: String,
    active:Boolean
})


let Todo = mongoose.model('Todo', todoSchema)



app.get('/api/todos', (req, res) => {

    Todo.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

app.post('/api/todos', (req, res) => {

    let todo = new Todo({
        description: req.body.description,
        active: req.body.active
    })

    todo.save();

    res.json(todo);

})


app.get('/api/todos/:id', (req, res) => {

    let id = req.params.id;

    Todo.findById(id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })

})


app.delete('/api/todos/:id', (req, res) => {

    let id = req.params.id;

    Todo.findByIdAndRemove(id)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json(err)
    })

})


app.put('/api/todos/:id', (req, res) => {

    let id = req.params.id;

    Todo.findById(id)
    .then(data => {
        
        data.description = req.body.description ;
        data.active= req.body.active
        data.save();
        res.json(data);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



app.listen(3000);