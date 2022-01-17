'use strict';

const recipeEl = document.querySelector('.recipe');
const listEl = document.querySelector('.recipe-list');

//spinner function
const renderSpinner = (parentEl) => {
  const markup = `
    <div class="recipe__spinner">
        <i class="fas fa-spinner"></i>
  </div>`;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('beforeend', markup);
};

const renderRecipe = async function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  //load Recipe API
  try {
    renderSpinner(recipeEl);
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    const recipe = data.meals[0];
    console.log(data, recipe);

    //ingredient array, measurement array of the recipe to render
    const ingredientsArr = Object.keys(recipe)
      .filter(
        (key) =>
          key.includes('Ingredient') &&
          recipe[key] !== '' &&
          recipe[key] !== null
      )
      .map((k) => recipe[k]);

    const measureArr = Object.keys(recipe)
      .filter(
        (key) =>
          key.includes('Measure') && recipe[key] !== '' && recipe[key] !== null
      )
      .map((k) => recipe[k]);

    let ingredientAndMeasure = [];
    for (let i = 0; i < ingredientsArr.length; i++) {
      ingredientAndMeasure.push(
        `<li class="recipe__ingredients__item">${ingredientsArr[i]} - ${measureArr[i]}</li>`
      );
    }

    console.log(measureArr);
    //render recipe
    const recipeInnerHtml = ` 
  <img src="${
    recipe.strMealThumb
  }" alt="recipe thumbnail image" class="recipe__img" />
 
  <div class="recipe__info">
      <div="recipe__info__title-and-type">
          <span class="recipe__info__title">${recipe.strMeal}</span>
           <span class="recipe__info__type">${recipe.strArea}/${
      recipe.strCategory
    }</span>
      </div>
      <div class="recipe__info__controller">
          <div class="recipe__info__portion">
              <span class="recipe__info__portion-base"><i class="far fa-user"></i> 2 portions</span>
              <button class="recipe__info__portion-btn plus">+</button>
              <button class="recipe__info__portion-btn minus">-</button>
          </div>
          <div class="recipe__info__custom-bookmark">
              <span class="recipe__info__custom"><i class="far fa-id-badge"></i></span>
              <button class="recipe__info_bookmark"><i class="far fa-bookmark"></i></button>
          </div>
      </div>
  </div>
<div class="recipe__ingredients">
  <h1>Recipe Ingredients</h1>
  <ul class="recipe__ingredients__list">
  ${ingredientAndMeasure.join('')}
  </ul>
  </div>
  <div class="recipe__instructions">
  <h1>Instructions</h1>
  <p>
      ${recipe.strInstructions}
  </p>
  <a href="${
    recipe.strYoutube
  }" class="recipe__instructions__video" target="_black">Watch How To Cook</a>
</div>`;
    recipeEl.innerHTML = '';
    recipeEl.insertAdjacentHTML('beforeend', recipeInnerHtml);
  } catch (err) {
    alert(err);
  }
};

//hash change event listener
window.addEventListener('hashchange', renderRecipe);
window.addEventListener('load', renderRecipe);
