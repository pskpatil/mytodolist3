const API_URL = 'http://127.0.0.1:6001/api';
const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const errorMessage = document.getElementById('errorMessage');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// State management
let currentPage = 1;
let totalPages = 1;
let searchTimeout;

// Fetch and render all todos
async function loadTodos() {
    try {
        const searchQuery = searchInput.value.trim();
        const filterValue = statusFilter.value;
        const url = `${API_URL}/todos?page=${currentPage}&limit=5&filter=${filterValue}&search=${searchQuery}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        renderTodos(data.todos);
        updatePagination(data.pagination);
    } catch (error) {
        showError('Failed to load todos');
    }
}

// Update pagination controls
function updatePagination(pagination) {
    totalPages = pagination.totalPages;
    pageInfo.textContent = `Page ${pagination.currentPage} of ${pagination.totalPages}`;
    prevPageBtn.disabled = !pagination.hasPrevPage;
    nextPageBtn.disabled = !pagination.hasNextPage;
}

// Create a new todo
async function addTodo(text) {
    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to add todo');
        }
        
        todoInput.value = '';
        loadTodos(); // Reload todos after adding
    } catch (error) {
        showError('Failed to add todo');
    }
}

// Toggle todo completion status
async function toggleTodo(id) {
    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT'
        });
        
        if (!response.ok) {
            throw new Error('Failed to update todo');
        }
        
        await loadTodos();
    } catch (error) {
        showError('Failed to update todo');
    }
}

// Delete a todo
async function deleteTodo(id) {
    try {
        console.log('Attempting to delete todo with ID:', id);
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Delete failed:', errorData);
            throw new Error(errorData.error || 'Failed to delete todo');
        }
        
        console.log('Todo deleted successfully');
        await loadTodos();
    } catch (error) {
        console.error('Delete error:', error);
        showError('Failed to delete todo');
    }
}

// Render todos
function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(renderTodo);
}

// Render a single todo
function renderTodo(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;
    
    li.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="todo-text">${todo.text}</span>
        <button class="delete-btn">×</button>
    `;
    
    const checkbox = li.querySelector('input');
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    todoList.appendChild(li);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    setTimeout(() => {
        errorMessage.textContent = '';
    }, 3000);
}

// Event listeners
addTodoButton.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text) {
        addTodo(text);
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
        }
    }
});

// Pagination event listeners
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadTodos();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadTodos();
    }
});

// Filter and search event listeners
statusFilter.addEventListener('change', () => {
    currentPage = 1; // Reset to first page when filter changes
    loadTodos();
});

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentPage = 1; // Reset to first page when search changes
        loadTodos();
    }, 300);
});

// Load todos on page load
loadTodos();