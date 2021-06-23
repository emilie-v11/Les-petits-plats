'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const mainSearchBar = document.getElementById('search-bar-input');
const alertMessage = document.getElementById('alert-message');

//=====================================
// Variables
//=====================================
// console.log(allRecipes);

//==================================================================================================
// INIT ALL CARDS RECIPES AND DROPDOWNS LISTS
//==================================================================================================

const init = function () {
	renderRecipesCards(allRecipes);
	renderIngredientsList(allRecipes);
	renderAppliancesList(allRecipes);
	renderUstensilsList(allRecipes);
	mainSearchBar.value = '';
	alertMessage.classList.add('hidden');
	filteredTagsArray = [];
	tagBgColorArray = [];
	renderFilteredTags();
	// trapFocusDropdown(wrapperHomepage);
	// trapFocusDropdown(window);
};
init();

//==================================================================================================
// ALERT MESSAGE WHEN NO MATCH
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
// FILTER RECIPES BY MAIN INPUT SEARCH-BAR
//==================================================================================================

let filterCardsByInput = [];

function searchRecipes(searchText) {
	if (searchText.length >= 3) {
		filterCardsByInput = allRecipes.filter(recipe => {
			const regex = new RegExp(
				`${searchText}`
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
			);
			let ingredientArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientArray.push(ingredientElts);
			}
			return (
				recipe.name
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(regex) ||
				`${ingredientArray}`
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(regex) ||
				recipe.description
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(regex)
			);
		});
		containerCards.innerHTML = '';
		renderRecipesCards(filterCardsByInput);
		noMatch(searchText, filterCardsByInput, 3);

		renderIngredientsList(filterCardsByInput);
		renderAppliancesList(filterCardsByInput);
		renderUstensilsList(filterCardsByInput);
	} else {
		renderRecipesCards(allRecipes);
		alertMessage.classList.add('hidden');

		renderIngredientsList(allRecipes);
		renderAppliancesList(allRecipes);
		renderUstensilsList(allRecipes);
	}
	console.log(containerCards);
}

//==================================================================================================
// EVENT
//==================================================================================================
mainSearchBar.addEventListener('click', function () {
	closeAllDropdowns();
	init();
});
console.log(filteredTagsArray);
console.log(tagBgColorArray);

mainSearchBar.addEventListener('input', () => {
	searchRecipes(mainSearchBar.value);
});

mainSearchBar.addEventListener('keydown', function (e) {
	// console.log(e.key);
	if (e.key === 'Enter' || e.key === 13) {
		mainSearchBar.blur();
		cardsEl[0].focus();
		// cardsRecipes[0].focus();
		// console.log(cardsEl[0]);
	}
});

ingredientsSearch.addEventListener('input', () => {
	searchRecipes(ingredientsSearch.value);
});
console.log(ingredientsSearch.value);

//==================================================================================================
function getFilterByInput() {
	return filterCardsByInput;
}
console.log(filterCardsByInput);

//==================================================================================================
