'use strict';

//==================================================================================================
// INIT ALL CARDS RECIPES AND DROPDOWNS LISTS
//==================================================================================================

const init = function () {
	renderRecipesCards(allRecipes);
	renderIngredientsList(allRecipes);
	renderAppliancesList(allRecipes);
	renderUstensilsList(allRecipes);
	searchBar.value = '';
	alertMessage.classList.add('hidden');
	filteredTagsArray = [];
	tagBgColorArray = [];
	renderFilteredTags();
	// trapFocusDropdown(wrapperHomepage);
	// trapFocusDropdown(window);
};
init();

//==================================================================================================
// EVENTS
//==================================================================================================
//=====================================
// Main search-bar input
//=====================================

searchBar.addEventListener('click', function () {
	closeAllDropdowns();
	init();
});

searchBar.addEventListener('input', function () {
	requestBySearchBar(searchBar.value);
});

// change the focus input ==> cards with e.key 'ENTER'
searchBar.addEventListener('keydown', function (e) {
	// console.log(e.key);
	if (e.key === 'Enter' || e.key === 13) {
		searchBar.blur();
		cardsEl[0].focus();
	}
});

//=====================================
//  Advanced search fields input
//=====================================

ingredientsSearch.addEventListener('input', function () {
	searchIngredientsList(ingredientsSearch.value);
});

appliancesSearch.addEventListener('input', function () {
	searchAppliancesList(appliancesSearch.value);
});

ustensilsSearch.addEventListener('input', function () {
	searchUstensilsList(ustensilsSearch.value);
});
