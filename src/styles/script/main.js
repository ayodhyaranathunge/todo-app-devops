// Elements
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

// Update task counter
function updateCounter() {
  counter.textContent = list.children.length;
}

// Add a new task
function addTodo() {
  if (!input.value.trim()) return; // ignore empty tasks

  const li = document.createElement("li");
  li.textContent = input.value;

  // Click → mark completed
  li.addEventListener("click", () => li.classList.toggle("completed"));

  // Double click → delete
  li.addEventListener("dblclick", () => {
    li.remove();
    updateCounter();
  });

  list.appendChild(li);
  input.value = "";
  updateCounter();
}