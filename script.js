    const tasks = document.getElementById("tasks");

    let inc = 0;
    let complete = 0;
    function addTask(){
        const taskInput = document.getElementById("taskInput");
        const todo = document.getElementById("todo");
        const dueDateInput = document.getElementById("dueDate");
        const taskComplete = document.getElementById("taskComplete");
        const taskStarted = document.getElementById("taskStarted");
        const taskValue = taskInput.value;
        const dueDate = dueDateInput.value;
        
        if (taskValue.trim() !== "") {
            const task = document.createElement("div");
            task.className="task";
            task.innerHTML = `
                <input type="checkbox">
                <p>${taskValue}</p>
                <p><strong>Due Date:</strong> ${dueDate}</p>
                <i class="fas fa-trash-alt" onclick="removeTask(this)"></i>
            `;
            tasks.appendChild(task);
            inc++;
            todo.innerText=inc;
            taskStarted.innerText = inc;
            taskInput.value = "";
        }
    }

    function removeTask(element) {
        tasks.removeChild(element.parentNode);
        inc--;
        todo.innerText = inc;
        taskStarted.innerText = inc;
        complete++;
        taskComplete.innerText = complete;
    }
    document.addEventListener("DOMContentLoaded", function () {
    });