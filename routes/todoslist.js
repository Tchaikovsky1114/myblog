var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('todolist', { title: `Todo-list` });
});

module.exports = router;
