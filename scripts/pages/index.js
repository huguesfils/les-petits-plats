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

// const ingredientList = document.getElementById("ingredient-list");
// const ingredientLisBtn = document.getElementById("ingredient-list-btn");
// const ingredientBtn = document.getElementById("ingredient-btn");

// ingredientBtn.addEventListener("click", () => {
//   ingredientList.style.display = "block";
//   ingredientBtn.style.display = "none";
// });

// ingredientLisBtn.addEventListener("click", () => {
//   ingredientList.style.display = "none";
//   ingredientBtn.style.display = "block";
// });

const btn = document.getElementById("ustensils-btn");
var myDropdown = document.getElementById("myDropdown");
myDropdown.addEventListener("show.bs.dropdown", function () {
  btn.style.display = "none";
  console.log("ok");
});
