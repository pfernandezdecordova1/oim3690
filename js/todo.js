// Load items from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submission
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const urgency = event.submitter.value;
    const isUrgent = urgency === 'urgent';
    addTask(isUrgent);
});

        function addTask(isUrgent) {
            const input = document.getElementById('taskInput');
            const taskText = input.value.trim();

            if (taskText === '') {
                alert('Please enter an ingredient!');
                return;
            }

            const tasks = getTasks();
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false,
                urgent: isUrgent
            };

            tasks.push(newTask);
            saveTasks(tasks);
            input.value = '';
            renderTasks();
            input.focus();
        }

        function deleteTask(id) {
            const tasks = getTasks();
            const updatedTasks = tasks.filter(task => task.id !== id);
            saveTasks(updatedTasks);
            renderTasks();
        }

        function toggleComplete(id) {
            const tasks = getTasks();
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                saveTasks(tasks);
                renderTasks();
            }
        }

        function renderTasks() {
            const tasks = getTasks();
            const urgentTasks = tasks.filter(t => t.urgent);
            const regularTasks = tasks.filter(t => !t.urgent);

            // Render urgent items as cards
            renderUrgentCards(urgentTasks);

            // Render regular items as list
            renderRegularList(regularTasks);
        }

        function renderUrgentCards(urgentTasks) {
            const urgentList = document.getElementById('urgentList');
            const urgentSection = document.getElementById('urgentSection');

            urgentList.innerHTML = '';

            if (urgentTasks.length === 0) {
                urgentSection.style.display = 'none';
                return;
            }

            urgentSection.style.display = 'block';

            urgentTasks.forEach(task => {
                const card = document.createElement('div');
                card.className = task.completed ? 'urgent-card completed' : 'urgent-card';

                card.innerHTML = `
                    <span class="task-text" onclick="toggleComplete(${task.id})">${escapeHtml(task.text)}</span>
                    <div class="task-buttons">
                        <button class="complete-btn" onclick="toggleComplete(${task.id})">
                            ${task.completed ? 'Undo' : 'Done'}
                        </button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;

                urgentList.appendChild(card);
            });
        }

        function renderRegularList(regularTasks) {
            const taskList = document.getElementById('taskList');
            const emptyMessage = document.getElementById('emptyMessage');

            taskList.innerHTML = '';

            if (regularTasks.length === 0) {
                emptyMessage.style.display = 'block';
                return;
            }

            emptyMessage.style.display = 'none';

            regularTasks.forEach(task => {
                const li = document.createElement('li');
                li.className = task.completed ? 'completed' : '';

                li.innerHTML = `
                    <span class="task-text" onclick="toggleComplete(${task.id})">${escapeHtml(task.text)}</span>
                    <div class="task-buttons">
                        <button class="complete-btn" onclick="toggleComplete(${task.id})">
                            ${task.completed ? 'Undo' : 'Done'}
                        </button>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;

                taskList.appendChild(li);
            });
        }

        function getTasks() {
            const tasks = localStorage.getItem('tasks');
            return tasks ? JSON.parse(tasks) : [];
        }

        function saveTasks(tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function loadTasks() {
            renderTasks();
        }

        function escapeHtml(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, m => map[m]);
        }