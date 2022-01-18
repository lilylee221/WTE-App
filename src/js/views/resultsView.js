import View from './view.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.recipe-list');
  _errorMessage = 'No recipe found for the keyword.';

  _generateMarkup() {
    return this._data.map(this._generateList).join('');
  }
  _generateList(result) {
    return `<li class="recipe-list__item">
<a href="#${result.idMeal}" class="recipe-list__item__link">
  <img src="${result.strMealThumb}" alt="recipe image" class="recipe-list__item__img" />
  <span class="recipe-list__item__title">${result.strMeal}</span>
</a>
</li>`;
  }
}

export default new ResultsView();
