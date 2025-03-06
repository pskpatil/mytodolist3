# Code Documentation

## Frontend Implementation

### Core Functions

#### State Management Functions
- `loadTodos`: Main function to fetch and display todos
  - Handles pagination, filtering, and search
  - Makes API request with current parameters
  - Updates UI with results

- `updatePagination`: Updates pagination controls
  - Updates page information display
  - Enables/disables navigation buttons
  - Updates total pages count

#### Todo Operations
- `addTodo`: Creates new todo items
  - Validates input
  - Makes POST request to API
  - Refreshes todo list on success

- `toggleTodo`: Toggles todo completion
  - Makes PUT request to API
  - Updates UI on successful toggle
  - Refreshes list to maintain consistency

- `deleteTodo`: Removes todo items
  - Makes DELETE request to API
  - Removes item from UI on success
  - Handles error states

#### UI Functions
- `renderTodos`: Renders the complete todo list
  - Clears existing list
  - Iterates through todos array
  - Calls renderTodo for each item

- `renderTodo`: Renders individual todo items
  - Creates list item element
  - Adds completion checkbox
  - Adds delete button
  - Sets up event listeners

- `showError`: Handles error display
  - Shows error message
  - Auto-hides after timeout
  - Provides user feedback

### Event Handlers
- Input handlers for todo creation
- Click handlers for pagination
- Change handlers for filtering
- Input handlers for search with debouncing

## Backend Implementation

### Express Route Handlers

#### GET /api/todos
```javascript
app.get('/api/todos', (req, res) => {
    // Query parameters handling
    // Search implementation
    // Filter implementation
    // Pagination logic
    // Response formatting
})
```

#### POST /api/todos
```javascript
app.post('/api/todos', (req, res) => {
    // Input validation
    // Todo creation
    // Response with new todo
})
```

#### PUT /api/todos/:id
```javascript
app.put('/api/todos/:id', (req, res) => {
    // Todo lookup
    // Status toggle
    // Response with updated todo
})
```

#### DELETE /api/todos/:id
```javascript
app.delete('/api/todos/:id', (req, res) => {
    // Todo lookup
    // Removal logic
    // Success response
})
```

### Data Structures

#### Todo Object
```javascript
{
    id: number,      // Unique identifier
    text: string,    // Todo content
    completed: boolean // Completion status
}
```

#### Pagination Object
```javascript
{
    currentPage: number,
    totalPages: number,
    totalTodos: number,
    hasNextPage: boolean,
    hasPrevPage: boolean
}
```

### State Management
- In-memory todos array
- Auto-incrementing ID counter
- Request query parameters parsing
- Response formatting helpers