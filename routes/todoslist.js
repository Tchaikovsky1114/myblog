var express = require('express');
var router = express.Router();

const todos = [];

router.get('/', function(req, res, next) {
  
  res.render('todolist', {
    title: `Todo-list`,
    todos,
  });
});

router.post('/addtodo', (req, res, next) => {
  

  const { title } = req.body;
  todos.push({id: todos.length, title, completed: false, comment: []})
  console.log(todos);
  res.redirect('/todolist')
})

router.put('/checkcompleted/:id',(req, res, next) => {
  const { id } = req.params

  console.log('id is', id);
  
})
module.exports = router;
