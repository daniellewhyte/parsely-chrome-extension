import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form.js";
import Recipe from "./Recipe.js";
import { postRecipeAsync, getAllRecipesAsync } from "./apiCalls";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function App() {

  const [recipeData, setRecipeData] = useState([]);
  //recipeData: list of recipe titles

  const getAllRecipes = () => {
    getAllRecipesAsync()
    .then((listOfRecipes) => {
      setRecipeData(listOfRecipes);
      })
    .catch((err) => {
      console.log(err.message);
    })
  }

  // const update = () => {
  //   const newRecipeData = getAllRecipes();
  //   setRecipeData(newRecipeData);
  // };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const postRecipe = (url) => {
    postRecipeAsync(url)
    .then(() => {
      getAllRecipes();
    });
  };

  const onFormSubmit = (url) => {
    postRecipe(url);
  };


  // const recipeElements = recipeData.map(
  //   (recipe) => {
  //     return <li><Recipe recipe={recipe} /></li>;
  //   }
  // );

  console.log(recipeData)

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/my-recipes');
  }

  return (
    <div>
      <Form onSubmit={onFormSubmit} />
      <button
      onClick={handleClick}
      >
        My Recipes
      </button>
    </div>
  );
}

export default App;
