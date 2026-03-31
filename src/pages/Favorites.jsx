import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

function Favorites() {

  const [favorites, setFavorites] =
    useState([]);

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    setFavorites(saved);

  }, []);

  const removeFavorite = (id) => {

    const updated =
      favorites.filter(
        (item) =>
          item.idMeal !== id
      );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  return (

    <div>

      <h2>
        Favorite Recipes ❤️
      </h2>

      <div className="grid">

        {favorites.map(
          (recipe) => (

          <div key={recipe.idMeal}>

            <RecipeCard
              recipe={recipe}
              onFavorite={()=>{}}
            />

            <button
              onClick={() =>
                removeFavorite(
                  recipe.idMeal
                )
              }
            >
              Remove ❌
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Favorites;