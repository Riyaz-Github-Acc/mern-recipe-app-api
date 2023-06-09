import express from "express";
import { verifyToken } from "../utils/verifyToken.js";

import {
  getAllRecipes,
  createRecipe,
  removeSavedRecipe,
  getUserRecipes,
  deleteRecipe,
  updateSavedRecipe,
  getAllSavedRecipes,
  getSavedRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getAllRecipes);
router.post("/", verifyToken, createRecipe);
router.delete(
  "/savedRecipes/:userID/:recipeID",
  verifyToken,
  removeSavedRecipe
  );
router.get("/user/:userID/recipes", getUserRecipes);
router.delete("/:recipeID", verifyToken, deleteRecipe);
router.put("/", verifyToken, updateSavedRecipe);
router.get("/savedRecipes/:userID", getAllSavedRecipes);
router.get("/savedRecipes/ids/:userID", getSavedRecipe);

export default router;
