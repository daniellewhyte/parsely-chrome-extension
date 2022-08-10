import axios from "axios";

const baseURL = "https://parsely-backend.herokuapp.com";
const HEADERS = {
  headers: {
    "Content-Type": "application/vnd.api+json",
  },
};

const createRequest = (obj) => {
  return {
    data: {
      type: "Recipe",
      attributes: {
        url: obj,
      },
    },
  };
};

const createObject = (responseData) => {
  return { ...responseData.attributes, id: responseData.id };
};

export const postRecipeAsync = (url) => {
  return axios
    .post(`${baseURL}/recipes/`, createRequest(url), HEADERS)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("Error creating recipe");
    });
};

export const getAllRecipesAsync = () => {
  return axios
    .get(`${baseURL}/titles/`, HEADERS)
    .then((response) => {
      return response.data.data.map(createObject);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getFullRecipeAsync = (id) => {
  return axios
    .get(`${baseURL}/recipes/${id}`, HEADERS)
    .then((response) => {
      return createObject(response.data.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deleteRecipeAsync = (id) => {
  return axios
    .delete(`${baseURL}/recipes/${id}`, HEADERS)
    .then(() => {
      console.log("Recipe deleted");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
