const btnAddTaskTrigger = document.querySelector('.js-add-task-trigger');
const addTaskArea = document.querySelector('.js-add-task-modal');

export const toggleAddTaskArea = () => {
  btnAddTaskTrigger.classList.toggle('is-active');
  addTaskArea.classList.toggle('modal-task--hidden');
}

export const toggleAddTaskAreaWithClick = () => {
  btnAddTaskTrigger.addEventListener('click', toggleAddTaskArea);
}