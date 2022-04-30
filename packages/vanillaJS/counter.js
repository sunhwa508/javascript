class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  get count() {
    return this.getAttribute('count');
  }
  // count를 관찰할 정적 메소드
  static get observedAttributes() {
    return ['count'];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'count') {
      this.render();
      let btn = this.shadow.querySelector('#btn');
      btn.addEventListener('click', this.inc.bind(this));
    }
  }

  inc() {
    this.count++;
  }
  // when the count changed
  connectedCallback() {
    this.render();
    let btn = this.shadow.querySelector('#btn');
    btn.addEventListener('click');
  }

  render() {
    this.shadow.innerHTML = `
      <h1>Counter</h1>
      ${this.count}
      <button id='btn'>Increment</button>
    `;
  }
}

customElements.define('my-counter', MyCounter);
