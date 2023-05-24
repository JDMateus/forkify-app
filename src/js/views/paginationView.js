import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const btnPrev = `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;

    const numberOfPages = `
      <div class="btn--inline">Page ${`${curPage} of ${numPages}`}</div>
    `;

    const btnNext = `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    const placeholder = `
      <div class="white-space"></div>      
    `;

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1)
      return placeholder + numberOfPages + btnNext;

    // Last page
    if (curPage === numPages && numPages > 1)
      return btnPrev + numberOfPages + placeholder;

    // Other page than 1 or last
    if (curPage < numPages) return btnPrev + numberOfPages + btnNext;

    // Page 1, there are NO other pages
    return '';
  }

  _generateMarkupButton() {}
}

export default new PaginationView();
