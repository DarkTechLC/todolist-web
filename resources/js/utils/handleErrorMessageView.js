export default ({ message }, time = 7000) => {
  const alertBox = document.querySelector('.js-alert-box');
  const alertBoxMessage = document.querySelector('.js-alert-box-message');

  alertBox.classList.remove('alert-box--hidden');
  alertBoxMessage.textContent = message;

  setTimeout(() => {
    alertBox.classList.add('alert-box--hidden');
  }, time);
}