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
          });
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

router.put('/:id' , (req, res) => {
  const recipeId = req.params.id;
  const userId = req.params.userId;
  User.findById(userId)
        .then((user) => {
          const oldUser = user;
          console.log(recipeId);
          Recipe.findById(recipeId)
            .then((recipe) => {
              console.log(oldUser);
              oldUser.recipes.push(recipe);
              var newUser = oldUser;
              console.log(newUser);
              User.findByIdAndUpdate(oldUser, newUser, {new: true})
              .then(() =>{
                console.log('test 3');
                res.redirect(`/user/${userId}`);
              })
            })
        })
        .catch((error) => {
          console.log('Error editing recipe');
          console.log(error);
      });
})

router.put('/:id/edit' , (req, res) => {
  const recipeId = req.params.id;
  const newRecipeIngredient = req.body;
  const userId = req.params.userId
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
              recipeId,
              userId: userId
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
      userId: userId
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
  const userId = req.params.userId
  console.log(recipeIdToSearchFor)

  Recipe.findById(recipeIdToSearchFor)
    .then((recipe) => {
      res.render('recipe/show', {
        recipe: recipe,
        userId: userId
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
