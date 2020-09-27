import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js'
import handleLocationURL from '../utils/handleLocationURL.js';
import handleErrorMessageView from '../utils/handleErrorMessageView.js';
import handleApiData from '../utils/handleApiData.js';
import TaskItem from './TaskItem.js';

export const generateTaskList = async (resource) => {
  const { token } = handleDataInLocalStorage.getData();

  const data = await handleApiData(resource, 'GET', {}, { Authorization: token });

  if (data.error === true && data.auth === false) {
    handleErrorMessageView(data);
    handleLocationURL('/form/login', 2000);
    return;
  }

  if (data.error === false) {
    const taskList = document.createDocumentFragment();
    const { todos } = data;
    todos.forEach(todoData => taskList.append(TaskItem(todoData)));
    return taskList;
  }

  handleErrorMessageView(data);
  return;
}

export const renderTaskList = async (resource) => {
  const taskListEl = document.querySelector('.js-task-list');
  taskListEl.append(await generateTaskList(resource));
}