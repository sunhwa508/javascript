import Toast from './Toast.js';

const toast = new Toast({ position: 'top-right', text: 'hello', autoClose: 1000 });

setTimeout(() => {
  toast.remove();
}, 1000);

setTimeout(() => {
  new Toast({ position: 'top-right', text: 'Second' });
  new Toast({ position: 'top-left', text: 'Third' });
}, 2000);
