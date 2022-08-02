import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAllRecipesAsync, getFullRecipeAsync } from "./apiCalls";
import "./RecipeList.css";

const RecipeList = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [fullRecipe, setFullRecipe] = useState({
    title: "",
    instructions: "",
    ingredients: "",
  });

  const getAllRecipes = () => {
    getAllRecipesAsync()
      .then((recipes) => {
        setRecipeData(recipes);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(getAllRecipes, [recipeData]);

  const showRecipe = (id) => {
    getFullRecipeAsync(id)
      .then((recipe) => {
        setFullRecipe(recipe);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const recipeButtons = recipeData.map((recipe) => {
    const handleClick = () => {
      showRecipe(recipe.id);
    };
    return (
      <button key={recipe.id} onClick={handleClick} className="recipe-link">
        {recipe.title}{" "}
      </button>
    );
  });

  return (
    <div className="grid-container">
      <section className="recipe-link-container">
        <h2> All Recipes </h2>
        {recipeButtons}
      </section>
      <section className="full-recipe-container">
        <h2>{fullRecipe.title}</h2>
        <p>{fullRecipe.ingredients}</p>
        <p>{fullRecipe.instructions}</p>
      </section>

    </div>
  )
};

// RecipeList.PropTypes = {
//   recipeData: PropTypes.arrayOf(PropTypes.object),
// };
export default RecipeList;