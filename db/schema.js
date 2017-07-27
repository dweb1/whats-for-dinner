var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var IngredientSchema = new Schema({
  name: String,
  category: String,
  linkToRecipes: String
});

var RecipeSchema = new Schema({
  directions: String,
  servings: Number,
  caloriesPerServing: Number,
  totalDuration: Number,
  origin: String,
  difficulty: Number,
  picture: String,
  //Change ingredients back to [IngredientSchema]
  ingredients: String
});


var RecipeModel = mongoose.model("Recipe", RecipeSchema);
var IngredientModel = mongoose.model("Ingredient", IngredientSchema);

module.exports = {
  Recipe: RecipeModel,
  Ingredient: IngredientModel
};
