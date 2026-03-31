import axios from "axios";

const BASE_URL =
  "https://www.themealdb.com/api/json/v1/1";

// ⭐ Search Recipes
export const searchRecipes = async (query) => {

  try {

    const response =
      await axios.get(
        `${BASE_URL}/search.php?s=${query}`
      );

    return response.data.meals;

  } catch (error) {

    console.error(error);

    return [];

  }

};

// ⭐ Get Categories
export const getCategories =
 async () => {

  const res =
    await axios.get(
      `${BASE_URL}/categories.php`
    );

  return res.data.categories;

};

// ⭐ NEW — Get Recipe by ID (IMPORTANT)
export const getRecipeById =
 async (id) => {

  try {

    const res =
      await axios.get(
        `${BASE_URL}/lookup.php?i=${id}`
      );

    return res.data.meals[0];

  } catch (error) {

    console.error(error);

    return null;

  }

};