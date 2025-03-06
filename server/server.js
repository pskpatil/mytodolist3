const express = require('express');
const cors = require('cors');
const app = express();
const port = 6001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage
let todos = [];
let nextId = 1;

// Get all todos with pagination and filtering
app.get('/api/todos', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const filter = req.query.filter || 'all'; // all, active, completed
    const search = req.query.search || '';

    let filteredTodos = [...todos];

    // Apply search filter
    if (search) {
        filteredTodos = filteredTodos.filter(todo => 
            todo.text.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Apply status filter
    if (filter === 'active') {
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalTodos = filteredTodos.length;
    const totalPages = Math.ceil(totalTodos / limit);

    // Get todos for current page
    const paginatedTodos = filteredTodos.slice(startIndex, endIndex);

    res.json({
        todos: paginatedTodos,
        pagination: {
            currentPage: page,
            totalPages,
            totalTodos,
            hasNextPage: endIndex < totalTodos,
            hasPrevPage: startIndex > 0
        }
    });
});

// Create a new todo
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Todo text is required' });
    }
    
    const newTodo = {
        id: nextId++,
        text: text.trim(),
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Toggle todo completion status
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos[todoIndex].completed = !todos[todoIndex].completed;
    res.json(todos[todoIndex]);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('Attempting to delete todo with ID:', id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    console.log('Found todo at index:', todoIndex);
    if (todoIndex === -1) {
        console.log('Todo not found');
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    console.log('Deleted todo:', deletedTodo);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Todo app server running at http://127.0.0.1:${port}`);
});