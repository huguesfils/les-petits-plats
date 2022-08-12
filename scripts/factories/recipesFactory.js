export const recipesFactory = (data) => {
  const { name, ingredients, time, description } = data;

  const timeImg = `assets/time.svg`;

  function getRecipeCardDOM(index) {
    const card = document.createElement("div");
    card.className = "card";

    const fakeImg = document.createElement("div");
    fakeImg.className = "fake-img";

    const infos = document.createElement("div");
    infos.className = "infos-container";

    const ingredientContainer = document.createElement("div");
    ingredientContainer.className = "ingredients-list";

    const timeDescription = document.createElement("div");
    timeDescription.className = "time-description";

    const title = document.createElement("label");
    title.className = "recipe-name";
    title.innerHTML = name;

    const ingredientList = document.createElement("div");
    for (const item of ingredients) {
      const ingredientContainer = document.createElement("div");

      const ingredientName = document.createElement("label");
      ingredientName.className = "ingredient-name";
      ingredientName.innerHTML = `${item.ingredient}:&nbsp;`;
      ingredientList.appendChild(ingredientName);
      const quantity = document.createElement("label");
      quantity.className = "quantity";
      quantity.innerHTML = `&nbsp;${item.quantity}&nbsp;`;
      ingredientList.appendChild(quantity);
      if (item.unit) {
        const unit = document.createElement("label");
        unit.className = "unit";
        unit.innerHTML = item.unit;
        ingredientList.appendChild(unit);
      }
      ingredientContainer.appendChild(ingredientList);
      //gerer affichage ingredients
    }
    // `assets/photographers/${portrait}`;
    ingredientContainer.appendChild(title);
    ingredientContainer.appendChild(ingredientList);
    infos.appendChild(timeDescription);
    infos.appendChild(ingredientContainer);
    card.appendChild(fakeImg);
    card.appendChild(infos);

    return card;
  }

  return {
    name,
    ingredients,
    time,
    description,
    getRecipeCardDOM,
  };
};
