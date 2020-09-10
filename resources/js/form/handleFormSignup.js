import generateFormData from '../utils/generateFormData.js'
import handleApiData from '../utils/handleApiData.js'
import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js'
import handleLocationURL from '../utils/handleLocationURL.js'
import handleErrorMessageView from '../utils/handleErrorMessageView.js'

const formElement = document.querySelector('.js-form');

formElement.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = generateFormData(formElement);

  const data = await handleApiData('/user/register', 'POST', formData);

  if (data.error === false && data.auth === true) {
    handleLocationURL('/app');
    handleDataInLocalStorage.saveData(data);
    return;
  }

  return handleErrorMessageView(data);
});
