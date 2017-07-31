require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('mongodb://localhost/whats-for-dinner')
var Recipe = require('../models/recipe');
var Ingredient = require('../models/ingredient');
var User = require('../models/user');

//SWITCH TO NATIVE promises
mongoose.Promise = global.Promise;

// First we clear the database of existing users and items.
Recipe.remove({}, function(err){
  console.log(err);
});

User.remove({}, function(err){
  console.log(err);
});

var michaeljordan = new User({
  firstName: 'Michael',
  lastName: 'Jordan',
  email: 'mj@test.com',
  recipes: []
})

var friedEggs = new Recipe({
  name: 'Fried Eggs',
  directions: 'Fry the Eggs',
  servings: 2,
  caloriesPerServing: 80,
  totalDuration: 8,
  origin: 'Burns',
  difficulty: 1,
  picture: 'http://i.imgur.com/WOEbEK0.jpg',
  ingredients: [{ name: 'Eggs', category: 'Dairy' }]
});

var tacos = new Recipe({
  name: 'Tacos',
  directions: 'http://www.bettycrocker.com/recipes/easy-beef-tacos/426c261d-b2eb-4e22-9cba-0066f3335591',
  servings: 2,
  caloriesPerServing: 133,
  totalDuration: 45,
  origin: 'Mexican',
  difficulty: 4,
  picture: 'http://i.imgur.com/7h61E21.jpg',
  ingredients: [{ name: 'Ground Beef', category: 'Meat' }, { name: 'Cheese', category: 'Dairy' }, { name: 'Letture', category: 'Produce'}]
});

var pizza = new Recipe({
  name: 'Pizza',
  directions: 'Put Frozen Pizza into Oven',
  servings: 4,
  caloriesPerServing: 300,
  totalDuration: 20,
  origin: 'Italian',
  difficulty: 2,
  picture: 'http://i.imgur.com/ACCNhlV.jpg',
  ingredients: []
});


friedEggs.save(function(err) {
  if (err) console.log(err);

  console.log('Fried Eggs created!');
});

pizza.save(function(err) {
  if (err) console.log(err);

  console.log('Pizza created!');
});
tacos.save(function(err) {
  if (err) console.log(err);

  console.log('Tacos created!');
});

michaeljordan.save(function(err) {
  if (err) console.log(err);

  console.log('MJ created!');
});

mongoose.connection.close();
