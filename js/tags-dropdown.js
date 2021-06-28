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
//=====================================
// INGREDIENTS
//=====================================

// List Tags Ingredients for filter
function renderIngredientsList(recipes) {
	let allIngredientsRecipes = [];

	recipes.map(recipe => {
		recipe.ingredients.map(ingredients => {
			const ingredient = ingredients.ingredient;
			allIngredientsRecipes.push(ingredient);
		});
	});
	ingredientsListArray = [...new Set(allIngredientsRecipes)];

	renderIngredientsListFiltred(ingredientsListArray);
}

// List Tags Ingredients for search in dropdown input
function renderIngredientsListFiltred(ingredientsListArray) {
	const newItemIngredient = ingredientsListArray
		.map(
			item => `
        <a href="#" class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
            ${item}
        </a>
        `
		)
		.join('');
	ingredientsListTags.innerHTML = newItemIngredient;
}

//=====================================
// APPLIANCES
//=====================================

// List Tags Appliances
function renderAppliancesList(recipes) {
	let allAppliancesRecipes = [];

	recipes.map(recipes => {
		const appliances = recipes.appliance;
		allAppliancesRecipes.push(appliances);
	});
	appliancesListArray = [...new Set(allAppliancesRecipes)];

	renderAppliancesListFiltred(appliancesListArray);
}

// List Tags Appliances for search in dropdown input
function renderAppliancesListFiltred(appliancesListArray) {
	const newItemAppliance = appliancesListArray
		.map(
			item => `
        <a href="#" class="list-tags-item appliances col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'appareil: '${item}'" data-color="green" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
        `
		)
		.join('');
	appliancesListTags.innerHTML = newItemAppliance;
}

//=====================================
// USTENSILS
//=====================================

// List Tags Ustensils
function renderUstensilsList(recipes) {
	let allUstensilsRecipes = [];

	recipes.map(recipes => {
		const ustensils = recipes.ustensils;

		ustensils.map(ustensils => {
			const ustensil = ustensils.ustensil;
			allUstensilsRecipes.push(ustensils);
		});
	});
	ustensilsListArray = [...new Set(allUstensilsRecipes)];

	renderUstensilsListFiltred(ustensilsListArray);
}

// List Tags Ustensils for search in dropdown input
function renderUstensilsListFiltred(ustensilsListArray) {
	const newItemUstensil = ustensilsListArray
		.map(
			item => `
        <a href="#" class="list-tags-item ustensils col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'ustensil: '${item}'" data-color="orange" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
        `
		)
		.join('');
	ustensilsListTags.innerHTML = newItemUstensil;
}
