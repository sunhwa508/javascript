const cards = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.card-container');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);
      // 화면에 노출 되었다면 더이상 observer 하지 않는다
      // if(entry.isIntersecting) observer.unobserve(entry.target)
    });
  },
  {
    // 요소의 얼만큼이 화면에 노출/사라지면 애니메이션을 줄지
    threshold: 1,
  },
);

const lastCardObserver = new IntersectionObserver(
  (entries) => {
    const lastCard = entries[0];
    if (!lastCard.isIntersecting) return;
    loadNewCards();
    lastCardObserver.unobserve(lastCard.target);
    lastCardObserver.observe(document.querySelector('.card:last-child'));
  },
  {
    rootMargin: '100px',
  },
);

lastCardObserver.observe(document.querySelector('.card:last-child'));

cards.forEach((card) => {
  observer.observe(card);
});

function loadNewCards() {
  for (let i = 0; i < 10; i++) {
    const card = document.createElement('div');
    card.textContent = 'New Card';
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
}
