import displayUserName from './displayUserName.js';
import setDate from './setDate.js';
import { toggleAddTaskAreaWithClick } from './toggleAddTaskArea.js';
import handleAddTask from './handleAddTask.js';

const main = () => {
  displayUserName();
  setDate();
  toggleAddTaskAreaWithClick();
  handleAddTask();
}

main();