var express = require('express');
var router = express.Router({mergeParams: true});

var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res) {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      const userName = user.firstName;
      Recipe.find({})
        .then((recipe, user) => {
          res.render('recipe/index', {
            recipe: recipe,
            userId: userId,
            userName: userName
            // origin: recipe.origin,
          });
        // console.log(recipe);
        // res.send(recipe);
      })
        .catch((error) => {
          console.log('Error Looking for recipe');
          console.log(error);
        });
    })
});

//NEW ROUTE HERE
router.get('/new', function(req, res) {
  const userId = req.params.userId;
  res.render('recipe/new', {
    userId: userId
  })
});

//POST THE NEW INFORMATION
router.post('/', function(req, res) {
  const newRecipeInfo = req.body;
  const userId = req.params.userId
  Recipe.create(newRecipeInfo)
    .then((recipe) => {
      res.redirect(`../${userId}/recipe/${recipe.id}/edit`);
    })
    .catch((error) => {
      console.log('Error Looking for recipe');
      console.log(error);
    });
})

router.put('/:id/edit' , (req, res) => {
  console.log('test');
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
              recipeId
            })
          })
      })
      .catch((error) => {
        console.log('Error editing recipe');
        console.log(error);
    });
})

router.get('/:recipeId/edit' , (req, res) => {
  const recipeId = req.params.recipeId;
  const userId = req.params.userId;
  console.log(recipeId);
  Recipe.findById(recipeId)
  .then((recipe) => {
    res.render('recipe/edit', {
      recipe,
      recipeId,
      userId
    })
     .catch((error) => {
        console.log('Error editing recipe');
        console.log(error);
    });
  })
})

//SHOW router
router.get('/:id', function(req, res) {
  const recipeIdToSearchFor = req.params.id;
  console.log(recipeIdToSearchFor)

  Recipe.findById(recipeIdToSearchFor)
    .then((recipe) => {
      res.render('recipe/show', {
        recipe: recipe
      })
    //   res.send(recipe);
      console.log(recipe.ingredients.name)
    });
});

router.get('/:recipeId/delete', (req, res) => {
  const userId = req.params.userId;
  const recipeIdToDelete = req.params.recipeId;
  Recipe.findByIdAndRemove(recipeIdToDelete)
        .then(() => {
            console.log(`Successfully deleted recipe with ID ${recipeIdToDelete}!`)

            res.redirect(`/user/${userId}/recipe`);
        })
})

module.exports = router;
