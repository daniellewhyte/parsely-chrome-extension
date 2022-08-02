import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form.js";
import { postRecipeAsync, getAllRecipesAsync, getFullRecipeAsync } from "./apiCalls";
import RecipeList from "./RecipeList";

function App() {
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

  const postRecipe = (url) => {
    postRecipeAsync(url).then(() => {
      update();
    });
  };

  const update = () => {
    const newRecipeData = getAllRecipes();
    setRecipeData(newRecipeData);
  };

  const onFormSubmit = (url) => {
    postRecipe(url);
  };

  return <Form onSubmit={onFormSubmit} />;
}

export default App;
