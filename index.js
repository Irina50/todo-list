'use strict'
const input = document.querySelector('.form__input'),
      taskContainer = document.querySelector('.tasks__list'),
      form = document.querySelector('.form');
let arrOfTasks = [];

form.addEventListener('submit', renderNewTask);
window.addEventListener('unload', unloadHandler);
window.addEventListener('load', onloadHandler);
taskContainer.addEventListener('click', listClickHandler)


function listClickHandler({target}) {
  
  if(target.classList.contains('tasks__text')){
    const taskElement = target.closest('[data-task-id]');
    const taskId = +taskElement.dataset.taskId;
    switchCompleted(taskElement, taskId);  
  };
};
 

function switchCompleted(taskElement, taskId) {
  if(taskElement.dataset.completed === "true") {
    taskElement.classList.remove('_active');
    taskElement.dataset.completed = false;
  }
  else {
     taskElement.classList.add('_active');
     taskElement.dataset.completed = true;
  }
   arrOfTasks.forEach(task => {
    if (task._id === taskId) {
      task.completed = !task.completed
    };
  });
};

function onloadHandler() {
  init();
};

/*
@description:  take datas from localsorage and call renderTasks

*/
function init() {
  const arrOftasksFromStorage =  JSON.parse(localStorage.getItem('tasks'));
  renderTasks(arrOftasksFromStorage);
};
/*
@description:  render list of tasks 
@params: {array} tasks
*/
function renderTasks(tasks = []) {
 taskContainer.insertAdjacentHTML('beforeend', createTasksFragment(tasks));
 arrOfTasks.push(...tasks);
};

/*
@description:  made full fragment from arrayOfTasks
@params: {array} tasks
@return: acc

*/

function createTasksFragment(tasks) {
  return tasks.reduce((acc, task) => {
    acc += createTaskElement(task);
    return acc
  }, '')
}
/*
@description:  render new task and push it in arrayOfTasks
*/

function renderNewTask (e) {
 e.preventDefault();
  let value = input.value;
  if(value.trim().length < 5 ) {
    return
  }
  const taskObject = createTaskObject(value);
  arrOfTasks.push(taskObject);
  const taskElement =  createTaskElement(taskObject);
  taskContainer.insertAdjacentHTML('beforeend',taskElement)
  this.reset();
 
}
/*
@description:  create task with id
@params: _id, content, completed
*/
function createTaskElement({_id, content, completed}) {
  return `
  <li class="${completed ? 'tasks__item _active' : 'tasks__item'}"
    data-task-id=${_id} 
    data-completed=${completed}
    
    >
    <p class="tasks__text">${content}</p>
  </li>
  `
}


function createTaskObject(content) {
  return {
    _id: Math.random(),
    content,
    completed: false
  }
}
function unloadHandler() {
  addToLocalStorage();
}


/*
@description:  put arrOfTasks to LocalStorage
*/
function addToLocalStorage() {
  console.log(arrOfTasks);
  localStorage.setItem('tasks', JSON.stringify(arrOfTasks))
}


