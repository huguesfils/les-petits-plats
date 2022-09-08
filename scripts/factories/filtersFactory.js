export const filtersFactory = (filterValue) => {
  function getFilterListDOM() {
    //create div for labels
    const list = document.createElement("div");
    list.className = "list";

    const labelIngredients = document.createElement("label");
    labelIngredients.className = "item";
    for (const ingredient of data.ingredients) {
      labelIngredients.innerText = filterValue;
    }
    list.appendChild(labelIngredients);
    // console.log(labelIngredients.innerHTML);

    return list;
  }
  return {
    ingredients,
    appliance,
    ustensils,
    getFilterListDOM,
  };
};
