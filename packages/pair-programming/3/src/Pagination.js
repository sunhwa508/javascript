const DEFAULT_OPTIONS = {
  currentPage: 1,
  totalItemCount: 10,
  pagePerItemCount: 5,
};

class Pagination {
  #pageElem;
  #pageList;
  #currentPage;
  constructor(options) {
    this.#pageElem = document.createElement('ul');
    this.#pageElem.classList.add('pagination');
    this.render({ ...DEFAULT_OPTIONS, ...options });
  }

  set currentPage(value) {
    console.log('currentPage', value);
    console.log(this.#pageList);
    this.#currentPage = value;
  }

  set totalItemCount(value) {
    const pageNumbers = Array.from({ length: value });
    const html = pageNumbers
      .map(
        (_, index) =>
          `<li>
          <a aria-current=${this.#currentPage === index + 1 ? 'page' : ''}>
            <span class="visuallyhidden">page </span>
            ${index + 1}
          </a>
        </li>`,
      )
      .join('');
    const selector = '.container';
    const container = document.querySelector(selector);
    this.#pageElem.innerHTML = html;
    container.append(this.#pageElem);
  }

  set pagePerItemCount(value) {
    console.log('pagePerItemCount', value);
  }

  render(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}

// entry 진입점 (파일 따로 가능)
new Pagination({ currentPage: 4, totalItemCount: 10, pagePerItemCount: 5 });
