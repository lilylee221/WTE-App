import View from './view.js';

class PaginationView extends View {
  _parentEl = document.querySelector('.list__pagination');
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const pageNumber = Math.ceil(
      this._data.results.length / this._data.resultsInPage
    );
    const currentPage = this._data.page;
    //page 1 and there are other pages
    if (currentPage === 1 && pageNumber > 1) {
      return `<button class="list__pagination__btn--next" data-goto="${
        currentPage + 1
      }">
      Page ${currentPage + 1} <i class="fas fa-arrow-right"></i>
    </button>`;
    }
    //page 1 and no more page
    if (currentPage === 1 && pageNumber === 1) {
      return '';
    }
    if (currentPage < pageNumber) {
      //other page
      return `
      <button class="list__pagination__btn--prev" data-goto="${
        currentPage - 1
      }">
      <i class="fas fa-arrow-left"></i> Page ${currentPage - 1}
    </button>
      <button class="list__pagination__btn--next" data-goto="${
        currentPage + 1
      }">
      Page ${currentPage + 1} <i class="fas fa-arrow-right"></i>
    </button>`;
    }
    if (currentPage === pageNumber) {
      // last page
      return `<button class="list__pagination__btn--prev" data-goto="${
        currentPage - 1
      }">
      <i class="fas fa-arrow-left"></i> Page ${currentPage - 1}
    </button>`;
    }
  }
}
export default new PaginationView();
