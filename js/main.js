'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
// Dropdown container tags
const ingredientsListTags = document.getElementById('ingredients-list-tags');
const appliancesListTags = document.getElementById('appliances-list-tags');
const ustensilsListTags = document.getElementById('ustensils-list-tags');

//  Cards
const containerCards = document.getElementById('container-cards-recipes');

//=====================================
// Variables
//=====================================
console.log(recipes);
const allRecipesData = recipes;
// let ingredients;
// let textContentPlaceholder;

//==================================================================================================
//  INGREDIENTS TAGS LIST IN DROPDOWN
//==================================================================================================

//=====================================
// Ingredients
//=====================================

let allIngredientsRecipes = [];
// let ingredientsListSet;
// console.log(ingredientsListSet);

function renderIngredientsList() {
	let newLiIngredient = '';

	allRecipesData.map(recipes => {
		const ingredients = recipes.ingredients;
		// console.log(ingredients);

		ingredients.map(ingredients => {
			const ingredient = ingredients.ingredient;
			allIngredientsRecipes.push(ingredient);
		});
	});
	console.log(allIngredientsRecipes);

	let ingredientsList = new Set(allIngredientsRecipes);
	console.log(ingredientsList);

	let ingredientsListSet = [...ingredientsList];
	console.log(ingredientsListSet);

	ingredientsListSet.map(li => {
		newLiIngredient += `
        <li class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4" tabindex="0">
            ${li}
        </li>
        `;
		console.log(li, li.length);

		ingredientsListTags.innerHTML = newLiIngredient;
	});
	console.log(ingredientsListSet.length);
}
renderIngredientsList();

//=====================================
// Appliances
//=====================================

let allAppliancesRecipes = [];

function renderAppliancesList() {
	let newLiAppliance = '';

	allRecipesData.map(recipes => {
		// console.log(allRecipesData);
		const appliances = recipes.appliance;
		console.log(appliances);

		allAppliancesRecipes.push(appliances);
	});
	console.log(allAppliancesRecipes);

	let appliancesList = new Set(allAppliancesRecipes);
	console.log(appliancesList);

	let appliancesListSet = [...appliancesList];
	console.log(appliancesListSet);

	appliancesListSet.map(li => {
		newLiAppliance += `
	    <li class="list-tags-item appliances col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4" tabindex="0">
	        ${li}
	    </li>
	    `;
		console.log(li, li.length);

		appliancesListTags.innerHTML = newLiAppliance;
	});
}
renderAppliancesList();

//=====================================
// Ustensils
//=====================================

let allUstensilsRecipes = [];

function renderUstensilsList() {
	let newLiUstensils = '';

	allRecipesData.map(recipes => {
		const ustensils = recipes.ustensils;
		console.log(ustensils);

		ustensils.map(ustensils => {
			const ustensil = ustensils.ustensil;
			allUstensilsRecipes.push(ustensils);
		});
	});
	console.log(allUstensilsRecipes);

	let ustensilsList = new Set(allUstensilsRecipes);
	console.log(ustensilsList);

	let ustensilsListSet = [...ustensilsList];
	console.log(ustensilsListSet);

	ustensilsListSet.map(li => {
		newLiUstensils += `
	    <li class="list-tags-item ustensils col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4" tabindex="0">
	        ${li}
	    </li>
	    `;
		console.log(li, li.length);

		ustensilsListTags.innerHTML = newLiUstensils;
	});
}
renderUstensilsList();

//==================================================================================================
//  RECIPES' CARDS
//==================================================================================================
// Create all recipes' cards
function renderRecipesCards() {
	let newRecipeCard = '';

	allRecipesData.map(recipe => {
		const ingredients = recipe.ingredients;
		// console.log(recipe);
		// console.log(ingredients);

		// Ingredients' recipes cards
		let newIngredientTag = '';
		ingredients.map(ingredient => {
			// fix unit's ingredients : Plural / singular or abbreviation
			let fixUnits =
				ingredient.unit === 'grammes'
					? ingredient.unit.replace('grammes', 'g')
					: (ingredient.unit === 'cuillère à soupe' ||
							ingredient.unit === 'cuillère à café') &&
					  ingredient.quantity !== 1
					? ingredient.unit.replace(ingredient.unit, 'cuillères')
					: (ingredient.unit === 'cuillère à soupe' ||
							ingredient.unit === 'cuillère à café') &&
					  ingredient.quantity === 1
					? ingredient.unit.replace(ingredient.unit, 'cuillère')
					: (ingredient.unit === 'gousse' ||
							ingredient.unit === 'sachet') &&
					  ingredient.quantity !== 1
					? ingredient.unit.concat('s')
					: ingredient.unit !== undefined
					? ingredient.unit
					: '';

			newIngredientTag += `
            <li class="card-ingredients-item list-group-item bg-transparent border-0 fw-bold p-0">
                <span class="recipe-ingredient">${ingredient.ingredient}</span>
                <span class="recipe-quantity fw-normal">
                    ${
						ingredient.quantity !== undefined
							? `: ${ingredient.quantity}`
							: ''
					}
                </span>
                <span class="recipe-unit fw-normal">
                    ${fixUnits}
                </span>
            </li>
            `;
		});

		// Create recipes' cards
		newRecipeCard += `
        <div class="col rounded-3">
            <a href="#" class="card rounded-3">
                <img src="./img/bg-card-img.svg" class="card-img-top rounded-top border-0" width="380"
                    height="178" aria-hidden="true" alt="">
                <div class="card-body p-3 rounded-bottom">
                    <div class="card-heading d-flex justify-content-between align-items-center fw-bold mb-3">
                        <h2 class="card-title mb-0 fw-bold">${recipe.name}</h2>
                        <div class="recipe-time align-self-start d-flex align-items-center">
                            <img class="me-2" src="./img/clock.svg" width="20" height="20" alt=""
                                aria-hidden="true">
                            <p class="mb-0 "><span>${recipe.time}</span> min</p>
                        </div>
                    </div>
                    <div class="row mt-1 lh-sm">
                        <div class="col-6 p-0 ps-3">
                            <ul class="card-ingredients-list card-text list-group ps-0 ">
                                ${newIngredientTag}
                            </ul>
                        </div>
                        <div class="col-6 p-0 pe-3">
                            <p class="recipe-description card-text ">${recipe.description}</p>
                        </div>
                    </div>

                </div>
            </a>
        </div>
        `;
		containerCards.innerHTML = newRecipeCard;
	});
}

renderRecipesCards();
