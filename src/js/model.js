import { getJSON } from './helpers.js';
import { API_URL, RES_IN_PAGE } from './config.js';

export const state = {
  recipe: {},
  search: {
    keyword: '',
    results: [],
    resultsInPage: RES_IN_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}lookup.php?i=${id}`);
    state.recipe = data.meals[0];
    if (
      state.bookmarks.find(
        (bookmark) => bookmark.idMeal === state.recipe.idMeal
      )
    ) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (keyword) {
  try {
    state.search.keyword = keyword;
    const data = await getJSON(`${API_URL}search.php?s=${keyword}`);
    state.search.results = data.meals;
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsInPage;
  const end = page * state.search.resultsInPage;
  return state.search.results.slice(start, end);
};

const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  //add bookmark
  state.bookmarks.push(recipe);
  //store it
  storeBookmarks();
  //mark current recipe bookmarked
  if (recipe.idMeal === state.recipe.idMeal) state.recipe.bookmarked = true;
};
export const removeBookmark = function (recipe) {
  //delete bookmark
  const index = state.bookmarks.findIndex(
    (bookmark) => bookmark.idMeal === recipe.idMeal
  );
  state.bookmarks.splice(index, 1);
  //update localStorage
  storeBookmarks();
  //remove bookmark from current recipe
  if (recipe.idMeal === state.recipe.idMeal) {
    state.recipe.bookmarked = false;
  }
};

export const callBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
