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

const ingredientList = document.getElementById("ingredient-list");
// const ingredientListBtn = document.getElementById("ingredient-list-btn");
const ingredientBtn = document.getElementById("ingredient-btn");
var ingredientListVisible = false;
ingredientBtn.addEventListener("click", () => {
  ingredientList.style.display = "block";
  ingredientBtn.style.display = "none";
  setTimeout(() => {
    ingredientListVisible = true;
  }, 100);
});

document.addEventListener("click", function (e) {
  if (
    document.getElementById("ingredient-list").contains(e.target) == false &&
    ingredientListVisible
  ) {
    console.log("close");
    ingredientList.style.display = "none";
    ingredientBtn.style.display = "block";
    ingredientListVisible = false;
  }
  //   console.log("if" + e);
  // } else {
  //   console.log("else" + e);
  //   // ingredientList.style.display = "none";
  //   // ingredientBtn.style.display = "block";
  //   // toto = false;
  // }
});

// ingredientListBtn.addEventListener("click", () => {
//   ingredientList.style.display = "none";
//   ingredientBtn.style.display = "block";
// });

// const btn = document.getElementById("ustensils-btn");
// var myDropdown = document.getElementById("myDropdown");
// myDropdown.addEventListener("show.bs.dropdown", function () {
//   btn.style.display = "none";
//   console.log("ok");
// });
