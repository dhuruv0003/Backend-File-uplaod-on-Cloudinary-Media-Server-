const express=require('express');
const router=express.Router();


//Function ko import larne ke liye destructuring karni padti hai

// Post Route

const {createTodo}=require('../Controllers/CreateTodo');

// define API Routes 
router.post('/createTodo',createTodo);

//Get Toutes

const { getTodo,getTodoById } = require('../Controllers/getTodo');


router.get('/getTodos',getTodo)

// Find data by id 

router.get('/getTodos/:id',getTodoById)

// Update the data in the DB 

const { updateTodo } = require('../Controllers/updateTodo');

router.put('/updateTodo/:id',updateTodo)

// Delete the TodoItems

const { deleteTodo } = require('../Controllers/deleteTodo');

router.delete("/deleteTodo/:id",deleteTodo)

module.exports=router;
