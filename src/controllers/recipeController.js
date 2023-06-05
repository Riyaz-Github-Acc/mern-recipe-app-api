import { recipeModel } from "../models/recipeModel.js";
import { userModel } from "../models/userModel.js";

export const getAllRecipes = async (req, res) => {
  try {
    const data = await recipeModel.find({}).sort({ _id: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.json(err);
  }
};

export const createRecipe = async (req, res) => {
  const newRecipe = new recipeModel(req.body);

  try {
    const recipe = await newRecipe.save();
    res.status(200).json(recipe);
  } catch (err) {
    res.json(err);
  }
};

export const updateRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    user.save();
    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
};

export const removeSavedRecipe = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    const recipeIndex = user.savedRecipes.indexOf(req.params.recipeID);
    if (recipeIndex !== -1) {
      user.savedRecipes.splice(recipeIndex, 1);
      await user.save();
      res.status(200).json({ message: "Recipe removed from saved recipes!!!" });
    } else {
      res.status(404).json({ message: "Recipe not found in saved recipes!!!" });
    }
  } catch (err) {
    res.json(err);
  }
};

export const getUserRecipes = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    const userRecipes = await recipeModel
      .find({ userOwner: user })
      .sort({ _id: -1 });
    res.status(200).json({ userRecipes });
  } catch (err) {
    res.json(err);
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    await recipeModel.findByIdAndDelete(req.params.recipeID);
    res.status(200).json({ message: "Recipe deleted successfully!" });
  } catch (err) {
    res.json(err);
  }
};

export const getAllSavedRecipes = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    const savedRecipes = await recipeModel
      .find({ _id: { $in: user.savedRecipes } })
      .sort({ _id: -1 });
    res.status(200).json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
};

export const getSavedRecipe = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
};
