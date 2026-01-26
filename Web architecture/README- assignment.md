# Identify the components:

## Where is the recipe data stored?

The recipe data is stored permanently in the Database, so it can be retrieved, updated, or deleted later.

## How does the frontend communicate with the backend?

The frontend communicates with the backend via HTTP(S) requests and receives responses.

## What happens when a user adds a new recipe?

When users add new recipes, they fill out a form on the frontend. The frontend sends a POST request to the backend with the recipe data. The backend saves it in the database and returns a response. The frontend then updates the page to show the new recipe.

**POST** /recipes
**Request:** Included
**Content-Type_Request:** application/json
**Body_Request:** {
"title": "Chocolate Cake",
"ingredients": ["200g flour", "100g sugar", "2 eggs", "50g cocoa powder"],
"instructions": "Mix ingredients, bake at 180°C for 30 minutes."
}
**Response:** 201 Created
**Content-Type_Response:** application/json
**Body_Response:** {
"id": 1,
"title": "Chocolate Cake",
"ingredients": ["200g flour", "100g sugar", "2 eggs", "50g cocoa powder"],
"instructions": "Mix ingredients, bake at 180°C for 30 minutes."
}
**Status-Codes:** 201 Created // 400 Bad Request // 500 Internal Server Error

# Sequence diagram

## Create flow

**User → Frontend → Backend → Database**
**User** clicks "Add Recipe" button
**Frontend** sends POST /recipes with data (title, ingredients, instructions)
**Backend** creates the recipe in Database
**Database** returns the created record (id)
**Backend** sends success response (201 Created) to Frontend
**Frontend** updates the page
**User** sees the new recipe

## Read flow

**User → Frontend → Backend → Database**
**User** opens website
**Frontend** sends GET/recipes
**Backend** retrieves recipes from Database
**Database** returns list of recipes
**Backend** sends list to Frontend
**Frontend** renders the list on the page
**User** sees the existing recipes

## Update flow

**User → Frontend → Backend → Database**
**User** clicks "Update Recipe" button
**Frontend** sends PATCH(id) /recipes/{id} with updated data
**Backend** updates the recipe in Database
**Database** returns the updated record (id)
**Backend** sends success response (200 OK) to Frontend
**Frontend** updates the recipe on the page
**User** sees the updated recipe

## Delete flow

**User → Frontend → Backend → Database**
**User** clicks "Delete Recipe" button
**Frontend** sends DELETE(id) /recipes/{id}
**Backend** deletes the recipe from Database
**Database** returns number of rows affected
**Backend** sends response (204: No Content or 200: with info) to Frontend
**Frontend** removes recipe from the page
**User** no longer sees the deleted recipe
