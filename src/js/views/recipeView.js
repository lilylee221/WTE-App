import View from './view.js';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'We cannot find such recipe. Please try another one.';

  //hash change event listener
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const ingredientsArr = Object.keys(this._data)
      .filter(
        (key) =>
          key.includes('Ingredient') &&
          this._data[key] !== '' &&
          this._data[key] !== null
      )
      .map((k) => this._data[k]);

    const measureArr = Object.keys(this._data)
      .filter(
        (key) =>
          key.includes('Measure') &&
          this._data[key] !== '' &&
          this._data[key] !== null
      )
      .map((k) => this._data[k]);

    let ingredientAndMeasure = [];
    for (let i = 0; i < ingredientsArr.length; i++) {
      ingredientAndMeasure.push(
        `<li class="recipe__ingredients__item">${measureArr[i]} ${ingredientsArr[i]}</li>`
      );
    }
    return ` 
    <img src="${
      this._data.strMealThumb
    }" alt="recipe thumbnail image" class="recipe__img" />
   
    <div class="recipe__info">
        <div="recipe__info__title-and-type">
            <span class="recipe__info__title">${this._data.strMeal}</span>
             <span class="recipe__info__type">${this._data.strArea}/${
      this._data.strCategory
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
        ${this._data.strInstructions}
    </p>
    <a href="${
      this._data.strYoutube
    }" class="recipe__instructions__video" target="_black">Watch How To Cook</a>
  </div>`;
  }
}

export default new RecipeView();
