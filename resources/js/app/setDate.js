import formatDate from '../utils/formatDate.js';

export default () => {
  const dateEl = document.querySelector('.js-welcome-date');

  const setDate = () => {
    dateEl.textContent = formatDate().shortFormat();
  };

  setDate();
  setInterval(setDate, 1000);
}