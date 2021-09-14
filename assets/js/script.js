//El suffix indicates variables that hold DOM elements
var formEl = document.querySelector("#task-form");
var tasksToDoEL = document.querySelector("#tasks-to-do");

//Callback function *notice the lack of parentheses for createTaskHandler*
formEl.addEventListener("submit", crateTaskHandler);

function crateTaskHandler(event) {
    event.preventDefault();
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "New Task";
    tasksToDoEL.appendChild(listItemEl);
}