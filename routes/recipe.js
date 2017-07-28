var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient')

/* GET users listing. */
router.get('/', function(req, res) {
  Recipe.find({})
      .then((recipes) => {
      console.log(recipes);
      res.send(recipes);
    })
    .catch((error) => {
      console.log('Error Looking for recipe');
      console.log(error);
    })
});

module.exports = router;
