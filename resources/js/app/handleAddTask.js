import generateFormData from '../utils/generateFormData.js';
import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js';
import handleApiData from '../utils/handleApiData.js';
import handleLocationURL from '../utils/handleLocationURL.js';
import handleErrorMessageView from '../utils/handleErrorMessageView.js';
import TaskItem from './TaskItem.js';
import { toggleAddTaskArea } from './toggleAddTaskArea.js';

export default () => {
  const formElement = document.querySelector('.js-form-add-task');

  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = generateFormData(formElement);
    const { token } = handleDataInLocalStorage.getData();

    const data = await handleApiData('/user/todos', 'POST', formData, {
      Authorization: token,
    });

    if (data.error === true && data.auth === false) {
      handleErrorMessageView(data);
      handleLocationURL('/form/login', 2000);
      return;
    }

    if (data.error === false) {
      const taskList = document.querySelector('.js-task-list');
      const currentPriority = taskList.getAttribute('data-current-priority');
      const { new_todo } = data;

      if (currentPriority === '' || +currentPriority === new_todo.priority) {
        const newTaskItemEl = new TaskItem(new_todo).createTaskElement();
        taskList.prepend(newTaskItemEl);
      }

      formElement.reset();
      toggleAddTaskArea();
      return;
    }

    return handleErrorMessageView(data);
  });
};
