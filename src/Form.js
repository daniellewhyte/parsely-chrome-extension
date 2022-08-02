import React, { useState } from "react";
import PropTypes from "prop-types";
import "./App.css"

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
      <input type="text" placeholder="Enter URL" onChange={getURL}></input>
      <input type="submit" value="Download" id="submit-button" className="button"></input>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};

export default Form;