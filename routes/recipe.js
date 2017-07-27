var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');

/* GET users listing. */
router.get('/', function(req, res) {
  var id = '597a63b8e30748ceeb19b950'
  console.log(id)
  res.send(id)
  // Recipe.find({}).then((recipe) => {
  //     console.log(recipe);
  //     res.send(recipe);
    // })
    // .catch((error) => {
    //   console.log('Error Looking for recipe');
    //   console.log(error);
    // })
});

module.exports = router;
