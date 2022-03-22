const DEFAULT_OPTIONS = {
  currentPage: 1,
  totalItemCount: 300,
  pagePerItemCount: 20,
};

class Pagination {
  #pageElem;
  #pageNum;
  constructor(options) {
    this.#pageElem = document.createElement('nav');
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }
  setup() {}

  set currentPage(value) {
    console.log('currentPage', value);
    const selector = '.pagination';
    const container = document.querySelector(selector);
    container.append(this.#pageElem);
  }

  set totalItemCount(value) {
    console.log('totalItemCount', value);
  }

  set pagePerItemCount(value) {
    console.log('pagePerItemCount', value);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}

// entry 진입점 (파일 따로 가능)
new Pagination({ currentPage: 1, totalItemCount: 100, pagePerItemCount: 10 });
