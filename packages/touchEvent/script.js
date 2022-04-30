const topHalf = document.getElementById('top-half');

topHalf.addEventListener('touchstart', (e) => {
  e.preventDefault(); // 터치 막음
  if (e.targetTouches.lenfth >= 2) {
    console.log('More than 2 fingers');
  }

  console.log('touched', e.touches.length); // 동시에 터치 되고있는 갯수
  console.log('targets', e.targetTouches.length); // 동시에 터치 되고있는 타겟
  console.log('changed', e.changedTouches.length);
});

document.addEventListener('click', (e) => {
  console.log('Clicked');
});

document.addEventListener('touchstart', (e) => {
  [...e.changedTouches].forEach((touch) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.top = `${touch.pageY}px`;
    dot.style.left = `${touch.pageX}px`;
    dot.id = touch.identifier;
    document.body.append(dot);
  });
});

document.addEventListener('touchmove', (e) => {
  [...e.changedTouches].forEach((touch) => {
    const dot = document.getElementById(touch.identifier);
    dot.style.top = `${touch.pageY}px`;
    dot.style.left = `${touch.pageX}px`;
  });
});

document.addEventListener('touchend', (e) => {
  [...e.changedTouches].forEach((touch) => {
    const dot = document.getElementById(touch.identifier);
    dot.remove();
  });
});

document.addEventListener('touchcancel', (e) => {
  [...e.changedTouches].forEach((touch) => {
    const dot = document.getElementById(touch.identifier);
    dot.remove();
  });
});
