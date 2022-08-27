export const filtersFactory = (data) => {
  const { ingredients, appliance, ustensils } = data;

  return {
    ingredients,
    appliance,
    ustensils,
  };
};
