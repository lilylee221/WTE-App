import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';

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

    //update result view to mark selected result
    resultsView.update(model.getSearchResultsPage());
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
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
    //Render pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
  }
};

const controlPaginationBtn = function (gotoPage) {
  //Render goToPage
  resultsView.render(model.getSearchResultsPage(gotoPage));
  //Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlBookmark = function () {
  //add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmark list
  bookmarksView.render(model.state.bookmarks);
};
const loadBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const init = () => {
  model.callBookmarks();
  bookmarksView.addHandlerRender(loadBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPaginationBtn);
};

init();
