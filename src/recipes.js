const baseUrl = "https://dummyjson.com";
const path = "/recipes/";

const fetchRecipes = () => {
    return fetch(`${baseUrl}${path}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok');
            }
            return response.json();
        })
        .then(data => data.recipes)
        .catch(error => console.error( error));
};

const displayRecipes = (recipes) => {
    const recipesContainer = document.querySelector('.recipes-container');
    if (!recipesContainer) {
        console.error('Recipes not found');
        return;
    }
    
    recipesContainer.innerHTML = ''; 

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h2>${recipe.name}</h2>
            <p> Ingredients: ${recipe.ingredients.join(', ')}</p>
            <img src="${recipe.image}" alt="${recipe.name}" />
            <button class="view-details" data-id="${recipe.id}">View Details</button>
        `;
        recipesContainer.appendChild(recipeElement);
    });
    
    const buttons = document.querySelectorAll('.view-details');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const recipeId = button.dataset.id; 
            window.location.href = `recipe-details.html?id=${recipeId}`;
        });
    });
};

fetchRecipes()
    .then(displayRecipes)
    .catch(error => console.error(error));
 
 