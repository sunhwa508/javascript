console.log('hi');

// function style
function Pagination() {
  this.setState = (nextState) => {
    this.state = nextState;
  };

  const tempFunc = () => {
    this.setState('hello');
  };

  tempFunc();
  console.log(this.state);

  this.render = () => {
    return '<div><span>1</span><span>2</span></div>';
  };
}

// entry 진입점 (파일 따로 가능)
new Pagination();
