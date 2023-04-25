var express = require('express');
var router = express.Router();
const app = express();


const todos = [];



router.get('/', function(req, res, next) {
  res.render('todolist', {
    title: `Todo-list`,
    todos,
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
  console.log(res.locals.msg);
})

router.put('/checkcompleted/:id',(req, res, next) => {
  const { id } = req.params
  console.log('id is', id);
  
})
module.exports = router;
