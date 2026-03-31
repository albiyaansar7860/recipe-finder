import { Link } from "react-router-dom";

function RecipeCard({
  recipe,
  onFavorite
}) {

  const getIngredients = () => {

    let ingredients = [];

    for (let i = 1; i <= 20; i++) {

      const ingredient =
        recipe[`strIngredient${i}`];

      if (ingredient && ingredient.trim() !== "") {

        ingredients.push(ingredient);

      }

    }

    return ingredients;

  };

  return (

    <div className="card">

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <h3>{recipe.strMeal}</h3>

      {/* ⭐ View Details Button */}
      <Link
        to={`/recipe/${recipe.idMeal}`}
      >
        <button>
          View Details 🔍
        </button>
      </Link>

      <h4>Ingredients:</h4>

      <ul>

        {getIngredients().map(
          (item, index) => (

            <li key={index}>
              {item}
            </li>

          ))}

      </ul>

      {/* ⭐ Save Favorite Button */}
      <button
        onClick={() =>
          onFavorite(recipe)
        }
      >
        Save ❤️
      </button>

    </div>

  );

}

export default RecipeCard;