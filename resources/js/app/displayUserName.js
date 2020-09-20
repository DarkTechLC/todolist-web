import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js';

export default () => {
  const userNameEl = document.querySelector('.js-welcome-name');
  const { user_name: userName } = handleDataInLocalStorage.getData();

  userNameEl.textContent = userName;
}