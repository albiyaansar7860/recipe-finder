import { useEffect, useState }
from "react";
import { getCategories }
from "../services/api";

function CategoryFilter({
  onSelect
}) {

  const [categories,
        setCategories] =
        useState([]);

  useEffect(() => {

    getCategories()
    .then(setCategories);

  }, []);

  return (

    <select
      onChange={(e)=>
        onSelect(
          e.target.value
        )
      }
    >

      <option>
        All Categories
      </option>

      {categories.map(
        (cat) => (

        <option
          key={cat.idCategory}
          value={cat.strCategory}
        >
          {cat.strCategory}
        </option>

      ))}

    </select>

  );
}

export default CategoryFilter;