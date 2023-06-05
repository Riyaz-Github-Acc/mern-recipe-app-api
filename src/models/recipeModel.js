import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  ingredients: {
    type: [{ type: String, required: true }],
  },

  instructions: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  cookingTime: {
    type: Number,
    required: true,
  },

  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const recipeModel = mongoose.model("recipe", RecipeSchema);
