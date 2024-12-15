const baseUrl = "https://dummyjson.com";
const path = "/recipes/";

const getRecipeIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
};  

const fetchRecipeDetails = (id) => {
    if (!id) {
        console.error('No recipe ID provided');
        return Promise.reject('No recipe ID provided');
    }
    
    return fetch(`${baseUrl}${path}${id}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Recipe not found');
                    return Promise.reject('Recipe not found');
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => console.error( error));
};

const displayRecipeDetails = (recipe) => {
    if (!recipe) {
        console.error('No recipe data to display');
        return;
    }
    
    const titleRecipe = document.getElementById('name');
    const imageRecipe = document.querySelector('.image');
    const ingredientsRecipe = document.querySelector('.ingredients');
    const instructionsRecipe = document.querySelector('.instructions');
    const prepTimeMinutesRecipe = document.querySelector('.prepTimeMinutes');
    const cookTimeMinutesRecipe = document.querySelector('.cookTimeMinutes');
    const servingsRecipe = document.querySelector('.servings');
    const difficultyRecipe = document.querySelector('.difficulty');
    const cuisineRecipe = document.querySelector('.cuisine');
    const caloriesPerServingRecipe = document.querySelector('.caloriesPerServing');
    const tagsRecipe = document.querySelector('.tags');
    const ratingRecipe = document.querySelector('.rating');
    const reviewCountRecipe = document.querySelector('.reviewCount');
    const mealTypeRecipe = document.querySelector('.mealType');

    titleRecipe.textContent = recipe.name; 
    imageRecipe.src = recipe.image;
    ingredientsRecipe.textContent = recipe.ingredients.join(', ');
    instructionsRecipe.textContent = recipe.instructions;
    prepTimeMinutesRecipe.textContent = recipe.prepTimeMinutes;
    cookTimeMinutesRecipe.textContent = recipe.cookTimeMinutes;
    servingsRecipe.textContent = recipe.servings;
    difficultyRecipe.textContent = recipe.difficulty;
    cuisineRecipe.textContent = recipe.cuisine;
    caloriesPerServingRecipe.textContent = recipe.caloriesPerServing;
    tagsRecipe.textContent = recipe.tags.join(', ');
    ratingRecipe.textContent = recipe.rating;
    reviewCountRecipe.textContent = recipe.reviewCount;
    mealTypeRecipe.textContent = recipe.mealType;
};

const recipeId = getRecipeIdFromUrl();
if (recipeId) {
    fetchRecipeDetails(recipeId)
        .then(displayRecipeDetails)
        .catch(error => console.error(error));
}
 