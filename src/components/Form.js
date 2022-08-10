import React, { useState } from "react";
import PropTypes from "prop-types";
import "../App.css"

const Form = (props) => {
  const [currentURL, setURL] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    console.log(event.target[0].value)
    setURL(event.target[0].value);
    props.onSubmit(currentURL);
    console.log(`The current URL is ${currentURL}`);
  };

  const getURL = (event) => {
    setURL(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter URL" onChange={getURL}></input>
      <input type="submit" value="Save" id="submit-button" className="button"></input>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};

export default Form;