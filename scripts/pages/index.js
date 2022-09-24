import { recipes } from "../../data/recipes.js";
import { recipesFactory } from "../factories/recipesFactory.js";

async function displayData(recipes) {
  const recipesSection = document.querySelector(".recipes-content");
  recipesSection.innerHTML = "";
  //const itemList = document.querySelector(".search-filter");

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

  getListItem(ingredients, "ingredients-list", "list blue");
  getListItem(appliances, "appliances-list", "list green");

  getSearchedItem("ustensils-input", ustensils);
}

function getListItem(listItem, listName, className) {
  const list = document.createElement("div");
  list.className = className;
  Array.from(listItem)
    .sort()
    .map((item) => {
      let label = document.createElement("label");
      label.innerText = item;
      return label;
    })
    .forEach((div) => list.appendChild(div));
  document.getElementById(listName).appendChild(list);
}

function getSearchedItem(id, listItem) {
  document.getElementById(id).addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    const newArray = Array.from(listItem);
    const filteredItem = newArray.filter((newArray) => {
      return newArray.includes(searchString);
    });
    getListItem(filteredItem, "ustensils-list", "list red");
    // document.getElementById(list).appendChild = filteredItem;
    console.log(id);
  });
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
