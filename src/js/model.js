import { getJSON } from './helpers.js';
import { API_URL } from './config.js';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}i=${id}`);
    state.recipe = data.meals[0];
    console.log(data, state.recipe);
  } catch (err) {
    throw err;
  }
};
