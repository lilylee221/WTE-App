export default class View {
  _data;
  render(data) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    const recipeInnerHtml = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', recipeInnerHtml);
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
