//Define UI variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  //Creating new link element
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = null;

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    console.log(e.target);
  }
  console.log(e.target);
}

function clearTasks() {
  //   taskList.innerHTML = "";

  //Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll("li.collection-item").forEach(function (task) {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  console.log(text);
}

function getTasks() {
  let tasks;
  console.log(task);
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    addTask();
  });
}

function loadEventListeners() {
  //Add task event
  form.addEventListener("submit", addTask);

  //Remove Taks event
  taskList.addEventListener("click", removeTask);

  //clear task event
  clearBtn.addEventListener("click", clearTasks);

  //filter tasks event
  filter.addEventListener("keyup", filterTasks);

  //DOM Load event
  document.addEventListener("DOMContetLoaded", getTasks);
}

loadEventListeners();
