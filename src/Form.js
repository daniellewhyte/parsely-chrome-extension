import React, { useState } from "react";
import PropTypes from "prop-types";

const Form = (props) => {
  const [currentURL, setURL] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setURL(event.target.value);
    props.onSubmit(currentURL);
  };

  const getURL = (event) => {
    setURL(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter URL"
        onChange={getURL}
        ></input>
      <input
        type="submit"
        value="Download"
        ></input>
      <button>
        My Recipes
      </button>
    </form>
  );
};

export default Form;