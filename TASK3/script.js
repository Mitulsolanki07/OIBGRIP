const text = document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

//array of todo task
let todoArray = [];

//adding item to the todo list

addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  //read the data from localstorage
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  //adding task into the todo array
  todoArray.push(text.value);
  text.value = "";
  //save the data to local system
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});

//display the todo list

function displayTodo() {
  let todo = localStorage.getItem("todo");
  if (todo === null) {
    todoArray = [];
  } else {
    todoArray = JSON.parse(todo);
  }
  let htmlCode = "";
  todoArray.forEach((list, ind) => {
    htmlCode += `<div class='flex mb-4 items-center'>
      <p class='w-full text-grey-darkest'>${list}</p>
      <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
      <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
      <i class="fas fa-check-square limegreen" id="checked"></i>
   </div>`;
  });
  listBox.innerHTML = htmlCode;
}
const itemCheck = document.getElementById("checked");

//delete the item from todo list
//splice is used to add or remove the array element or overwrite the array element based  on index parameter
//if negative index it removes from end of the array
function deleteTodo(ind) {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  todoArray.splice(ind, 1);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
}
//updating item from  todo list

function edit(ind) {
  saveInd.value = ind;
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  text.value = todoArray[ind];
  addTaskButton.style.display = "none";
  saveTaskButton.style.display = "block";
}

//save task button
//json.parse  converts  the  json string into json  objects   whereas json.stringify  convert the json object into json string
saveTaskButton.addEventListener("click", () => {
  let todo = localStorage.getItem("todo");
  todoArray = JSON.parse(todo);
  let id = saveInd.value;
  todoArray[id] = text.value;
  addTaskButton.style.display = "block";
  saveTaskButton.style.display = "none";
  text.value = "";
  localStorage.setItem("todo", JSON.stringify(todoArray));
  displayTodo();
});
//checked and unchecked
itemCheck.addEventListener("click", () => {
  if (itemCheck.style.color == "limegreen") {
    itemCheck.style.color = "black";
  } else {
    itemCheck.style.color = "limegreen";
  }
});
