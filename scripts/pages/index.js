import { recipes } from "../../data/recipes.js";
import { recipesFactory } from "../factories/recipesFactory.js";

async function displayData(recipes) {
  const recipesSection = document.querySelector(".recipes-content");
  recipesSection.innerHTML = "";
  const itemList = document.querySelector(".search-filter");
  // itemList.innerHTML = "";

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

  // Filter item qui son pret
  const list = document.createElement("div");
  list.className = "list";
  Array.from(ingredients)
    .sort()
    .map((ingredient) => {
      let label = document.createElement("label");
      label.innerText = ingredient;
      return label;
    })
    .forEach((div) => list.appendChild(div));

  document.getElementById("ingredient-list").appendChild(list);
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
