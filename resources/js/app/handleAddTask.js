import generateFormData from '../utils/generateFormData.js';
import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js';
import handleApiData from '../utils/handleApiData.js';
import handleLocationURL from '../utils/handleLocationURL.js';
import handleErrorMessageView from '../utils/handleErrorMessageView.js';
import { toggleAddTaskArea } from './toggleAddTaskArea.js';

export default () => {
  const formElement = document.querySelector('.js-form-add-task');

  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = generateFormData(formElement);
    const { token } = handleDataInLocalStorage.getData();

    const data = await handleApiData(
      '/user/todos',
      'POST',
      formData,
      { Authorization: token }
    );

    if (data.error === true && data.auth === false) {
      handleErrorMessageView(data);
      handleLocationURL('/form/login', 2000);
      return;
    }

    if (data.error === false) {
      console.log(data);
      // Add task in DOM
      formElement.reset();
      toggleAddTaskArea();
      return;
    }

    return handleErrorMessageView(data);
  });
}