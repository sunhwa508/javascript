/**
 * waterMelon함수는 정수 n을 매개변수로 입력받습니다.>
 * 길이가 n이고, 수박수박수…와 같은 패턴을 유지하는 문자열을 리턴하도록 함수를 완성하세요.
 *
 * ex_ waterMelon(4)이 4이면 ‘수박수박’을 리턴하고 waterMelon(3)이라면 ‘수박수’를 리턴하면 됩니다.
 */

const waterMelon = (repeatNumber) => {
  let result = '';
  if (repeatNumber < 0) return '음수 입니다.';
  for (let i = 0; i < repeatNumber; i++) {
    if (i % 2 === 0) {
      result += '수';
    } else {
      result += '박';
    }
  }
  return result;
};

console.log(waterMelon(0));
