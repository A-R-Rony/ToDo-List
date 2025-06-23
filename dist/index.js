"use strict";
const inputEle = document.getElementById('taskip');
const addBtnEle = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const tasks = [];
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    const parsedTasks = JSON.parse(savedTasks);
    tasks.push(...parsedTasks);
    randerTasks();
}
function randerTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        taskSpan.className = "task-text";
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "❌";
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            const confirmDlt = confirm("Are sure you want to delete this task?");
            if (confirmDlt) {
                tasks.splice(index, 1);
                randerTasks();
            }
        });
        if (task.completed) {
            taskSpan.classList.add("completed");
        }
        taskSpan.addEventListener('dblclick', () => {
            task.completed = !task.completed;
            console.log("Double clicked!");
            randerTasks();
        });
        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}
function addTask() {
    const taskText = inputEle.value.trim();
    if (taskText) {
        console.log("Task to add : ", taskText);
        inputEle.value = "";
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        console.log(newTask);
        const msg = document.getElementById('message');
        msg.textContent = "Task is added successfully";
        setTimeout(() => {
            msg.textContent = "";
        }, 1000);
        randerTasks();
    }
    else {
        alert("Enter a task");
    }
}
console.log(tasks);
addBtnEle.addEventListener('click', addTask);
inputEle.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
console.log(addBtnEle);
//# sourceMappingURL=index.js.map