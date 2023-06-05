import express from "express";
import { verifyToken } from "../utils/verifyToken.js";

import {
  getAllRecipes,
  createRecipe,
  updateRecipe,
  removeSavedRecipe,
  getUserRecipes,
  deleteRecipe,
  getAllSavedRecipes,
  getSavedRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", verifyToken, createRecipe);
router.put("/", verifyToken, updateRecipe);
router.delete(
  "/savedRecipes/:userID/:recipeID",
  verifyToken,
  removeSavedRecipe
);
router.get("/user/:userID/recipes", getUserRecipes);
router.delete("/:recipeID", verifyToken, deleteRecipe);
router.get("/savedRecipes/:userID", getAllSavedRecipes);
router.get("/savedRecipes/ids/:userID", getSavedRecipe);

export default router;
