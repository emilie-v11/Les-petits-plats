'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================

// Dropdown container list tags
const ingredientsListTags = document.getElementById('ingredients-list-tags');
const appliancesListTags = document.getElementById('appliances-list-tags');
const ustensilsListTags = document.getElementById('ustensils-list-tags');
// List tags item
// const listTagsItem = document.getElementsByClassName('list-tags-item');
const listTagsItem = document.querySelectorAll('.list-tags-item');

//filtered tags
const filteredTagsList = document.querySelector('.filtered-tags-list');
const filteredTagsItem = document.getElementsByClassName('filtered-tags-item');
// const filteredTagsItem = document.querySelectorAll('.filtered-tags-item');
console.log(filteredTagsItem);

//=====================================
// Variables
//=====================================
// console.log(recipes);
// const allRecipesData = recipes;
let ingredientsListArray = [];
let appliancesListArray = [];
let ustensilsListArray = [];

let filteredTagsArray = [];
console.log(filteredTagsArray);
// let activeTagsArray = [];
let RecipesByTagsItemArray = [];

let tagBgColorArray = [];
let tagBgColor;

//==================================================================================================
//  LIST TAGS IN DROPDOWN
//==================================================================================================
// List Tags Ingredients
//=====================================

function renderIngredientsList() {
	let newItemIngredient = '';
	let allIngredientsRecipes = [];

	recipes.map(recipes => {
		const ingredients = recipes.ingredients;
		// console.log(ingredients);

		ingredients.map(ingredients => {
			const ingredient = ingredients.ingredient;
			allIngredientsRecipes.push(ingredient);
		});
	});

	let ingredientsList = new Set(allIngredientsRecipes);

	let ingredientsListArray = [...ingredientsList];
	console.log(ingredientsListArray);

	ingredientsListArray.map(item => {
		newItemIngredient += `
        <a href="#" value="${item}" class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" onclick="addNewTag(event, tagBgColor)">
            ${item}
        </a>
        `;
		console.log(item);

		ingredientsListTags.innerHTML = newItemIngredient;
	});
}
renderIngredientsList();

//=====================================
// List Tags Appliances
//=====================================

function renderAppliancesList() {
	let newItemAppliance = '';
	let allAppliancesRecipes = [];

	recipes.map(recipes => {
		const appliances = recipes.appliance;
		allAppliancesRecipes.push(appliances);
	});

	let appliancesList = new Set(allAppliancesRecipes);

	let appliancesListArray = [...appliancesList];
	console.log(appliancesListArray);

	appliancesListArray.map(item => {
		newItemAppliance += `
	    <a href="#" class="list-tags-item appliances col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'appareil: '${item}'" data-color="green" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
	    `;
		console.log(item);

		appliancesListTags.innerHTML = newItemAppliance;
	});
}
renderAppliancesList();

//=====================================
// List Tags Ustensils
//=====================================

function renderUstensilsList() {
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

	let ustensilsListArray = [...ustensilsList];
	console.log(ustensilsListArray);

	ustensilsListArray.map(item => {
		newItemUstensils += `
	    <a href="#" class="list-tags-item ustensils col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
            arial-label="Rechercher des recettes utilisant l'ustensil: '${item}'" data-color="orange" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
	    `;
		console.log(item);

		ustensilsListTags.innerHTML = newItemUstensils;
	});
}
renderUstensilsList();

//==================================================================================================
// FILTERED TAGS
//==================================================================================================
// let activeTags;

function addNewTag(event, tagBgColor) {
	let filteredTagValue = event.target.textContent;
	if (filteredTagsArray.includes(filteredTagValue)) {
		return;
	} else {
		filteredTagsArray.push(filteredTagValue);
		console.log(filteredTagValue);

		tagBgColor = event.target.dataset.color;
		tagBgColorArray.push(tagBgColor);
		// console.log(tagBgColor);

		// event.target.style.opacity = '0.5';

		showFilteredTags();
		console.log(filteredTagsArray);
		// filterRecipesByTagsItem();
	}
}

// Array.from(listTagsItem).map(tag => {
// 	tag.addEventListener('click', () => {
// 		listTagsItem.classList.add('active');
// 		// alert('ok');
// 	});
// });

// function handlerTagsVisibility(item) {
// 	if (item.classList.contains('active')) {
// 		item.classList.toggle('hidden')
// 	} else {
// 		item.style.display = 'block';
// 	}
// }

function showFilteredTags() {
	let newTag = '';
	for (let i = 0; i < filteredTagsArray.length; i++) {
		newTag += `
        <li class="filtered-tags-item list-group-item d-flex align-items-center rounded-3 border-light ps-3 py-2 me-2 mb-2 fw-bold text-white bg-${tagBgColorArray[i]}"
           data-tag="#${i}">
                ${filteredTagsArray[i]}
            <button class="filtered-tags-btn ms-3" type="button" aria-label="Supprimer le tag" onclick="deleteTag(${i})"></button>
        </li>`;
	}
	filteredTagsList.innerHTML = newTag; //adding new tag inside ul tag
	closeAllDropdowns();
}

function deleteTag(index) {
	filteredTagsArray.splice(index, 1); // delete or remove the tag name
	tagBgColorArray.splice(index, 1); // delete or remove the tag color
	showFilteredTags();
}

function filterRecipesByTagsItem() {
	// // RecipesByTagsItemArray = '';
	// containerCards.innerHTML = '';
	// renderRecipesCards(allRecipesData);
}
