export default () => {
  const btnAddTaskTrigger = document.querySelector('.js-add-task-trigger');
  const addTaskArea = document.querySelector('.js-add-task-modal');

  btnAddTaskTrigger.addEventListener('click', () => {
    btnAddTaskTrigger.classList.toggle('is-active');
    addTaskArea.classList.toggle('modal-task--hidden');
  });
}