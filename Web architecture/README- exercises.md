# API Design

## Getting all tasks

**GET** /api/tasks
**Request:** None
**Response:** 200 OK
**Content-Type-Response:** application/json
**Body-Response:** [{"id": 1, "title": "Fix login bug", "description": "Debug authentication issue", "status": "in_progress", "assigned_to": 2, "created": "2025-12-02 08:30:00", "updated": "2025-12-03 14:30:00", "due_date": "2025-12-03 23:59:00", "priority": "high"}]
**Status-Codes:** 200 OK // 500 Internal Server Error

## Getting a specific task

**GET** /api/tasks/{id}
**Request:** None
**Response:** 200 OK
**Content-Type_Response:** application/json
**Body_Response:** {"id": 3, "title": "Prepare sprint planning", "description": "Organize meeting notes and backlog", "status": "open", "assigned_to": 5, "created": "2025-12-02 08:45:00", "updated": "2025-12-03 13:30:00", "due_date": "2025-12-03 23:59:00", "priority": "medium"}
**Status-Codes:** 200 OK // 404 Not Found // 500 Internal Server Error

## Creating a new task

**POST** /api/tasks
**Request:** Included
**Content-Type_Request:** application/json
**Body_Request:** {"title": "Design new dashboard", "description": "Create wireframes and components", "assigned_to": 4, "due_date": "2025-12-03 23:59:00", "priority": "high"}
**Response:** 201 Created
**Content-Type_Response:** application/json
**Body_Response:** {"id": 7, "title": "Design new dashboard", "description": "Create wireframes and components", "status": "open", "assigned_to": 4, "created": "2025-12-02 08:58:00", "updated": "2025-12-02 08:58:00", "due_date": "2025-12-03 23:59:00", "priority": "high"}
**Status-Codes:** 201 Created // 400 Bad Request // 500 Internal Server Error

## Updating a task

**PATCH** /api/tasks/{id}
**Request:** Included
**Content-Type_Request:** application/json
**Body_Request:** {"status": "completed", "assigned_to": 1}
**Response:** 200 OK
**Content-Type_Response:** application/json
**Body_Response:** {"id": 4, "title": "Update testing documentation", "description": "Include new test cases for API", "status": "completed", "assigned_to": 1, "created_at": "2025-12-01 07:28:00", "updated_at": "2025-12-01 13:35:00", "due_date": "2025-12-02 23:59:00",
"priority": "low"}
**Status-Codes:** 200 OK // 400 Bad Request // 404 Not Found // 500 Internal Server Error

## Deleting a task

**DELETE** /api/tasks/{id}
**Request:** None
**Response:** 204 No Content
**Content-Type_Response:** None
**Body_Response:** None
**Status-Codes:** 204 No Content // 404 Not Found // 500 Internal Server Error

# Sequence diagram

## Create flow

**User → Frontend → Backend → Database**
**User** clicks "Add" button
**Frontend** sends POST with data (to-do list or todo item)
**Backend** executes create in Database
**Database** returns created record (id)
**Backend** sends success response (201) to Frontend
**Frontend** updates the page
**User** is able to see the new list or item

## Read flow

**User → Frontend → Backend → Database**
**User** opens website
**Frontend** sends GET with data (to-do list or todo item)
**Backend** executes read in Database
**Database** returns list of todos
**Backend** returns list to Frontend
**Frontend** renders the list on the page
**User** is able to see the existing list

## Update flow

**User → Frontend → Backend → Database**
**User** clicks checkbox
**Frontend** sends PATCH(id) with updated data
**Backend** executes update in Database
**Database** returns updated record (id)
**Backend** sends success response (200) to Frontend
**Frontend** updates the list on the page
**User** is able to see the updated item

## Delete flow

**User → Frontend → Backend → Database**
**User** clicks "Delete" button
**Frontend** sends DELETE(id)
**Backend** executes delete in Database
**Database** returns rows affected
**Backend** sends response (204: No Content or 200: with info) to Frontend
**Frontend** removes item from the page
**User** is not able to see the deleted item
