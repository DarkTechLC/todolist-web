import { renderTaskList } from './TaskList.js';

export default () => {
  const filterBtnsEl = document.querySelectorAll('.js-filter-btns');
  const taskList = document.querySelector('.js-task-list');

  filterBtnsEl.forEach((filterBtnEl) => {
    filterBtnEl.addEventListener('click', async () => {
      const priority = filterBtnEl.getAttribute('data-priority');

      document
        .querySelectorAll('.task-area__task-list__task-item')
        .forEach((taskItemEl) => taskItemEl.remove());

      filterBtnsEl.forEach((fBtnEl) => fBtnEl.classList.remove('is-active'));

      filterBtnEl.classList.add('is-active');
      taskList.setAttribute('data-current-priority', priority);

      await renderTaskList(`/user/todos?priority=${priority}`);
    });
  });
};
