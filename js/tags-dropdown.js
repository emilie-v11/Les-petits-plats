'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================

// Dropdown container list tags
const ingredientsListTags = document.getElementById('ingredients-list-tags');
const appliancesListTags = document.getElementById('appliances-list-tags');
const ustensilsListTags = document.getElementById('ustensils-list-tags');

//=====================================
// Variables
//=====================================

let ingredientsListArray = [];
let appliancesListArray = [];
let ustensilsListArray = [];

//==================================================================================================
//  LIST TAGS IN DROPDOWN
//==================================================================================================
// List Tags Ingredients
//=====================================
// let allIngredients = [];
// let ingredientsListArray = [];

// function renderIngredientsList(ingredients) {
// 	allRecipes.forEach(recipes => {
// 		recipes.ingredients.map(ingredients => {
// 			allIngredients.push(ingredients.ingredient);
// 		});
// 	});

// 	// let ingredientsList = new Set(allIngredients);
//	ingredientsListArray = [...new Set(allIngredients)];
// 	console.log(ingredientsListArray);
// 	let newItemIngredient = '';
// 	ingredients.map(item => {
// 		newItemIngredient += `
//         <a href="#" class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
//             arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
//             ${item}
//         </a>
//         `;
// 		// console.log(item);
// 	});
// 	ingredientsListTags.innerHTML = newItemIngredient;
// }
// renderIngredientsList(ingredientsListArray);
// renderIngredientsList(allRecipes);

// allRecipes

function renderIngredientsList(recipes) {
	let newItemIngredient = '';
	let allIngredientsRecipes = [];

	recipes.map(recipes => {
		recipes.ingredients.map(ingredients => {
			const ingredient = ingredients.ingredient;
			allIngredientsRecipes.push(ingredient);
		});
	});

	// let ingredientsList = new Set(allIngredientsRecipes);

	// ingredientsListArray = [...ingredientsList];
	ingredientsListArray = [...new Set(allIngredientsRecipes)];
	// console.log(ingredientsListArray);

	ingredientsListArray.map(item => {
		newItemIngredient += `
        <a href="#" class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
            ${item}
        </a>
        `;
		// console.log(item);
	});
	ingredientsListTags.innerHTML = newItemIngredient;
}
// renderIngredientsList(allRecipes);

//=====================================
// List Tags Appliances
//=====================================

function renderAppliancesList(recipes) {
	let newItemAppliance = '';
	let allAppliancesRecipes = [];

	recipes.map(recipes => {
		const appliances = recipes.appliance;
		allAppliancesRecipes.push(appliances);
	});

	let appliancesList = new Set(allAppliancesRecipes);

	appliancesListArray = [...appliancesList];
	// console.log(appliancesListArray);

	appliancesListArray.map(item => {
		newItemAppliance += `
	    <a href="#" class="list-tags-item appliances col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'appareil: '${item}'" data-color="green" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
	    `;
		// console.log(item);
	});
	appliancesListTags.innerHTML = newItemAppliance;
}
// renderAppliancesList(allRecipes);

//=====================================
// List Tags Ustensils
//=====================================

function renderUstensilsList(recipes) {
	let newItemUstensils = '';
	let allUstensilsRecipes = [];

	recipes.map(recipes => {
		const ustensils = recipes.ustensils;

		ustensils.map(ustensils => {
			const ustensil = ustensils.ustensil;
			allUstensilsRecipes.push(ustensils);
		});
	});

	let ustensilsList = new Set(allUstensilsRecipes);

	ustensilsListArray = [...ustensilsList];
	// console.log(ustensilsListArray);

	ustensilsListArray.map(item => {
		newItemUstensils += `
	    <a href="#" class="list-tags-item ustensils col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'ustensil: '${item}'" data-color="orange" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
	    `;
		// console.log(item);
	});
	ustensilsListTags.innerHTML = newItemUstensils;
}
// renderUstensilsList(allRecipes);
