import haveAToken from './haveAToken.js';
import handleLocationURL from '../utils/handleLocationURL.js';
import displayUserName from './displayUserName.js';
import setDate from './setDate.js';
import handleFilteredTasks from './handleFilteredTasks.js';
import { toggleAddTaskAreaWithClick } from './toggleAddTaskArea.js';
import handleAddTask from './handleAddTask.js';
import { renderTaskList } from './TaskList.js';
import handleUserArea from './handleUserArea.js';
import displayUserInfo from './displayUserInfo.js';
import handleLogout from './handleLogout.js';

const main = async () => {
  if (!haveAToken()) return handleLocationURL('/form/login', 0);

  await renderTaskList('/user/todos');
  displayUserName();
  setDate();
  handleFilteredTasks();
  toggleAddTaskAreaWithClick();
  handleAddTask();
  handleUserArea();
  displayUserInfo();
  handleLogout();
};

main();
