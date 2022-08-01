import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form.js";
import Recipe from "./Recipe.js";
import { postRecipeAsync, getAllRecipesAsync } from "./apiCalls";
import axios from "axios";

axios.defaults.baseURL = 'https://parsely-backend.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/vnd.api+json';

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

  const recipeElements = recipeData.map(
    (recipe) => {
      return <li><Recipe recipe={recipe} /></li>;
    }
  );

  console.log(recipeData)

  return (
    <div>
      <Form onSubmit={onFormSubmit} />
      <ul>{recipeElements}</ul>
    </div>

  );
}

export default App;
