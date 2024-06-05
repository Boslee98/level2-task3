let tasks = [];

document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let taskInput = document.getElementById('task-input');
    let task = {
        description: taskInput.value,
        completed: false,
        dateAdded: new Date()
    };
    tasks.push(task);
    taskInput.value = '';
    updateTaskLists();
});

function updateTaskLists() {
    let pendingTasks = document.getElementById('pending-tasks');
    let completedTasks = document.getElementById('completed-tasks');
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    for (let task of tasks) {
        let listItem = document.createElement('li');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = function() {
            task.completed =!task.completed;
            updateTaskLists();
        };
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            tasks = tasks.filter((t) => t!== task);
            updateTaskLists();
        };
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            let editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task.description;
            listItem.innerHTML = '';
            listItem.appendChild(editInput);
            let saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.onclick = function() {
                task.description = editInput.value;
                updateTaskLists();
            };
            listItem.appendChild(saveButton);
        };
        listItem.textContent = task.description + '' + task.dateAdded.toLocaleString() + ')';
        listItem.appendChild(checkbox);
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        if (task.completed) {
            completedTasks.appendChild(listItem);
        } else {
            pendingTasks.appendChild(listItem);
        }
    }
}