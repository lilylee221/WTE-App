import * as model from './model.js';
import recipeView from './views/RecipeView.js';
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

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
};

init();
