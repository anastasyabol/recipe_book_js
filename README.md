# Recipe Keeper Application

This is the README file for the Recipe Keeper application. The application is designed to help users manage their recipes by providing functionalities to add, update, delete, and display recipes.

## Project Structure
The project is structured as follows:

api.py: FastAPI server providing API endpoints for CRUD operations on recipes.
recipes.json: JSON file used for storing recipe data.
index.html: HTML file containing the structure of the Recipe Keeper web interface.
script.js: JavaScript file handling the logic for adding, updating, deleting, and displaying recipes on the web interface.
styles.css: CSS file for styling the web interface.
README.md: Documentation providing information about the application.

## Usage
The Recipe Keeper application allows users to:

Add a Recipe: Fill in the recipe details such as name, ingredients, steps, and an optional image URL. Click the "Add Recipe" button to save the recipe.

Update a Recipe: Click the "Update" button next to a recipe to edit its details. Update the fields and click the "Update" button in the form.

Delete a Recipe: Click the "Delete" button next to a recipe to remove it from the list.

Display Existing Recipes: Existing recipes are displayed on the right side of the web interface.

## API Documentation
The FastAPI server provides the following API endpoints:

GET /recipes: Retrieve all recipes.
GET /recipes/{recipe_id}: Retrieve a single recipe by its ID.
POST /recipes: Create a new recipe.
PUT /recipes/{recipe_id}: Update a recipe by its ID.
DELETE /recipes/{recipe_id}: Delete a recipe by its ID.
Refer to the API section in this README for more details on each endpoint.
