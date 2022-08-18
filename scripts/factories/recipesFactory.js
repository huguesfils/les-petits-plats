export const recipesFactory = (data) => {
  const { name, ingredients, time, description } = data;

  const timeImg = `assets/time.svg`;

  function getRecipeCardDOM() {
    //carte de recette
    const card = document.createElement("div");
    card.className = "card";

    //encadré pour future illustration
    const fakeImg = document.createElement("div");
    fakeImg.className = "fake-img";

    //corps de la recette
    const infos = document.createElement("div");
    infos.className = "infos-container";

    //titre et temps de préparation
    const titleTime = document.createElement("div");
    titleTime.className = "title-time-container";
    const title = document.createElement("label");
    title.className = "recipe-name";
    title.innerHTML = name;
    titleTime.appendChild(title);
    const timeImgContainer = document.createElement("div");
    timeImgContainer.className = "time-img-container";
    const timeLabel = document.createElement("label");
    timeLabel.className = "time-label";
    timeLabel.innerHTML = `${time}&nbsp;min`;
    const img = document.createElement("img");
    img.setAttribute("src", timeImg);
    timeImgContainer.appendChild(img);
    timeImgContainer.appendChild(timeLabel);
    titleTime.appendChild(timeImgContainer);

    const ingredientDescriptionContainer = document.createElement("div");
    ingredientDescriptionContainer.className =
      "ingredients-description-container";

    const descriptionBlock = document.createElement("div");
    descriptionBlock.className = "description";
    descriptionBlock.innerHTML = description;
    // const descriptionLabel = document.createElement("label");
    // descriptionLabel.innerHTML = description;
    //descriptionBlock.appendChild(descriptionLabel);

    const ingredientContainer = document.createElement("div");
    ingredientContainer.className = "ingredients-container";

    ingredientDescriptionContainer.appendChild(ingredientContainer);
    ingredientDescriptionContainer.appendChild(descriptionBlock);

    for (const item of ingredients) {
      const ingredientNameQuantity = document.createElement("div");
      ingredientNameQuantity.className = "ingredient-name-quantity";
      const ingredientName = document.createElement("label");
      ingredientName.className = "ingredient-name";
      ingredientName.innerHTML = `${item.ingredient}`;
      ingredientNameQuantity.appendChild(ingredientName);
      if (item.quantity) {
        const quantity = document.createElement("label");
        quantity.className = "quantity";
        quantity.innerHTML = `:&nbsp;${item.quantity}&nbsp;`;
        ingredientNameQuantity.appendChild(quantity);
      }
      if (item.unit) {
        const unit = document.createElement("label");
        unit.className = "unit";
        unit.innerHTML = item.unit;
        ingredientNameQuantity.appendChild(unit);
      }
      ingredientContainer.appendChild(ingredientNameQuantity);
    }

    infos.appendChild(titleTime);
    infos.appendChild(ingredientDescriptionContainer);
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
