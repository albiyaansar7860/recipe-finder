import { useState } from "react";

import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

import { searchRecipes }
from "../services/api";

import { toast }
from "react-toastify";

function Home() {

  const [recipes, setRecipes] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleSearch =
    async (query) => {

      setLoading(true);

      const data =
        await searchRecipes(query);

      setRecipes(data || []);

      setLoading(false);

  };

  // ⭐ SAVE FAVORITE
  const saveFavorite = (recipe) => {

    let favorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    // Prevent duplicates
    const exists =
      favorites.find(
        (item) =>
          item.idMeal === recipe.idMeal
      );

    if (!exists) {

      favorites.push(recipe);

      localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );

      toast.success(
        "Recipe saved ❤️"
      );

    } else {

      toast.info(
        "Already saved ⭐"
      );

    }

  };

  return (

    <div>

      <SearchBar
        onSearch={handleSearch}
      />

      {loading && <Loader />}

      <div className="grid">

        {recipes.map((recipe) => (

          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onFavorite={
              saveFavorite
            }
          />

        ))}

      </div>

    </div>

  );

}

export default Home;