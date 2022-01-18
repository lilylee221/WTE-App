import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// import 'core-js';
// import 'regenerator-runtime';
const recipeEl = document.querySelector('.recipe');
const listEl = document.querySelector('.recipe-list');

//spinner function

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //render spinner
    recipeView.renderSpinner();
    //load Recipe API
    await model.loadRecipe(id);

    //render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    //Get search keyword
    const keyword = searchView.getKeyword();
    if (!keyword) return;
    //Render spinner
    resultsView.renderSpinner();
    //load search results
    await model.loadSearchResults(keyword);
    //Render results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
};

init();
