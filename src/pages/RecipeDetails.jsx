import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getRecipeById }
from "../services/api";

function RecipeDetails() {

  const { id } = useParams();

  const [recipe, setRecipe] =
    useState(null);

  useEffect(() => {

    getRecipeById(id)
      .then(setRecipe);

  }, [id]);

  if (!recipe) {

    return (
      <h2>
        Loading... ⏳
      </h2>
    );

  }

  // ⭐ Get Ingredients
  const getIngredients = () => {

    let ingredients = [];

    for (let i = 1; i <= 20; i++) {

      const ingredient =
        recipe[`strIngredient${i}`];

      if (
        ingredient &&
        ingredient.trim() !== ""
      ) {

        ingredients.push(ingredient);

      }

    }

    return ingredients;

  };

  return (

    <div className="details">

      <h2>
        {recipe.strMeal}
      </h2>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <h3>Ingredients:</h3>

      <ul>

        {getIngredients().map(
          (item, index) => (

            <li key={index}>
              {item}
            </li>

          ))}

      </ul>

      <h3>Instructions:</h3>

      <p>
        {recipe.strInstructions}
      </p>

    </div>

  );

}

export default RecipeDetails;