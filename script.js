// Get DOM elements
const recipeForm = document.getElementById('recipe-form');
const recipeHeader = document.getElementById('form-header');
const formButton = document.getElementById('form-button');
const recipeName = document.getElementById('recipe-name');
const ingredients = document.getElementById('ingredients');
const steps = document.getElementById('steps');
const imageUrl = document.getElementById('image-url');
const displayArea = document.getElementById('display');
const defaultImage = "https://www.allrecipes.com/thmb/5SdUVhHTMs-rta5sOblJESXThEE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11691-tomato-and-garlic-pasta-ddmfs-3x4-1-bf607984a23541f4ad936b33b22c9074.jpg"

// Initialize recipes array with a sample recipe
const sample = [
  {
    id: 1,
    name: "Pasta",
    ingredients: "Pasta, sauce, salt, pepper, and love",
    steps: "Bring flowers to your wife and ask her to cook",
    image: "https://www.allrecipes.com/thmb/5SdUVhHTMs-rta5sOblJESXThEE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11691-tomato-and-garlic-pasta-ddmfs-3x4-1-bf607984a23541f4ad936b33b22c9074.jpg"
  },
  {
    id: 2,
    name: "Pasta Too",
    ingredients: "Pasta, sauce, salt, pepper, and love",
    steps: "Bring flowers to your wife and ask her to cook",
    image: "https://www.allrecipes.com/thmb/5SdUVhHTMs-rta5sOblJESXThEE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11691-tomato-and-garlic-pasta-ddmfs-3x4-1-bf607984a23541f4ad936b33b22c9074.jpg"
  }
];

// Initialize recipes array with sample data
//const recipes = sample;

// Function to show existing recipes from the array
function showExistingRecipes() {
  fetch('http://0.0.0.0:8000/recipes')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then((data) => {
      console.log(data);

      // Clear the existing recipes from the displayArea
      displayArea.innerHTML = '';

      data.forEach((recipe) => {
        displayRecipe(recipe);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
// Call showExistingRecipes to display existing recipes before the page fully loads
showExistingRecipes();

// Function to display a recipe
function displayRecipe(recipe) {
  // Create a new div element
  const newRecipeDiv = document.createElement('div');
  newRecipeDiv.className = "display-area";
  newRecipeDiv.id = recipe.id;

  // Create and configure elements
  const h3Element = document.createElement('h3');
  h3Element.textContent = recipe.name;

  const pIngredientsElement = document.createElement('p');
  pIngredientsElement.textContent = recipe.ingredients;

  const pStepsElement = document.createElement('p');
  pStepsElement.textContent = recipe.steps;

  let imgElement = document.createElement('img');
  imgElement.src = recipe.image;
  checkIfImageExists(imgElement.src, (exists) => {
    if (!exists) {
      imgElement.src = defaultImage
    }
  });

  imgElement.alt = recipe.name;
  imgElement.width = 300;
  imgElement.height = 200;

  const br = document.createElement("BR");

  // Append elements to the new div
  newRecipeDiv.appendChild(h3Element);
  newRecipeDiv.appendChild(pIngredientsElement);
  newRecipeDiv.appendChild(pStepsElement);
  newRecipeDiv.appendChild(imgElement);
  newRecipeDiv.appendChild(br);

  // Create a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Delete";
  deleteButton.className = "recipe-button";

  // Add an event handler to delete the recipe
  deleteButton.onclick = function () {
    const parentDiv = this.parentNode;
    const id = parentDiv.getAttribute("id");
    deleteRecipe(id);
  };

  // Create an update button
  const updateButton = document.createElement('button');
  updateButton.textContent = "Update";
  updateButton.className = "recipe-button";

  // Add an event handler to update the recipe
  updateButton.onclick = function () {
    const parentDiv = this.parentNode;
    const id = parentDiv.getAttribute("id");
    updateForm(id);
  };

  // Append the delete and update button to the new div
  newRecipeDiv.appendChild(deleteButton);
  newRecipeDiv.appendChild(updateButton);

  // Append the new div to the display area
  displayArea.appendChild(newRecipeDiv);
  
  // Store the ID of the recipe
  recipeHeader.setAttribute("data-id", recipe.id); 
}

// Function to add a new recipe
function addNewRecipe() {
  // Get user input values
  const enteredRecipeName = recipeName.value;
  const enteredIngredients = ingredients.value;
  const enteredSteps = steps.value;
  const enteredImageUrl = imageUrl.value;

  // Create a new recipe object
  const newRecipe = {
    name: enteredRecipeName,
    ingredients: enteredIngredients,
    steps: enteredSteps,
    image: enteredImageUrl
  };

  // Send a POST request to the server
  fetch('http://0.0.0.0:8000/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newRecipe),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON (if needed)
    })
    .then((data) => {
      // Handle the response from the server if needed
      console.log('Recipe added:', data);

      // Assuming you want to display the newly added recipe, you can call your displayRecipe function
      displayRecipe(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  recipeForm.reset();
}
// Event listener for form submission
recipeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (formButton.innerText === "Add Recipe") {
    addNewRecipe();
  } else {
    // Get the ID of the recipe to update
    const id = recipeHeader.getAttribute("data-id");
    console.log("Updating recipe with ID:", id);
    updateForm(id);
  }
});

// Function to delete a recipe by ID
function deleteRecipe(id) {
  // Send a DELETE request to the server
  fetch(`http://0.0.0.0:8000/recipes/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Assuming a successful deletion, you can handle it here
      console.log(`Recipe with ID ${id} deleted successfully.`);
      
      // Remove the recipe element from the DOM if it exists
      const displayDiv = document.getElementById(id);
      if (displayDiv) {
        displayDiv.remove();
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to open a form for updating a recipe
function updateForm(id) {
  // Find the recipe to update based on its ID
  fetch(`http://0.0.0.0:8000/recipes/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then((recipeToUpdate) => {
      // Change the form header to "Update" + recipe name
      recipeHeader.innerText = 'Update "' + recipeToUpdate.name + '"';
      formButton.innerText = "Update";

      // Pre-fill the form fields with the existing recipe data
      recipeName.value = recipeToUpdate.name;
      ingredients.value = recipeToUpdate.ingredients;
      steps.value = recipeToUpdate.steps;
      imageUrl.value = recipeToUpdate.image;

      // Add an event listener to the form for updating the recipe
      recipeForm.removeEventListener('submit', addNewRecipe);
      recipeForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Update the recipe with the new values
      recipeToUpdate.name = recipeName.value;
      recipeToUpdate.ingredients = ingredients.value;
      recipeToUpdate.steps = steps.value;
      recipeToUpdate.image = imageUrl.value;

      // Send a PUT request to update the recipe on the server
      fetch(`http://0.0.0.0:8000/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeToUpdate),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Assuming a successful update, you can handle it here
          console.log(`Recipe with ID ${id} updated successfully.`);
          
          // Reset the form and header
          recipeForm.reset();
          recipeHeader.innerText = "Add Recipe";
          formButton.innerText = "Add Recipe";

          // Remove all existing recipes from the displayArea
          displayArea.innerHTML = '';

          // Show all recipes again by re-displaying them
          showExistingRecipes();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
});
}



function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}