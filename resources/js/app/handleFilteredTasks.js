import { renderTaskList } from './TaskList.js';

export default () => {
  const filterBtnsEl = document.querySelectorAll('.js-filter-btns');

  filterBtnsEl.forEach((filterBtnEl) => {
    filterBtnEl.addEventListener('click', async () => {
      const priority = filterBtnEl.getAttribute('data-priority');

      document
        .querySelectorAll('.task-area__task-list__task-item')
        .forEach(taskItem => taskItem.remove());

      await renderTaskList(`/user/todos?priority=${priority}`);

      filterBtnsEl
        .forEach(fBtnEl => fBtnEl.classList.remove('is-active'));

      filterBtnEl.classList.add('is-active');
    });
  });
}