//유효성 체크
// - 길이
// - 빈 값
// - 비밀번호 체크

const form = document.querySelector('.login-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
    alert('값을 입력해주세요.');
    return;
  }

  if (e.target[1].value !== e.target[2].value) {
    alert('비밀번호가 맞지 않습니다.');
    return;
  }

  alert('회원가입이 완료되었습니다!');
  e.target[0].value = '';
  e.target[1].value = '';
  e.target[2].value = '';
});

// form.addEventListener('change', (e) => {
//   if (e.target.value > 10) console.log('10자리 미만 입력해주세요!');
// });

// function checkLength(value) {
//   if(value.length < 10) true
// }
