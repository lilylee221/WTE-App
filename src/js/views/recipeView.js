class RecipeView {
  #parentEl = document.querySelector('.recipe');
  #data;
  #errorMessage = 'We cannot find such recipe. Please try another one.';

  render(data) {
    this.#data = data;
    const recipeInnerHtml = this.#generateMarkup();
    this.#clear();
    this.#parentEl.insertAdjacentHTML('beforeend', recipeInnerHtml);
  }

  #clear() {
    this.#parentEl.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
      <div class="recipe__spinner">
          <i class="fas fa-spinner"></i>
    </div>`;
    this.#clear();
    this.#parentEl.insertAdjacentHTML('beforeend', markup);
  }

  //hash change event listener
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }
  renderError(message = this.#errorMessage) {
    const markup = `
      <span class="recipe__error-message"><i class="fas fa-exclamation-triangle"></i>${message}</span>`;
    this.#clear();
    this.#parentEl.insertAdjacentHTML('beforeend', markup);
  }
  #generateMarkup() {
    const ingredientsArr = Object.keys(this.#data)
      .filter(
        (key) =>
          key.includes('Ingredient') &&
          this.#data[key] !== '' &&
          this.#data[key] !== null
      )
      .map((k) => this.#data[k]);

    const measureArr = Object.keys(this.#data)
      .filter(
        (key) =>
          key.includes('Measure') &&
          this.#data[key] !== '' &&
          this.#data[key] !== null
      )
      .map((k) => this.#data[k]);

    let ingredientAndMeasure = [];
    for (let i = 0; i < ingredientsArr.length; i++) {
      ingredientAndMeasure.push(
        `<li class="recipe__ingredients__item">${ingredientsArr[i]} - ${measureArr[i]}</li>`
      );
    }
    return ` 
    <img src="${
      this.#data.strMealThumb
    }" alt="recipe thumbnail image" class="recipe__img" />
   
    <div class="recipe__info">
        <div="recipe__info__title-and-type">
            <span class="recipe__info__title">${this.#data.strMeal}</span>
             <span class="recipe__info__type">${this.#data.strArea}/${
      this.#data.strCategory
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
        ${this.#data.strInstructions}
    </p>
    <a href="${
      this.#data.strYoutube
    }" class="recipe__instructions__video" target="_black">Watch How To Cook</a>
  </div>`;
  }
}

export default new RecipeView();
