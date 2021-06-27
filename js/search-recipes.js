'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const searchBar = document.getElementById('search-bar-input');
const alertMessage = document.getElementById('alert-message');

//=====================================
// Variables
//=====================================
// console.log(allRecipes);
let filterCardsByInput = [];
let filterFurtherByTags = [];
let filterOnlyByTags = [];

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
function getFilterByInput() {
	return filterCardsByInput;
}
console.log(filterCardsByInput);

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
		// containerCards.innerHTML = '';
		noMatch(searchText, filterCardsByInput, 3);
		renderAllArraySFiltred(filterCardsByInput);
	} else {
		// containerCards.innerHTML = '';
		alertMessage.classList.add('hidden');
		renderAllArraySFiltred(allRecipes);
	}
	console.log(containerCards);
}

//==================================================================================================
// FILTER RECIPES BY TAGS
//==================================================================================================

// FIXME ajouter un forEach pour 'filteredTagsArray' each(filteredTagValue)
//       et changer le paramètre ds la fonction 'addNewTag' & 'deleteTag'

// FIXME algo de recherche changer || pour && ???? ou utiliser every() ???

// Function for handler the further search & the main search by tags
function handlerRequestByTags(activeTag) {
	if (searchBar.value.length >= 3) {
		furtherSearchByTags(activeTag);
	} else if (searchBar.value.length < 3) {
		mainSearchByTags(activeTag);
	}
}

// Function for the further search by tags
function furtherSearchByTags(activeTag) {
	if (filteredTagsArray.length >= 1) {
		filterFurtherByTags = filterCardsByInput.filter(recipe => {
			const regex = new RegExp(normalizeElement(`${activeTag}`));
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			ustensilsListArray = recipe.ustensils;
			return (
				normalizeElement(`${ingredientsArray}`).match(regex) ||
				normalizeElement(recipe.appliance).match(regex) ||
				normalizeElement(`${ustensilsListArray}`).match(regex)
			);
		});
		renderAllArraySFiltred(filterFurtherByTags);
	} else {
		renderAllArraySFiltred(filterCardsByInput);
	}
	console.log(containerCards);
}

// Function for the main search by tags
function mainSearchByTags(activeTag) {
	if (filteredTagsArray.length >= 1) {
		filterOnlyByTags = allRecipes.filter(recipe => {
			const regex = new RegExp(normalizeElement(`${activeTag}`));
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			ustensilsListArray = recipe.ustensils;
			return (
				normalizeElement(`${ingredientsArray}`).match(regex) ||
				normalizeElement(recipe.appliance).match(regex) ||
				normalizeElement(`${ustensilsListArray}`).match(regex)
			);
		});
		renderAllArraySFiltred(filterOnlyByTags);
	} else {
		renderAllArraySFiltred(allRecipes);
	}
	console.log(containerCards.length, containerCards);
}

//==================================================================================================
// FILTER THE LIST ITEM IN DROPDOWNS WITH INPUT
//==================================================================================================
let listTagsItemArray = [];

// (item, array)
function searchListItem(searchText) {
	if (ingredientsSearch.value.length >= 1) {
		listTagsItemArray = ingredientsListArray.filter(itemTag => {
			const regex = new RegExp(normalizeElement(`${searchText}`));

			return normalizeElement(itemTag).match(regex);
			// 		normalizeElement(recipe.appliance).match(regex) ||
			// 		normalizeElement(`${ustensilsListArray}`).match(regex)
		});
		// ingredientsListTags.innerHTML = '';
		// renderIngredientsList(listTagsItemArray);
	} else {
		return;
	}
	// console.log(ingredientsSearch.value);
	console.log(searchText); // +++ GOOD !!! lettre / mot input dropdown
	console.log(ingredientsListArray); // +++ GOOD !!! array correspondant à la listItem en cours selon filtres en cours
	console.log(listTagsItemArray); // +++ GOOD !!! array filtré par 'searchText'
}
