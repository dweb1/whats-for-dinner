var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/whats-for-dinner')
var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient')

//SWITCH TO NATIVE promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
Recipe.remove({}, function(err){
  console.log(err);
});

Recipe.remove({}, function(err){
  console.log(err);
});

var friedEggs = new Recipe({
  directions: 'Fry Eggs',
  servings: 2,
  caloriesPerServing: 80,
  totalDuration: 8,
  origin: 'Burns',
  difficulty: 1,
  picture: 'Insert Picture',
  ingredients: [{ name: 'Eggs', category: 'Dairy' }, { name: 'Butter', category: 'Dairy'}]
});

var pizza = new Recipe({
  directions: 'Put Frozen Pizza into Oven',
  servings: 4,
  caloriesPerServing: 300,
  totalDuration: 20,
  origin: 'Italian',
  difficulty: 2,
  picture: 'Insert Picture',
  ingredients: [{ name: 'Frozen Pizza', category: 'Frozen'}]
});

friedEggs.save(function(err) {
  if (err) console.log(err);

  console.log('Fried Eggs created!');
});

pizza.save(function(err) {
  if (err) console.log(err);

  console.log('Pizza created!');
});

mongoose.connection.close();
