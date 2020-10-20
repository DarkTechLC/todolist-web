const $ = (el) => document.querySelector(el);

const btnTaskAreaTrigger = $('.js-task-area-trigger');
const btnProfileAreaTrigger = $('.js-profile-area-trigger');
const btnAddTaskTrigger = $('.js-add-task-trigger');
const taskAreaEl = $('.js-task-area');
const profileAreaEl = $('.js-profile-area');

export default () => {
  btnTaskAreaTrigger.addEventListener('click', () => {
    btnTaskAreaTrigger.classList.add('is-active');
    btnProfileAreaTrigger.classList.remove('is-active');
    btnAddTaskTrigger.classList.remove(
      'bottom-bar__container__item-btn-add-task--hidden'
    );

    taskAreaEl.classList.add('is-active');
    profileAreaEl.classList.remove('is-active');
  });

  btnProfileAreaTrigger.addEventListener('click', () => {
    btnProfileAreaTrigger.classList.add('is-active');
    btnTaskAreaTrigger.classList.remove('is-active');
    btnAddTaskTrigger.classList.add(
      'bottom-bar__container__item-btn-add-task--hidden'
    );

    profileAreaEl.classList.add('is-active');
    taskAreaEl.classList.remove('is-active');
  });
};
