import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form.js";
import {
  postRecipeAsync,
  getAllRecipesAsync,
} from "./apiCalls";
import { Link, Outlet } from "react-router-dom";

function App() {
  const [recipeData, setRecipeData] = useState([]);

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

  return (
    <div className="main-popup">
      <Form onSubmit={onFormSubmit} />
      <div>
        <Link to="/my-recipes" target="_blank">
          {" "}
          <button className="button" id="my-recipes-btn">
            My Recipes
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
