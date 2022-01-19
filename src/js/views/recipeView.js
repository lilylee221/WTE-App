import View from './view.js';

class RecipeView extends View {
  _parentEl = document.querySelector('.recipe');
  _errorMessage = 'We cannot find such recipe. Please try another one.';

  //hash change event listener
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  addHandlerBookmark(handler) {
    this._parentEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.recipe__info__bookmark');
      if (!btn) return;
      handler();
    });
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
    ingredientsArr.forEach((ing, i) => {
      const measurement = measureArr[i];
      ingredientAndMeasure.push(
        `<li class="recipe__ingredients__item">${measurement} ${ing}</li>`
      );
    });

    return ` 
    <img src="${
      this._data.strMealThumb
    }" alt="recipe thumbnail image" class="recipe__img" />
   
    <div class="recipe__info">
        <div class="recipe__info__title-and-type">
            <h1 class="recipe__info__title">${this._data.strMeal}</h1>
             <span class="recipe__info__type">${this._data.strArea}/${
      this._data.strCategory
    }</span>
        </div>
        <button class="recipe__info__bookmark"><i class="fa${
          this._data.bookmarked ? 's' : 'r'
        } fa-bookmark"></i></button>  
      </div>

  <div class="recipe__ingredients">
    <h2>Recipe Ingredients</h2>
    <ul class="recipe__ingredients__list">
    ${ingredientAndMeasure.join('')}
    </ul>
    </div>
    <div class="recipe__instructions">
    <h2>Instructions</h2>
    <p>
        ${this._data.strInstructions}
    </p>
    <a href="${
      this._data.strYoutube
    }" class="recipe__instructions__video" target="_black"><i class="far fa-play-circle"></i> Watch How To Cook</a>
  </div>`;
  }
}

export default new RecipeView();
