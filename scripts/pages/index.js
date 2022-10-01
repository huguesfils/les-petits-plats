import { recipes } from "../../data/recipes.js";
import { recipesFactory } from "../factories/recipesFactory.js";

var ustensilsKeyword = null;
var appliancesKeyword = null;
var ingredientsKeyword = null;

var keywords = {
  ustensils: null,
  appliances: null,
  ingredients: null,
};

function getSearch(input, keywordObject, key) {
  document.getElementById(input).addEventListener("keyup", (e) => {
    const searchString = e.target.value;
    if (searchString && searchString != "") {
      keywordObject[key] = searchString;
    } else {
      keywordObject[key] = null;
    }

    displayData(recipes);
  });
}

getSearch("ustensils-input", keywords, "ustensils");
getSearch("appliances-input", keywords, "appliances");
getSearch("ingredients-input", keywords, "ingredients");

async function displayData(recipes) {
  const recipesSection = document.querySelector(".recipes-content");
  recipesSection.innerHTML = "";

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

  if (keywords["ustensils"]) {
    console.log("ok");
    ustensils = new Set(
      Array.from(ustensils).filter((ustensil) =>
        ustensil.match(keywords["ustensils"])
      )
    );
  }
  if (keywords["appliances"]) {
    appliances = new Set(
      Array.from(appliances).filter((appliance) =>
        appliance.match(keywords["appliances"])
      )
    );
  }
  if (keywords["ingredients"]) {
    ingredients = new Set(
      Array.from(ingredients).filter((ingredient) =>
        ingredient.match(keywords["ingredients"])
      )
    );
  }

  getListItem(ingredients, "ingredients-list", "list blue");
  getListItem(appliances, "appliances-list", "list green");
  getListItem(ustensils, "ustensils-list", "list red");
}

function getListItem(listItem, listName, className) {
  const oldList = document.getElementById(listName + className);
  if (oldList) {
    oldList.remove();
  }
  const list = document.createElement("div");
  list.className = className;
  list.id = listName + className;
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

var keywordsSelected = ["Poele", "Oeuf", "tomate"];

keywordsSelected.forEach((keyword, index) => {
  var btn = document.createElement("button");
  btn.innerText = keyword;
  btn.addEventListener("click", (element) => {
    keywordsSelected.splice(index, 1);
  });
  document.getElementById("toto").appendChild(btn);
});

async function init() {
  try {
    displayData(recipes);
  } catch (err) {
    console.log(err);
  }
}

init();
