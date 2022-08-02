import React, { useState } from "react";
import PropTypes from "prop-types";

const RecipeList = (props) => {
  return(
    props.recipeData.map((recipe) => {
      const handleClick = () => {
        props.onButtonClick(recipe.id);
      }
      return <button key={recipe.id} onClick={handleClick}>
        {recipe.title}
      </button>
    })
  )
}

RecipeList.PropTypes = {
  recipeData: PropTypes.arrayOf(PropTypes.object),
}
export default RecipeList