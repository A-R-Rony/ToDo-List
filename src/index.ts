
const inputEle = document.getElementById('taskip') as HTMLInputElement;
const addBtnEle = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

interface Task {
  text: string,
  completed: boolean
}
const tasks: Task[] = [];

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  const parsedTasks = JSON.parse(savedTasks) as Task[];
  tasks.push(...parsedTasks);
  randerTasks();
}

function randerTasks() {
  // clear existing ul
  taskList.innerHTML = "";

  // re-add all the ul
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');

    // Create span for task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.className = "task-text";

    // create and adding delete button in listItem
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


    // if completed then 
    if (task.completed) {
      taskSpan.classList.add("completed"); // <li class = "completed"> </li>
    }

    // toggle after double clicking
    taskSpan.addEventListener('dblclick', () => {
      task.completed = !task.completed;
      console.log("Double clicked!");
      randerTasks();
    });
    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteBtn);
    taskList.appendChild(listItem);
    // local storage adding
    localStorage.setItem("tasks", JSON.stringify(tasks));

  });

}
function addTask() {
  const taskText = inputEle.value.trim();
  if (taskText) {
    console.log("Task to add : ", taskText);
    inputEle.value = "";

    const newTask: Task = {
      text: taskText,
      completed: false
    }
    tasks.push(newTask);
    console.log(newTask);

    const msg = document.getElementById('message') as HTMLParagraphElement;
    msg.textContent = "Task is added successfully";

    setTimeout(() => {
      msg.textContent = "";
    }, 1000);


    randerTasks();
  } else {
    alert("Enter a task");
  }
}

console.log(tasks);


// if + btn clicke
addBtnEle.addEventListener('click', addTask);
// if Press enter
inputEle.addEventListener('keypress', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addTask();
  }
});


console.log(addBtnEle);