import { recipes } from "../../data/recipes.js";
import { recipesFactory } from "../factories/recipesFactory.js";

var keywords = {
  ustensils: null,
  appliances: null,
  ingredients: null,
};

var keywordsSelected = [];

function addKeyword(name, type) {
  keywordsSelected.push({
    name: name,
    type: type,
  });
  displayData();
}

function removeKeyword(name, type) {
  keywordsSelected = keywordsSelected.filter(
    (keyword) => keyword.name != name && keyword.type != type
  );
  displayData();
}

function keywordAlreadySet(name, type) {
  return (
    keywordsSelected.findIndex(
      (keyword) => keyword.name == name && keyword.type == type
    ) >= 0
  );
}

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

    displayData();
  });
}

getSearch("ustensils-input", keywords, "ustensils");
getSearch("appliances-input", keywords, "appliances");
getSearch("ingredients-input", keywords, "ingredients");

var searchText = "";
document.getElementById("main-search-input").addEventListener("keyup", (e) => {
  searchText = e.target.value;
  displayData();
});

async function displayData() {
  var recipesFiltered = [];

  recipes.forEach((recipe) => {
    if (recipe.name.match(searchText)) {
      recipesFiltered.push(recipe);
    }
  });

  if (keywordsSelected.length > 0) {
    keywordsSelected.forEach((keyword) => {
      recipesFiltered = recipesFiltered.filter((recipe) => {
        switch (keyword.type) {
          case "appliances-list":
            return recipe.appliance == keyword.name;
          case "ustensils-list":
            return recipe.ustensils.indexOf(keyword.name) >= 0;
          case "ingredients-list":
            return (
              recipe.ingredients.findIndex(
                (ingredient) => ingredient.ingredient == keyword.name
              ) >= 0
            );
        }
      });
    });
  }

  const recipesSection = document.querySelector(".recipes-content");
  recipesSection.innerHTML = "";

  ingredients = new Set();
  appliances = new Set();
  ustensils = new Set();

  recipesFiltered.forEach((recipe) => {
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
        if (keywordAlreadySet(label.innerText, listName)) {
          removeKeyword(label.innerText, listName);
        } else {
          addKeyword(label.innerText, listName);
        }
        // if (keywordsSelected.indexOf(label.innerText) === -1) {
        //   keywordsSelected.push(label.innerText);
        // } else {
        //   keywordsSelected.splice(keywordsSelected.indexOf(label.innerText), 1);
        // }
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
    btn.innerText = keyword.name;
    switch (keyword.type) {
      case "appliances-list":
        btn.setAttribute("id", "appliances-btn");
        break;
      case "ustensils-list":
        btn.setAttribute("id", "ustensils-btn");
        break;
      case "ingredients-list":
        btn.setAttribute("id", "ingredients-btn");
        break;
    }

    // if ([...appliances].includes(keyword)) {
    //   btn.setAttribute("id", "appliances-btn");
    // }
    // if ([...ustensils].includes(keyword)) {
    //   btn.setAttribute("id", "ustensils-btn");
    // }
    // if ([...ingredients].includes(keyword)) {
    //   btn.setAttribute("id", "ingredients-btn");
    // }
    const img = document.createElement("img");
    img.setAttribute("src", closeImg);
    img.setAttribute("alt", "Retirer filtre");
    btn.appendChild(img);
    btn.addEventListener("click", (element) => {
      removeKeyword(keyword.name, keyword.type);
      // keywordsSelected.splice(index, 1);
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
    displayData();
  } catch (err) {
    console.log(err);
  }
}

init();
