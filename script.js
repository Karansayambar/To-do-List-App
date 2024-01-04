const tasks = document.getElementById("tasks");
const todoCount = document.getElementById("todo");
const inProgressCount = document.getElementById("taskStarted");
const doneCount = document.getElementById("taskComplete");
const highPriorityCount = document.getElementById("high");
const mediumPriorityCount = document.getElementById("medium");
const lowPriorityCount = document.getElementById("low");

let inc = 0;
let highPriority = 0;
let mediumPriority = 0;
let lowPriority = 0;
let todo = 0;
let inProgress = 0;
let done = 0;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDate");
    const prioritySelect = document.getElementById("priority");
    const statusSelect = document.getElementById("status");

    const taskValue = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;
    const status = statusSelect.value;

    if (taskValue.trim() !== "") {
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `
    <input type="checkbox">
    <p>${taskValue}</p>
    <p><strong>Due Date:</strong> ${dueDate}</p>
    <p><strong>Priority:</strong> ${priority}</p>
    <p><strong>Status:</strong> ${status}</p>
    <button onclick="editTask(this)"><i class="fas fa-pen-to-square"></i></button>
    <button onclick="removeTask(this)"><i class="fas fa-trash"></i></button>
`;
        tasks.appendChild(task);
        inc++;

        updatePriorityCounts(priority);
        updateStatusCounts(status);

        updateCounts();
        taskInput.value = "";
    }
}

function removeTask(element) {
    const taskElement = element.parentNode;
    const priority = taskElement.querySelector('p:nth-child(3)').innerText.trim().toLowerCase();
    const status = taskElement.querySelector('p:nth-child(4)').innerText.trim().toLowerCase();

    tasks.removeChild(taskElement);
    inc--;

    updatePriorityCountsOnRemove(priority);
    updateStatusCountsOnRemove(status);

    updateCounts();
}

function editTask(button) {
    const taskElement = button.parentNode;
    const taskName = taskElement.querySelector('p');
    const priority = taskElement.querySelector('p:nth-child(3)').innerText.trim().toLowerCase();
    const status = taskElement.querySelector('p:nth-child(4)').innerText.trim().toLowerCase();
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskName.innerText;
    taskElement.replaceChild(editInput, taskName);

    const prioritySelect = document.createElement('select');
    prioritySelect.innerHTML = `
        <option value="high" ${priority === 'high' ? 'selected' : ''}>High</option>
        <option value="medium" ${priority === 'medium' ? 'selected' : ''}>Medium</option>
        <option value="low" ${priority === 'low' ? 'selected' : ''}>Low</option>
    `;

    const statusSelect = document.createElement('select');
    statusSelect.innerHTML = `
        <option value="todo" ${status === 'todo' ? 'selected' : ''}>To-do</option>
        <option value="inprogress" ${status === 'inprogress' ? 'selected' : ''}>In Progress</option>
        <option value="done" ${status === 'done' ? 'selected' : ''}>Done</option>
    `;

    taskElement.replaceChild(prioritySelect, taskElement.querySelector('p:nth-child(3)'));
    taskElement.replaceChild(statusSelect, taskElement.querySelector('p:nth-child(4)'));

    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fas fa-floppy-disk"></i>';
    saveButton.onclick = function () {
        taskName.innerText = editInput.value;
        const newPriority = prioritySelect.value;
        const newStatus = statusSelect.value;
        taskElement.replaceChild(taskName, editInput);
        taskElement.replaceChild(document.createTextNode(`Priority: ${newPriority}`), prioritySelect);
        taskElement.replaceChild(document.createTextNode(`Status: ${newStatus}`), statusSelect);

        updatePriorityCountsOnEdit(priority, newPriority);
        updateStatusCountsOnEdit(status, newStatus);

        updateCounts();
    };

    taskElement.appendChild(saveButton);
}

function updatePriorityCounts(priority) {
    if (priority === "high") {
        highPriority++;
    } else if (priority === "medium") {
        mediumPriority++;
    } else {
        lowPriority++;
    }
}

function updatePriorityCountsOnRemove(priority) {
    if (priority === "high") {
        highPriority--;
    } else if (priority === "medium") {
        mediumPriority--;
    } else {
        lowPriority--;
    }
}

function updatePriorityCountsOnEdit(oldPriority, newPriority) {
    if (oldPriority !== newPriority) {
        if (oldPriority === "high") {
            highPriority--;
        } else if (oldPriority === "medium") {
            mediumPriority--;
        } else {
            lowPriority--;
        }

        updatePriorityCounts(newPriority);
    }
}

function updateStatusCounts(status) {
    if (status === "todo") {
        todo++;
    } else if (status === "inprogress") {
        inProgress++;
    } else {
        done++;
    }
}

function updateStatusCountsOnRemove(status) {
    if (status === "todo") {
        todo--;
    } else if (status === "inprogress") {
        inProgress--;
    } else {
        done--;
    }
}

function updateStatusCountsOnEdit(oldStatus, newStatus) {
    if (oldStatus !== newStatus) {
        if (oldStatus === "todo") {
            todo--;
        } else if (oldStatus === "inprogress") {
            inProgress--;
        } else {
            done--;
        }

        updateStatusCounts(newStatus);
    }
}

function updateCounts() {
    todoCount.innerText = todo;
    inProgressCount.innerText = inProgress;
    doneCount.innerText = done;
    highPriorityCount.innerText = `High Priority: ${highPriority}`;
    mediumPriorityCount.innerText = `Medium Priority: ${mediumPriority}`;
    lowPriorityCount.innerText = `Low Priority: ${lowPriority}`;
}
