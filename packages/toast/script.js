import Toast from './Toast.js';

document.querySelector('button').addEventListener('click', () => {
  const toast = new Toast({ position: Math.random() > 0.5 ? 'top-right' : 'top-center', text: 'hello', autoClose: false, canClose: false });
});

setTimeout(() => {
  toast.update({ text: 'bye', position: 'top-left' });
}, 1000);

setTimeout(() => {
  new Toast({ position: 'top-right', text: 'Second' });
  new Toast({ position: 'top-left', text: 'Third' });
}, 2000);
