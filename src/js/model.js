import { getJSON } from './helpers.js';
import { API_URL } from './config.js';

export const state = {
  recipe: {},
  search: {
    keyword: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}lookup.php?i=${id}`);
    state.recipe = data.meals[0];
    console.log(data, state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (keyword) {
  try {
    state.search.keyword = keyword;
    const data = await getJSON(`${API_URL}search.php?s=${keyword}`);
    state.search.results = data.meals;
  } catch (err) {
    throw err;
  }
};
