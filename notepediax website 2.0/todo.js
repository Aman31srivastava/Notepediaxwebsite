document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const remainingCount = document.getElementById('remainingCount');
    const clearCompletedBtn = document.getElementById('clearCompleted');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Render todos
    function renderTodos() {
        const filter = document.querySelector('.filter-btn.active').dataset.filter;
        
        todoList.innerHTML = '';
        
        const filteredTodos = todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            todoItem.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            `;
            
            const checkbox = todoItem.querySelector('.todo-checkbox');
            const deleteBtn = todoItem.querySelector('.delete-btn');
            const todoText = todoItem.querySelector('.todo-text');
            
            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
                todoItem.classList.toggle('completed', todo.completed);
                updateStats();
                saveTodos();
                
                // Auto-remove completed tasks after 1 second
                if (todo.completed) {
                    setTimeout(() => {
                        if (todo.completed) {
                            todos = todos.filter(t => t !== todo);
                            saveTodos();
                            renderTodos();
                        }
                    }, 1000);
                }
            });
            
            deleteBtn.addEventListener('click', () => {
                todos = todos.filter(t => t !== todo);
                saveTodos();
                renderTodos();
            });
            
            todoText.addEventListener('dblclick', () => {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = todo.text;
                editInput.className = 'edit-input';
                
                todoItem.replaceChild(editInput, todoText);
                editInput.focus();
                
                const handleEdit = () => {
                    const newText = editInput.value.trim();
                    if (newText) {
                        todo.text = newText;
                        saveTodos();
                        renderTodos();
                    }
                };
                
                editInput.addEventListener('blur', handleEdit);
                editInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') handleEdit();
                });
            });
            
            todoList.appendChild(todoItem);
        });
        
        updateStats();
    }

    // Update remaining count
    function updateStats() {
        const activeCount = todos.filter(todo => !todo.completed).length;
        remainingCount.textContent = activeCount;
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add new todo
    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    // Filter todos
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTodos();
        });
    });

    // Clear completed
    clearCompletedBtn.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
    });

    // Initial render
    renderTodos();
});
