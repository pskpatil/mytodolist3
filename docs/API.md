# Todo List API Documentation

## Base URL
`http://127.0.0.1:6001/api`

## Endpoints

### GET /todos
Retrieves a paginated and filtered list of todos.

**Query Parameters:**
- `page` (number, optional): Page number for pagination (default: 1)
- `limit` (number, optional): Number of items per page (default: 5)
- `filter` (string, optional): Filter todos by status ('all', 'active', 'completed')
- `search` (string, optional): Search todos by text

**Response:**
```json
{
    "todos": [
        {
            "id": number,
            "text": string,
            "completed": boolean
        }
    ],
    "pagination": {
        "currentPage": number,
        "totalPages": number,
        "totalTodos": number,
        "hasNextPage": boolean,
        "hasPrevPage": boolean
    }
}
```

### POST /todos
Creates a new todo item.

**Request Body:**
```json
{
    "text": string
}
```

**Response:**
```json
{
    "id": number,
    "text": string,
    "completed": false
}
```

### PUT /todos/:id
Toggles the completion status of a todo item.

**Parameters:**
- `id` (number): The ID of the todo item

**Response:**
```json
{
    "id": number,
    "text": string,
    "completed": boolean
}
```

### DELETE /todos/:id
Deletes a todo item.

**Parameters:**
- `id` (number): The ID of the todo item

**Response:**
```json
{
    "success": true
}