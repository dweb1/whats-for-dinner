var express = require('express');
var router = express.Router();

var User = require('../models/user')

//user specific home page
router.get('/:id', function(req, res) {
  const userId = req.params.id
  res.render('/user/show');
  // res.send(userId)
});



module.exports = router;
