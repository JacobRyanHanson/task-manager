//El suffix indicates variables that hold DOM elements
var buttonEl = document.querySelector("#save-task");
var tasksToDoEL = document.querySelector("#tasks-to-do");

//callback function *notice the lack of parentheses for createTaskHandler*
buttonEl.addEventListener("click", crateTaskHandler);

function crateTaskHandler() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "New Task";
    tasksToDoEL.appendChild(listItemEl);
}


