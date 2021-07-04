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

// Function for handler the search by tags
function handlerRequestByTags() {
	if (searchBar.value.length >= 3) {
		requestByTags(filteredTagsArr, filterFurtherByTags, filterCardsByInput);
	} else if (searchBar.value.length < 3) {
		requestByTags(filteredTagsArr, filterCardsByTags, allRecipes);
	}
}

// Function for search by tags only search & the further search
function requestByTags(tags, arrayFiltred, array) {
	if (filteredTagsArr.length >= 1) {
		arrayFiltred = array.filter(recipe => {
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			let appliancesArray = recipe.appliance;
			let ustensilsArray = recipe.ustensils;
			return tags.every(
				tag =>
					ingredientsArray.includes(tag) ||
					appliancesArray.includes(tag) ||
					ustensilsArray.includes(tag)
			);
		});
		renderAllArraySFiltred(arrayFiltred);
	} else {
		renderAllArraySFiltred(array);
	}
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
