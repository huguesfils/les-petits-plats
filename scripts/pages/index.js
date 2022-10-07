import { recipes } from "../../data/recipes.js";
import { recipesFactory } from "../factories/recipesFactory.js";

var keywords = {
  ustensils: null,
  appliances: null,
  ingredients: null,
};

var keywordsSelected = [];

var ingredients = new Set();
var appliances = new Set();
var ustensils = new Set();

const closeImg = "assets/close-btn.svg";

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
      label.setAttribute("id", item);
      label.addEventListener("click", (element) => {
        if (keywordsSelected.indexOf(label.innerText) === -1) {
          keywordsSelected.push(label.innerText);
          console.log(keywordsSelected);
        } else {
          keywordsSelected.splice(keywordsSelected.indexOf(label.innerText), 1);
          console.log(keywordsSelected);
        }
        refreshFilterButtonsUI();
      });
      return label;
    })
    .forEach((div) => list.appendChild(div));

  document.getElementById(listName).appendChild(list);
}

function refreshFilterButtonsUI() {
  document.querySelector(".filter-buttons-container").innerHTML = "";
  keywordsSelected.forEach((keyword, index) => {
    var btn = document.createElement("button");
    btn.innerText = keyword;
    //boucle for
    // if (ustensils.values().match(btn.innerText)) {
    //   btn.setAttribute("id", "ustensils-btn");
    // }
    // if (btn.innerText.match(appliances)) {
    //   btn.setAttribute("id", "appliances-btn");
    // }
    // if (btn.innerText.match(ingredients)) {
    //   btn.setAttribute("id", "ingredients-btn");
    // }
    const img = document.createElement("img");
    img.setAttribute("src", closeImg);
    img.setAttribute("alt", "Retirer filtre");
    btn.appendChild(img);
    btn.addEventListener("click", (element) => {
      keywordsSelected.splice(index, 1);
      document.querySelector(".filter-buttons-container").style.display =
        "none";
      refreshFilterButtonsUI();
    });
    document.querySelector(".filter-buttons-container").appendChild(btn);
    document.querySelector(".filter-buttons-container").style.display = "flex";
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
