const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!text) return;

  const task = {
    text,
    priority,
    done: false
  };

  createTask(task);
  saveTask(task);

  taskInput.value = "";
}

function createTask(task) {
  const li = document.createElement("li");
  li.classList.add(task.priority);
  if (task.done) li.classList.add("done");

  const span = document.createElement("span");
  span.textContent = task.text;

  span.addEventListener("click", () => {
    li.classList.toggle("done");
    updateStorage();
  });

  const actions = document.createElement("div");
  actions.className = "task-actions";

  // Change priority
  const priorityBtn = document.createElement("button");
  priorityBtn.innerHTML = "🔄";
  priorityBtn.title = "Change Priority";
  priorityBtn.onclick = () => {
    changePriority(li);
    updateStorage();
  };

  // Delete
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  actions.append(priorityBtn, deleteBtn);
  li.append(span, actions);
  taskList.appendChild(li);
}

function changePriority(li) {
  const priorities = ["high", "medium", "low"];
  let current = priorities.find(p => li.classList.contains(p));
  let next = priorities[(priorities.indexOf(current) + 1) % priorities.length];

  li.classList.remove("high", "medium", "low");
  li.classList.add(next);
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  getTasks().forEach(task => createTask(task));
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").textContent,
      priority: ["high","medium","low"].find(p => li.classList.contains(p)),
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
}
