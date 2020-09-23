export default ({ id, title, description, priority, finished }) => {
  const priorityValues = {
    '1': {
      type: 'low',
      text: 'baixa'
    },
    '2': {
      type: 'medium',
      text: 'média'
    },
    '3': {
      type: 'high',
      text: 'alta'
    }
  }

  const finishedValues = {
    'true': {
      text: 'Finalizado'
    },
    'false': {
      text: 'Pendente'
    }
  }

  function finishTask(taskId) {
    console.log(`Finish task: ${taskId}`);
  }

  function editTask(taskId) {
    console.log(`Edit task: ${taskId}`);
  }

  function deleteTask(taskId) {
    console.log(`Delete task: ${taskId}`);
  }

  // Task Item Element
  const taskItem = document.createElement('li');
  taskItem.setAttribute('class', 'task-area__task-list__task-item');
  taskItem.setAttribute('data-id', id);
  taskItem.setAttribute('data-priority', priorityValues[priority].type);
  taskItem.setAttribute('data-finished', finished);

  // Task Item Header Element
  const taskItem__header = document.createElement('header');
  taskItem__header.setAttribute('class', 'task-area__task-list__task-item__header');

  const taskItem__header__priority = document.createElement('span');
  taskItem__header__priority.setAttribute('class', 'task-list__task-item__header__priority');
  taskItem__header__priority.textContent = 'Prioridade: ';

  const taskItem__header__priority__type = document.createElement('strong');
  taskItem__header__priority__type.setAttribute('class', 'task-list__task-item__header__priority__type');
  taskItem__header__priority__type.textContent = priorityValues[priority].text;

  taskItem__header__priority.append(taskItem__header__priority__type);

  const taskItem__header__status = document.createElement('strong');
  taskItem__header__status.setAttribute('class', 'task-list__task-item__header__status');
  taskItem__header__status.textContent = finishedValues[finished].text;

  taskItem__header.append(taskItem__header__priority);
  taskItem__header.append(taskItem__header__status);

  // Task Item Article Element
  const taskItem__content = document.createElement('article');
  taskItem__content.setAttribute('class', 'task-area__task-list__task-item__content');

  const taskItem__content__title = document.createElement('h4');
  taskItem__content__title.setAttribute('class', 'task-list__task-item__title');
  taskItem__content__title.textContent = title;

  const taskItem__content__description = document.createElement('p');
  taskItem__content__description.setAttribute('class', 'task-list__task-item__description');
  taskItem__content__description.textContent = description;

  taskItem__content.append(taskItem__content__title);
  taskItem__content.append(taskItem__content__description);

  // Task Item Buttons Element
  const taskItem__btns = document.createElement('div');
  taskItem__btns.setAttribute('class', 'task-area__task-list__task-item__task-btns');

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

  taskItem__btns__btnFinish.addEventListener('click', (e) => finishTask(id));

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

  taskItem__btns__btnEdit.addEventListener('click', (e) => editTask(id));

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

  taskItem__btns__btnDelete.addEventListener('click', (e) => deleteTask(id));

  taskItem__btns.append(taskItem__btns__btnFinish);
  taskItem__btns.append(taskItem__btns__btnEdit);
  taskItem__btns.append(taskItem__btns__btnDelete);

  //
  taskItem.append(taskItem__header);
  taskItem.append(taskItem__content);
  taskItem.append(taskItem__btns);

  return taskItem;
}

/* Return example

<li
  class="task-area__task-list__task-item"
  data-id="id"
  data-priority="high|medium|low"
  data-finished="true|false"
>
  <header class="task-area__task-list__task-item__header">
    <span class="task-list__task-item__header__priority">
      Prioridade:
      <strong
        class="task-list__task-item__header__priority__type"
      >
        alta|média|baixa
      </strong>
    </span>

    <strong
      class="task-list__task-item__header__status"
    >
      Finalizado|Pendente
    </strong>
  </header>

  <article class="task-area__task-list__task-item__content">
    <h4 class="task-list__task-item__title">Título</h4>
    <p class="task-list__task-item__description">Descrição</p>
  </article>

  <div class="task-area__task-list__task-item__task-btns">
    <button
      class="task-list__task-item__task-btns__btn task-list__task-item__task-btns__btn--finish"
      onclick="() => {}"
    >
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
    </button>

    <button
      class="task-list__task-item__task-btns__btn task-list__task-item__task-btns__btn--edit"
    >
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
    </button>

    <button
      class="task-list__task-item__task-btns__btn task-list__task-item__task-btns__btn--delete"
    >
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
    </button>
  </div>
</li>
*/