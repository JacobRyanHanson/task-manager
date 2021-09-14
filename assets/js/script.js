//El suffix indicates variables that hold DOM elements.
var formEl = document.querySelector("#task-form");
var tasksToDoEL = document.querySelector("#tasks-to-do");

//createTaskHandler is a callback function (function passed as an argument).
formEl.addEventListener("submit", taskFormHandler);

function taskFormHandler(event) {
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form.");
        return false;
    }
    event.preventDefault();

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }

    createTaskEl(taskDataObj);
    formEl.reset();
}

function createTaskEl(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    tasksToDoEL.appendChild(listItemEl);
}