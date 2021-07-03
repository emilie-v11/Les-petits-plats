'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const searchBar = document.getElementById('search-bar-input');
const alertMessage = document.getElementById('alert-message');

//=====================================
// Variables
//=====================================
let filterCardsByInput = [];
let filterFurtherByTags = [];
let filterCardsByTags = [];

let ingredientsListFiltred = [];
let appliancesListFiltred = [];
let ustensilsListFiltred = [];

//==================================================================================================
// ALERT MESSAGE IF NO MATCH
//==================================================================================================
function noMatch(value, matches, number) {
	if (value.length < number) {
		alertMessage.classList.add('hidden');
		alertMessage.ariaHidden = 'true';
		return;
	} else {
		if (matches.length === 0) {
			containerCards.innerHTML = '';
			alertMessage.classList.remove('hidden');
			alertMessage.ariaHidden = 'false';
		} else if (matches.length >= 1) {
			alertMessage.classList.add('hidden');
			alertMessage.ariaHidden = 'true';
		}
	}
}

//==================================================================================================
// FUNCTION FOR RETURN ALL ARRAYS FILTRED
//==================================================================================================

function renderAllArraySFiltred(ArrayFiltred) {
	return (
		(containerCards.innerHTML = ''),
		renderRecipesCards(ArrayFiltred),
		renderIngredientsList(ArrayFiltred),
		renderAppliancesList(ArrayFiltred),
		renderUstensilsList(ArrayFiltred)
	);
}

//==================================================================================================
// FUNCTION FOR NORMALIZE ELEMENTS
//==================================================================================================

function normalizeElement(element) {
	return element
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

//==================================================================================================
// FILTER RECIPES BY MAIN SEARCH-BAR
//==================================================================================================

function requestBySearchBar(searchText) {
	if (searchText.length >= 3) {
		filterCardsByInput = allRecipes.filter(recipe => {
			const regex = new RegExp(normalizeElement(`${searchText}`));
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			return (
				normalizeElement(recipe.name).match(regex) ||
				normalizeElement(`${ingredientsArray}`).match(regex) ||
				normalizeElement(recipe.description).match(regex)
			);
		});
		noMatch(searchText, filterCardsByInput, 3);
		renderAllArraySFiltred(filterCardsByInput);
	} else {
		alertMessage.classList.add('hidden');
		renderAllArraySFiltred(allRecipes);
	}
}

//==================================================================================================
// FILTER RECIPES BY TAGS
//==================================================================================================

// Function for handler the further search & the main search by tags
function handlerRequestByTags(tags) {
	if (searchBar.value.length >= 3) {
		furtherSearchByTags(tags);
	} else if (searchBar.value.length < 3) {
		mainSearchByTags(tags);
	}
}

// Function for the main search by tags
function mainSearchByTags(tags) {
	if (filteredTagsArray.length >= 1) {
		filterCardsByTags = allRecipes.filter(recipe => {
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			let ustensilsListArray = recipe.ustensils;
			return tags.every(
				tag =>
					ingredientsArray.includes(tag) ||
					recipe.appliance.includes(tag) ||
					ustensilsListArray.includes(tag)
			);
		});
		renderAllArraySFiltred(filterCardsByTags);
	} else {
		renderAllArraySFiltred(allRecipes);
	}
	console.log(filterCardsByTags);
}

// Function for the further search by tags
function furtherSearchByTags(tags) {
	if (filteredTagsArray.length >= 1) {
		filterFurtherByTags = filterCardsByInput.filter(recipe => {
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			let ustensilsListArray = recipe.ustensils;
			return tags.every(
				tag =>
					ingredientsArray.includes(tag) ||
					recipe.appliance.includes(tag) ||
					ustensilsListArray.includes(tag)
			);
		});
		renderAllArraySFiltred(filterFurtherByTags);
	} else {
		renderAllArraySFiltred(filterCardsByInput);
	}
	console.log(filterFurtherByTags);
}

//==================================================================================================
// FILTER THE LIST ITEM IN DROPDOWNS WITH INPUT
//==================================================================================================

// search by Input Ingredients
function searchIngredientsList(searchText) {
	if (ingredientsSearch.value.length >= 1) {
		ingredientsListFiltred = ingredientsListArray.filter(itemTag => {
			const searchValue = normalizeElement(`${searchText}`);
			return normalizeElement(itemTag).includes(searchValue);
		});
		renderIngredientsListFiltred(ingredientsListFiltred);
	} else {
		renderIngredientsListFiltred(ingredientsListArray);
	}
}

// search by Input Appliances
function searchAppliancesList(searchText) {
	if (appliancesSearch.value.length >= 1) {
		appliancesListFiltred = appliancesListArray.filter(itemTag => {
			const searchValue = normalizeElement(`${searchText}`);
			return normalizeElement(itemTag).includes(searchValue);
		});
		renderAppliancesListFiltred(appliancesListFiltred);
	} else {
		renderAppliancesListFiltred(appliancesListArray);
	}
}

// search by Input Ustensils
function searchUstensilsList(searchText) {
	if (ustensilsSearch.value.length >= 1) {
		ustensilsListFiltred = ustensilsListArray.filter(itemTag => {
			const searchValue = normalizeElement(`${searchText}`);
			return normalizeElement(itemTag).includes(searchValue);
		});
		renderUstensilsListFiltred(ustensilsListFiltred);
	} else {
		renderUstensilsListFiltred(ustensilsListArray);
	}
}
