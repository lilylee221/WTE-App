export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const recipeInnerHtml = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', recipeInnerHtml);
  }
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const newRecipeInnerHtml = this._generateMarkup();

    const newDom = document
      .createRange()
      .createContextualFragment(newRecipeInnerHtml);
    const newEls = Array.from(newDom.querySelectorAll('*'));
    const currentEls = Array.from(this._parentEl.querySelectorAll('*'));
    newEls.forEach((newEl, i) => {
      const currentEl = currentEls[i];
      if (!newEl.isEqualNode(currentEl)) {
        currentEl.innerHTML = newEl.innerHTML;
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
          <div class="spinner">
              <i class="fas fa-spinner"></i>
        </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
      <span class="error-message"><i class="fas fa-exclamation-triangle"></i>${message}</span>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }
}
