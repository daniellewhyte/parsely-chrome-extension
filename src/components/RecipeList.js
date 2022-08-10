import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  getAllRecipesAsync,
  getFullRecipeAsync,
  deleteRecipeAsync,
} from "../apiCalls";
import "./RecipeList.css";
import { useLinkClickHandler } from "react-router-dom";

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

  const deleteRecipe = () => {
    deleteRecipeAsync(fullRecipe.id)
      .then(() => {
        getAllRecipes();
        setFullRecipe({
          title: "",
          instructions: "",
          ingredients: "",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const saveFile = () => {
    //const fileData = JSON.stringify(fullRecipe);
    const fileData = document.getElementsByClassName("full-recipe-container")[0].innerHTML;
    const blob = new Blob([fileData], { type: "text/html" });
    const fileURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "fullRecipe.html";
    link.href = fileURL;
    link.click();
  };

  return (
    <div className="grid-container">
      <section className="recipe-link-container">
        <h2> All Recipes </h2>
        {recipeButtons}
      </section>
      <section className="full-recipe-container">
        <h2>{fullRecipe.title}</h2>
        <section
          dangerouslySetInnerHTML={{ __html: fullRecipe.ingredients }}
        ></section>
        <section
          dangerouslySetInnerHTML={{ __html: fullRecipe.instructions }}
        ></section>
        <section>
          {fullRecipe.id ? <button onClick={saveFile}>Export</button> : ""}
          {fullRecipe.id ? <button onClick={deleteRecipe}>Delete</button> : ""}
        </section>
      </section>
    </div>
  );
};

// RecipeList.PropTypes = {
//   recipeData: PropTypes.arrayOf(PropTypes.object),
// };
export default RecipeList;
