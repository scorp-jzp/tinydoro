// Pomodoro Timer Functionality
let timer;
let isRunning = false;

document.getElementById('startTimer').addEventListener('click', function() {
    const timeInput = document.getElementById('timeInput').value;
    const selectedImage = document.getElementById('imageSelect').value;
    const sessionList = document.getElementById('sessionList');

    if (timeInput && !isRunning) {
        let time = timeInput * 60; // Convert to seconds
        isRunning = true;

        timer = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            document.getElementById('timerDisplay').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            time--;

            if (time < 0) {
                clearInterval(timer);
                isRunning = false;
                const img = document.createElement('img');
                img.src = `images/${selectedImage}`;
                img.alt = "Pomodoro Session Image";
                sessionList.appendChild(img);
                sessionList.appendChild(document.createTextNode(` - ${timeInput} minutes`));
                document.getElementById('timerDisplay').innerText = "00:00";
            }
        }, 1000);
    }
});

// To-Do List Functionality
document.getElementById('addTask').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput').value;
    const taskList = document.getElementById('taskList');

    if (taskInput) {
        const li = document.createElement('li');
        li.textContent = taskInput;

        // Create Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            const newTask = prompt("Edit your task:", taskInput);
            if (newTask) {
                li.firstChild.textContent = newTask;
            }
        });

        // Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
        });

        // Create Done Button
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.addEventListener('click', function() {
            li.style.textDecoration = 'line-through';
        });

        li.appendChild(doneButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        document.getElementById('taskInput').value = ''; // Clear input
    }
});