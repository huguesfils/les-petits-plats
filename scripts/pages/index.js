import { recipes } from "../../data/recipes.js";
import { recipesFactory } from "../factories/recipesFactory.js";

async function displayData(recipes) {
  const recipesSection = document.querySelector(".recipes-content");
  recipesSection.innerHTML = "";
  const itemList = document.querySelector(".search-filter");

  var ingredients = new Set();
  var appliances = new Set();
  var ustensils = new Set();

  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM(recipe);
    recipesSection.appendChild(recipeCardDOM);

    recipe.ingredients.forEach((ingredient) => {
      ingredients.add(ingredient.ingredient);
    });
    appliances.add(recipe.appliance);

    recipe.ustensils.forEach((ustensil) => {
      ustensils.add(ustensil);
    });
  });

  const ingredientList = document.createElement("div");
  ingredientList.className = "list blue";
  Array.from(ingredients)
    .sort()
    .map((ingredient) => {
      let label = document.createElement("label");
      label.innerText = ingredient;
      return label;
    })
    .forEach((div) => ingredientList.appendChild(div));
  document.getElementById("ingredients-list").appendChild(ingredientList);

  const applianceList = document.createElement("div");
  applianceList.className = "list green";
  Array.from(appliances)
    .sort()
    .map((appliance) => {
      let label = document.createElement("label");
      label.innerText = appliance;
      return label;
    })
    .forEach((div) => applianceList.appendChild(div));
  document.getElementById("appliances-list").appendChild(applianceList);

  const ustensilList = document.createElement("div");
  ustensilList.className = "list red";
  Array.from(ustensils)
    .sort()
    .map((ustensil) => {
      let label = document.createElement("label");
      label.innerText = ustensil;
      return label;
    })
    .forEach((div) => ustensilList.appendChild(div));
  document.getElementById("ustensils-list").appendChild(ustensilList);
}

async function init() {
  try {
    displayData(
      recipes.filter((recipe) => {
        return recipe.time <= 60;
      })
    );
  } catch (err) {
    console.log(err);
  }
}

init();
