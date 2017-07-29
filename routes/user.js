var express = require('express');
var router = express.Router();

var User = require('../models/user')
var Recipe = require('../models/recipe')

router.get('/', function(req, res) {
  res.render('user/index')
});


router.get('/new', function(req, res) {
  res.render('user/new')
})
//user specific home page


//post new info from user page
router.post('/', function(req, res) {
  const newUserInfo = req.body;
  console.log('made it to router.post!')
  User.create(newUserInfo)
    .then((user) => {
      res.redirect(`/user/${user.id}`)
    });
});
router.get('/:id', function(req, res) {
  const userIdToSearchFor = req.params.id

  User.findById(userIdToSearchFor)
    .then((user) => {
      console.log(user)
      res.render('user/show', {
        user: user
      });
    })

  // res.send(userId)
});


module.exports = router;
