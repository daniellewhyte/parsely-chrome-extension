import React, {useState} from "react";
import PropTypes from "prop-types";

const Form = () => {
  const [url, setUrl] = useState('');

  const getUrl = (changeEvent) => {
    setUrl(changeEvent.target.value)
  }

  return (
    <section>
      <input type="text" value="Enter URL" onChange={getUrl}/>
      <input type="submit" value="Download" onChange={getUrl}/>
      <button>My Recipes</button>
    </section>
  )
};

export default Form;