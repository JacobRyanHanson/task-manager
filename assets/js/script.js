var taskIdCounter = 0;

// El suffix indicates variables that hold DOM elements.
var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form"); 
var tasksToDoEL = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// taskFormHandler is a callback function (function passed as an argument).
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);

function taskFormHandler(event) {
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form.");
        return false;
    }
    event.preventDefault();

    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        }
        createTaskEl(taskDataObj);
    }
    formEl.reset();
}

function createTaskEl(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name +
        "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);

    listItemEl.appendChild(taskActionsEl);
    tasksToDoEL.appendChild(listItemEl);

    taskIdCounter++;
}

function createTaskActions(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.value = statusChoices[i];

        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

function taskButtonHandler(event) {
    if (event.target.matches(".edit-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    } else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

function taskStatusChangeHandler(event) {
    debugger;
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    if (statusValue === "to do") {
        tasksToDoEL.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
}

function editTask(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name'").value = taskName;
    document.querySelector("select[name='task-type'").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}

function completeEditTask(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    document.querySelector("#save-task").textContent = "Add Task";
    formEl.removeAttribute("data-task-id");

    alert("Task Updated!");
}

function deleteTask(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}