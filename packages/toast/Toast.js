const DEFAULT_OPTIONS = {
  autoClose: 5000,
  potision: 'top-right',
  onClose: () => {},
  canClose: true,
};

export default class Toast {
  #toastElem;
  #autoCloseTimeout;
  #removeBinded;

  constructor(options) {
    this.#toastElem = document.createElement('div');
    this.#toastElem.classList.add('toast');
    requestAnimationFrame(() => {
      this.#toastElem.classList.add('show');
    });
    this.#removeBinded = this.remove.bind(this);
    this.update({ ...DEFAULT_OPTIONS, ...options });
  }

  set position(value) {
    const currentContainer = this.#toastElem.parentElement;
    const selector = `[data-position="${value}"]`;
    const container = document.querySelector(selector) || createContainer(value);
    container.append(this.#toastElem);
    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set autoClose(value) {
    if (value === false) return;
    if (this.#autoCloseTimeout !== null) clearTimeout(this.#autoCloseTimeout);
    this.#autoCloseTimeout = setTimeout(() => this.remove(), value);
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }

  set canClose(value) {
    console.log(this.#toastElem);
    this.#toastElem.classList.toggle('can-close', value);
    if (value) return this.#toastElem.addEventListener('click', () => this.#removeBinded);
    this.#toastElem.removeEventListener('click', () => this.#removeBinded);
  }

  update(options) {
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  remove() {
    const container = this.#toastElem.parentElement;
    this.#toastElem.remove();
    this.onClose();
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
