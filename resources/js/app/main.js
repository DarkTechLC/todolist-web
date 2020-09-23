import haveAToken from './haveAToken.js';
import handleLocationURL from '../utils/handleLocationURL.js';
import displayUserName from './displayUserName.js';
import setDate from './setDate.js';
import { toggleAddTaskAreaWithClick } from './toggleAddTaskArea.js';
import handleAddTask from './handleAddTask.js';
import { renderTaskList } from './TaskList.js';

const main = async () => {
  if (!haveAToken())
    return handleLocationURL('/form/login', 0);

  await renderTaskList('/user/todos');
  displayUserName();
  setDate();
  toggleAddTaskAreaWithClick();
  handleAddTask();
}

main();