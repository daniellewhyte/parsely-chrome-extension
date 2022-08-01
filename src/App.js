import React, { useState } from "react";
import "./App.css";
import Form from "./Form.js";
import { postRecipeAsync, getAllRecipesAsync } from "./apiCalls";
import axios from "axios";

axios.defaults.baseURL = 'https://parsely-backend.herokuapp.com';
axios.defaults.headers.post['Content-Type'] = 'application/vnd.api+json';

function App() {

  const [recipeData, setRecipeData] = useState([]);
  //data: list of recipe titles

  const createObject = (responseData) => {
    return responseData.data.attributes
  }

  const getAllRecipes = () => {
    getAllRecipesAsync()
    .then((recipes) => {
      const listOfRecipes = recipes.map((recipe) => {
        return createObject(recipe);
      })
      return listOfRecipes;
    })
    .catch((err) => {
      console.log(err.data.message);
    })
  }

  const postRecipe = (url) => {
    postRecipeAsync(url)
    .then(() => {
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
