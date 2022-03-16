const DEFAULT_OPTIONS = {
  autoClose: 5000,
  potision: 'top-right',
};

export default class Toast {
  #toastElem;
  #autoCloseTimeout;

  constructor(options) {
    this.#toastElem = document.createElement('div');
    this.#toastElem.classList.add('toast');
    Object.entries({ DEFAULT_OPTIONS, ...options }).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  set position(value) {
    const selector = `[data-position="${value}"]`;
    const container = document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElem);
  }
  //   show() {}

  set autoClose(value) {
    if (value === false) return;
    if (this.#autoCloseTimeout !== null) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }
  update() {}

  remove() {
    const container = this.#toastElem.parentElement;
    this.#toastElem.remove();
    if (container.hasChildNodes()) return;
    container.remove();
  }
}
function createContainer(position) {
  const container = document.createElement('div');
  container.classList.add('toast-container');
  container.dataset.position = position;
  document.body.append(container);
  return container;
}
