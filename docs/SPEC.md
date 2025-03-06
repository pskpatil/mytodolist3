# Todo Application Specification

## Overview
A minimal todo list application built with vanilla JavaScript, HTML, CSS for frontend and Node.js for backend. The application uses in-memory storage and provides basic CRUD operations for managing todos.

## Technology Stack
- Frontend: HTML, CSS, JavaScript (no frameworks)
- Backend: Node.js
- Storage: In-memory (JavaScript array)

## File Structure
```
mytodolist3
├── public
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── server
│   └── server.js
├── SPEC.md
├── package.json
└── README.md
```

## API Endpoints

### GET /api/todos
- Description: Retrieve all todos
- Response: `[{ id: number, text: string, completed: boolean }]`

### POST /api/todos
- Description: Create a new todo
- Request body: `{ text: string }`
- Response: `{ id: number, text: string, completed: false }`

### PUT /api/todos/:id
- Description: Toggle todo completion status
- Response: `{ id: number, text: string, completed: boolean }`

### DELETE /api/todos/:id
- Description: Delete a todo
- Response: `{ success: true }`

## Data Structure
```javascript
{
  id: number,        // Unique identifier
  text: string,      // Todo content
  completed: boolean // Completion status
}
```

## UI Mockup
```
+----------------------------------+
|        My Todo List              |
+----------------------------------+
| [Input Field     ] [Add Todo]    |
+----------------------------------+
| [ ] Buy groceries                |
| [x] Walk the dog                 |
| [ ] Pay bills                    |
+----------------------------------+

Legend:
[ ] - Uncompleted todo
[x] - Completed todo
```

## Features
1. Display list of todos
2. Add new todo
3. Toggle todo completion
4. Delete todo
5. Simple and responsive design

## User Interface Interactions
1. Enter todo text and click "Add Todo" or press Enter to add new todo
2. Click on todo checkbox to toggle completion status
3. Click delete button (x) next to todo to remove it
4. Todos persist until server restart (in-memory storage)

## Error Handling
- Display user-friendly error messages for failed API requests
- Validate todo text (non-empty) before submission
- Handle server connection issues gracefully

## Future Enhancements (Not in Current Scope)
- Persistent storage
- User authentication
- Todo categories
- Due dates