var express = require('express');
var router = express.Router();
const app = express();


let todos = [];
let completedTodos = []


router.get('/', function(req, res, next) {
  res.render('todolist', {
    title: `Todo-list`,
    todos,
    completedTodos
  });
});


router.post('/addtodo', (req, res, next) => {  
  const { title } = req.body;
  if(title){
    todos.push({ id: todos.length, title, completed: false, comment: [] })
    res.redirect('/todolist');
  }else {
    res.redirect('/todolist?msg=fail');
  }
})

router.put('/checkcompleted/:id',(req, res) => {
  const { id } = req.params
  console.log('id is', id);
  
})

router.get('/deletetodo/:id',(req, res) => {
  const { id } = req.params;
  const deletedTodos = todos.filter(todo => todo.id !== +id )
  todos = deletedTodos;
  res.locals.todos = deletedTodos
  res.redirect('/todolist')
})

router.get('/alldeletetodo',(req, res) => {
  todos = []
  res.locals.todos = todos
  res.redirect('/todolist');
})

router.get('/completetodo',(req, res) => {
  res.locals.todos = todos;
  res.status(200).json({
    todos,
    completedTodos,
  })
})

router.post('/completetodo', (req, res) => {
  const {completeTodos, oldTodos} = req.body;
  const updateOldTodo = oldTodos.filter((item) => 
  !completeTodos.some((completeTodo) => completeTodo.id === item.id));

  todos = updateOldTodo;
  completedTodos = [...completedTodos,...completeTodos];

  res.status(200).json({message: '정상적으로 전송되었습니다.'});
})

module.exports = router;
