import { recipes } from "../../data/recipes.js";
import { recipesFactory } from "../factories/recipesFactory.js";

async function displayData(recipes) {
  const recipesSection = document.querySelector(".recipes-content");
  recipesSection.innerHTML = "";

  recipes.forEach((recipe) => {
    const dataModel = recipesFactory(recipe);
    const recipeCardDOM = dataModel.getRecipeCardDOM(recipe);
    recipesSection.appendChild(recipeCardDOM);
  });
}

async function init() {
  try {
    displayData(recipes);
  } catch (err) {
    console.log(err);
  }
}

init();
