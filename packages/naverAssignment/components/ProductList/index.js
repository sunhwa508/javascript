export default function ProductList(count) {
  this.state = count;
  // 실행부: 리렌더링, 인스턴스를 다시 선언하지 않고 상태를 적용하는 렌더링
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  // 선언부
  this.render = () => {
    const countArray = Array.from({ length: this.state });
    const html = (
      <div>
        <ul>${countArray.map((_, index) => <li>${index}</li>).join('')}</ul>
      </div>
    );
    document.querySelector('.app').innerHTML = html;
  };
  // 실행부: 초기화(Init)
  this.render();
}

let globalIndex = 4;
const productList = new ProductList(globalIndex);
document.querySelector('button').addEventListener('click', () => {
  productList.setState(++globalIndex);
  // instance 쌓여요... => Memory Leak
});
