var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var IngredientSchema = new Schema({
  name: String,
  // linkToRecipes: String
});

var RecipeSchema = new Schema({
  name: String,
  directions: String,
  servings: Number,
  caloriesPerServing: Number,
  totalDuration: Number,
  origin: String,
  difficulty: Number,
  picture: String,
  //Change ingredients back to [IngredientSchema]
  ingredients: [IngredientSchema]
});

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  created: Date,
  email: String,
  recipes: []
});


var RecipeModel = mongoose.model("Recipe", RecipeSchema);
var IngredientModel = mongoose.model("Ingredient", IngredientSchema);
var UserModel = mongoose.model("User", UserSchema);

module.exports = {
  Recipe: RecipeModel,
  Ingredient: IngredientModel,
  User: UserModel
};
