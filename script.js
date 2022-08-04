const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  //your code here

  if (inputAdd.value == "") {
    alert("Todo cannot be empty");
  } else {
    addTodo(inputAdd.value, false);
    saveTodo();
  }
  inputAdd.value = "";
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  //your code here

  //append todo to HTML...
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  deleteBtn.style.display = "none";
  doneBtn.style.display = "none";
  todoCtn.prepend(div);
  //define buttons event...
  div.onmouseout = () => {
    deleteBtn.style.display = "none";
    doneBtn.style.display = "none";
  };
  div.onmouseover = () => {
    deleteBtn.style.display = "";
    doneBtn.style.display = "";
  };
  deleteBtn.onclick = () => {
    div.remove();

    saveTodo();
  };

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through") {
      span.style.textDecoration = "none";
    } else {
      span.style.textDecoration = "line-through";
    }
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    //your code here
    const todoobj = {};
    todoobj.title = todoDiv.children[0].innerText;
    todoobj.completed = todoDiv.style.textDecoration === "line-through";
    data.push(todoobj);
  }
  //your code here
  const json = JSON.stringify(data);
  localStorage.setItem("todo-container", json);
}

function loadTodo() {
  //your code here
  const dataStr = localStorage.getItem("todo-container");
  const data = JSON.parse(dataStr); //array of objects

  for (const todoobj of data.reverse()) {
    addTodo(todoobj.title, todoobj.completed);
  }
}

loadTodo();
