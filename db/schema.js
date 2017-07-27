var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;

var RecipeSchema = new Schema({
  directions: String,
  servings: Number,
  caloriesPerServing: Number,
  totalDuration: Number,
  origin: String,
  difficulty: Number,
  picture: String,
  ingredients: [IngredientSchema],
});

var RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = {
  Recipe: RecipeModel,
};
