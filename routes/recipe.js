var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient')

/* GET users listing. */
router.get('/', function(req, res) {
  Recipe.find({})
      .then((recipe) => {
        res.render('recipe/index', {
          recipe: recipe,
          // origin: recipe.origin,
        });
      // console.log(recipe);
      // res.send(recipe);
    })
    .catch((error) => {
      console.log('Error Looking for recipe');
      console.log(error);
    });
});

//NEW ROUTE HERE
router.get('/new', function(req, res) {
  res.render('recipe/new')
});

//POST THE NEW INFORMATION
router.post('/', function(req, res) {
  const newRecipeInfo = req.body;

  Recipe.create(newRecipeInfo)
    .then((recipe) => {
      res.redirect(`/recipe/${recipe.id}/edit`);
    })
    .catch((error) => {
      console.log('Error Looking for recipe');
      console.log(error);
    });
})

router.put('/:id/edit' , (req, res) => {
  const recipeId = req.params.id;
  const newRecipeIngredient = req.body;
  Recipe.findById(recipeId)
        .then((recipe) => {
        var oldRecipe = recipe
        console.log('Hit the promise')
        recipe.ingredients.push(newRecipeIngredient)
        var newRecipe = recipe
        Recipe.findByIdAndUpdate(oldRecipe, newRecipe, {new: true})
          .then((recipe) => {
            res.render('recipe/edit', {
              recipe,
            })
          })
      })
      .catch((error) => {
        console.log('Error editing recipe');
        console.log(error);
    });
})

router.get('/:id/edit' , (req, res) => {
  const recipeId = req.params.id;
  Recipe.findById(recipeId)
  .then((recipe) => {
    res.render('recipe/edit', {
      recipe,
    })
     .catch((error) => {
        console.log('Error editing recipe');
        console.log(error);
    });
  })
})

//SHOW router
router.get('/:id', function(req, res) {
  const userIdToSearchFor = req.params.id;
  console.log(userIdToSearchFor)

  Recipe.findById(userIdToSearchFor)
    .then((recipe) => {
      res.render('recipe/show', {
        recipe: recipe
      })
    //   res.send(recipe);

    });
});

module.exports = router;
