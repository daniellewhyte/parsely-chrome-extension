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

  const showRecipe = (id) => {
    getFullRecipeAsync(id)
    .then((recipe) => {
      setFullRecipe(recipe);
    })
    .catch((err) => {
      console.log(err.message);
    })
  };

  return (
    <div>
      <Form onSubmit={onFormSubmit} />
      <RecipeList recipeData={recipeData} onButtonClick={showRecipe} />
      <section>
      <h2>{fullRecipe.title}</h2>
      <p>{fullRecipe.ingredients}</p>
      <p>{fullRecipe.instructions}</p>
      </section>
    </div>
  );
}

export default App;
