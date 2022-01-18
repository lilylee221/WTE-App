class SearchView {
  #parentEl = document.querySelector('.header__search');
  #inputEl = document.querySelector('.header__search__input');

  getKeyword() {
    return this.#inputEl.value;
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
