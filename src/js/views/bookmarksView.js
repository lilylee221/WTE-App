import View from './view.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.header__bookmarks__list');
  _errorMessage = 'There is not any bookmark yet.';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

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

export default new BookmarksView();
