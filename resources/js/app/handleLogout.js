import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js';
import handleLocationURL from '../utils/handleLocationURL.js';

const btnLogout = document.querySelector('.js-logout-btn');

export default () => {
  btnLogout.addEventListener('click', () => {
    handleDataInLocalStorage.removeData();
    handleLocationURL('/form/login');
  });
};
