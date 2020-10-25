import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js';
import handleApiData from '../utils/handleApiData.js';

const $ = (el) => document.querySelector(el);

const userNameEl = $('.js-user-name');
const userEmailEl = $('.js-user-email');

export default async () => {
  const { token } = handleDataInLocalStorage.getData();

  const data = await handleApiData(
    '/user/profile',
    'GET',
    {},
    {
      Authorization: token,
    }
  );

  if (data.error === true && data.auth === false) {
    handleErrorMessageView(data);
    handleLocationURL('/form/login', 2000);
    return;
  }

  if (data.error === false) {
    const { user_name, user_email } = data;
    userNameEl.textContent = user_name;
    userEmailEl.textContent = user_email;
    return;
  }

  return handleErrorMessageView(data);
};
