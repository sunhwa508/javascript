// const closure = () => {
//   for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//       console.log(i);
//     }, i + 1000);
//   }
// };

// closure 해결1
// var 유지 -> 즉시 실행 함수로 클로저 생성 (스코프 조작)
const closure1 = () => {
  for (var i = 0; i < 5; i++) {
    (function (j) {
      setTimeout(() => {
        console.log(j);
      }, i + 1000);
    })(i);
  }
};

closure1();

// var -> let 변경하기
const closure2 = () => {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i + 1000);
  }
};

closure2();
