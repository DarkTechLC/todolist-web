import generateFormData from '../utils/generateFormData.js';
import handleDataInLocalStorage from '../utils/handleDataInLocalStorage.js';
import handleLocationURL from '../utils/handleLocationURL.js';
import handleErrorMessageView from '../utils/handleErrorMessageView.js';
import handleApiData from '../utils/handleApiData.js';

export default class TaskItem {
  constructor({ id, title, description, priority, finished }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.finished = finished;
  }

  #priorityValues = {
    1: {
      type: 'low',
      text: 'baixa',
    },
    2: {
      type: 'medium',
      text: 'média',
    },
    3: {
      type: 'high',
      text: 'alta',
    },
  };

  #priorityTypes = {
    low: 1,
    medium: 2,
    high: 3,
  };

  #finishedValues = {
    true: 'Finalizado',
    false: 'Pendente',
  };

  async #finishTask(eventClick) {
    const { token } = handleDataInLocalStorage.getData();

    const data = await handleApiData(
      `/user/todos/${this.id}/finish`,
      'PATCH',
      {},
      { Authorization: token }
    );

    if (data.error === true && data.auth === false) {
      handleErrorMessageView(data);
      handleLocationURL('/form/login', 2000);
      return;
    }

    if (data.error === false) {
      const currentTaskEl = eventClick.target.parentNode.parentNode;
      const currentTaskHeaderStatusEl =
        currentTaskEl.firstElementChild.lastElementChild;
      const {
        updated_todo: { finished },
      } = data;

      currentTaskEl.setAttribute('data-finished', finished);
      currentTaskHeaderStatusEl.textContent = this.#finishedValues[finished];
      return;
    }

    handleErrorMessageView(data);
    return;
  }

  #editTask(eventClick) {
    const $ = (el) => document.querySelector(el);

    const currentTaskEl = eventClick.target.parentNode.parentNode;
    const currentTaskElInfo = currentTaskEl.children[1];
    const currentTaskElInfoTitleEl = currentTaskElInfo.firstElementChild;
    const currentTaskElInfoDescriptionEl = currentTaskElInfo.lastElementChild;
    const modalElement = $('.js-edit-task-modal');
    const formElement = $('.js-form-edit-task');
    const formElementInputTitle = $('.js-form-edit-task-input-title');
    const formElementInputDescription = $(
      '.js-form-edit-task-input-description'
    );
    const formElementInputPriority = $('.js-form-edit-task-input-priority');

    const currentTaskElInfoTitleValue = currentTaskElInfoTitleEl.textContent;
    const currentTaskElInfoDescriptionValue =
      currentTaskElInfoDescriptionEl.textContent;
    const currentTaskElInfoPriorityType = currentTaskEl.getAttribute(
      'data-priority'
    );
    const currentTaskElInfoPriorityValue = this.#priorityTypes[
      currentTaskElInfoPriorityType
    ];

    formElementInputTitle.value = currentTaskElInfoTitleValue;
    formElementInputDescription.value = currentTaskElInfoDescriptionValue;
    formElementInputPriority.value = currentTaskElInfoPriorityValue;
    modalElement.classList.remove('modal-task--hidden');

    const handleSubmitEdit = async (eventSubmit) => {
      eventSubmit.preventDefault();

      const formData = generateFormData(formElement);
      const { token } = handleDataInLocalStorage.getData();

      const data = await handleApiData(
        `/user/todos/${this.id}`,
        'PATCH',
        formData,
        {
          Authorization: token,
        }
      );

      if (data.error === true && data.auth === false) {
        handleErrorMessageView(data);
        handleLocationURL('/form/login', 2000);
        return;
      }

      if (data.error === false) {
        const taskList = document.querySelector('.js-task-list');
        const currentPriority = taskList.getAttribute('data-current-priority');

        const {
          updated_todo: {
            title: titleUpdated,
            description: descriptionUpdated,
            priority: priorityUpdated,
          },
        } = data;

        modalElement.classList.add('modal-task--hidden');
        formElement.reset();

        if (currentPriority !== priorityUpdated && currentPriority !== '') {
          currentTaskEl.remove();
          return;
        }

        const currentTaskHeaderPriorityTypeEl =
          currentTaskEl.firstElementChild.firstElementChild.lastElementChild;

        currentTaskEl.setAttribute(
          'data-priority',
          this.#priorityValues[priorityUpdated].type
        );
        currentTaskHeaderPriorityTypeEl.textContent = this.#priorityValues[
          priorityUpdated
        ].text;
        currentTaskElInfoTitleEl.textContent = titleUpdated;
        currentTaskElInfoDescriptionEl.textContent = descriptionUpdated;
        return;
      }

      return handleErrorMessageView(data);
    };

    formElement.addEventListener('submit', handleSubmitEdit, { once: true });

    formElement.addEventListener(
      'reset',
      () => modalElement.classList.add('modal-task--hidden'),
      { once: true }
    );
  }

  async #deleteTask(eventClick) {
    const { token } = handleDataInLocalStorage.getData();

    const data = await handleApiData(
      `/user/todos/${this.id}`,
      'DELETE',
      {},
      { Authorization: token }
    );

    if (data.error === true && data.auth === false) {
      handleErrorMessageView(data);
      handleLocationURL('/form/login', 2000);
      return;
    }

    if (data.error === false) {
      const currentTaskEl = eventClick.target.parentNode.parentNode;
      currentTaskEl.remove();
      return;
    }

    handleErrorMessageView(data);
    return;
  }

  createTaskElement() {
    // Task Item Element
    const taskItem = document.createElement('li');
    taskItem.setAttribute('class', 'task-area__task-list__task-item');
    taskItem.setAttribute('data-id', this.id);
    taskItem.setAttribute(
      'data-priority',
      this.#priorityValues[this.priority].type
    );
    taskItem.setAttribute('data-finished', this.finished);

    // Task Item Header Element
    const taskItem__header = document.createElement('header');
    taskItem__header.setAttribute(
      'class',
      'task-area__task-list__task-item__header'
    );

    const taskItem__header__priority = document.createElement('span');
    taskItem__header__priority.setAttribute(
      'class',
      'task-list__task-item__header__priority'
    );
    taskItem__header__priority.textContent = 'Prioridade: ';

    const taskItem__header__priority__type = document.createElement('strong');
    taskItem__header__priority__type.setAttribute(
      'class',
      'task-list__task-item__header__priority__type'
    );
    taskItem__header__priority__type.textContent = this.#priorityValues[
      this.priority
    ].text;

    taskItem__header__priority.append(taskItem__header__priority__type);

    const taskItem__header__status = document.createElement('strong');
    taskItem__header__status.setAttribute(
      'class',
      'task-list__task-item__header__status'
    );
    taskItem__header__status.textContent = this.#finishedValues[this.finished];

    taskItem__header.append(taskItem__header__priority);
    taskItem__header.append(taskItem__header__status);

    // Task Item Article Element
    const taskItem__content = document.createElement('article');
    taskItem__content.setAttribute(
      'class',
      'task-area__task-list__task-item__content'
    );

    const taskItem__content__title = document.createElement('h4');
    taskItem__content__title.setAttribute(
      'class',
      'task-list__task-item__title'
    );
    taskItem__content__title.textContent = this.title;

    const taskItem__content__description = document.createElement('p');
    taskItem__content__description.setAttribute(
      'class',
      'task-list__task-item__description'
    );
    taskItem__content__description.textContent = this.description;

    taskItem__content.append(taskItem__content__title);
    taskItem__content.append(taskItem__content__description);

    // Task Item Buttons Element
    const taskItem__btns = document.createElement('div');
    taskItem__btns.setAttribute(
      'class',
      'task-area__task-list__task-item__task-btns'
    );

    /// Task Item Button Finish Element
    const taskItem__btns__btnFinish = document.createElement('button');
    taskItem__btns__btnFinish.setAttribute(
      'class',
      `task-list__task-item__task-btns__btn task-list__task-item__task-btns__btn--finish`
    );
    taskItem__btns__btnFinish.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-check"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;

    taskItem__btns__btnFinish.addEventListener('click', (event) =>
      this.#finishTask(event)
    );

    /// Task Item Button Edit Element
    const taskItem__btns__btnEdit = document.createElement('button');
    taskItem__btns__btnEdit.setAttribute(
      'class',
      `task-list__task-item__task-btns__btn task-list__task-item__task-btns__btn--edit`
    );
    taskItem__btns__btnEdit.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-edit-3"
    >
      <path d="M12 20h9"></path>
      <path
        d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
      ></path>
    </svg>
  `;

    taskItem__btns__btnEdit.addEventListener('click', (event) => {
      this.#editTask(event);
    });

    /// Task Item Button Delete Element
    const taskItem__btns__btnDelete = document.createElement('button');
    taskItem__btns__btnDelete.setAttribute(
      'class',
      `task-list__task-item__task-btns__btn task-list__task-item__task-btns__btn--delete`
    );
    taskItem__btns__btnDelete.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-trash"
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path
        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      ></path>
    </svg>
  `;

    taskItem__btns__btnDelete.addEventListener('click', (event) => {
      this.#deleteTask(event);
    });

    taskItem__btns.append(taskItem__btns__btnFinish);
    taskItem__btns.append(taskItem__btns__btnEdit);
    taskItem__btns.append(taskItem__btns__btnDelete);

    //
    taskItem.append(taskItem__header);
    taskItem.append(taskItem__content);
    taskItem.append(taskItem__btns);

    return taskItem;
  }
}
