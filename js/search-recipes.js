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
// FILTER RECIPES BY MAIN INPUT SEARCH-BAR
//==================================================================================================
const init = function () {
	renderRecipesCards(allRecipes);
	// trapFocusDropdown(wrapperHomepage);
	// trapFocusDropdown(window);
	renderIngredientsList(allRecipes);
	renderAppliancesList(allRecipes);
	renderUstensilsList(allRecipes);
};
init();

let filterCardsByInput = [];

function searchRecipes(searchText) {
	console.log(ingredientsListArray);
	console.log(appliancesListArray);

	if (searchText.length >= 3) {
		filterCardsByInput = allRecipes.filter(recipe => {
			console.log(recipe.ingredients);
			const regex = new RegExp(
				`${searchText}`
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
			);
			return (
				recipe.name
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(regex) ||
				recipe.ingredients
					.join()
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
	console.log(filterCardsByInput);
	console.log(containerCards);
}
console.log(filterCardsByInput);
console.log(allRecipes);

//==================================================================================================
// EVENT
//==================================================================================================
mainSearchBar.addEventListener('click', closeAllDropdowns);

mainSearchBar.addEventListener('input', () => {
	searchRecipes(mainSearchBar.value);
});

ingredientsSearch.addEventListener('input', () => {
	searchRecipes(ingredientsSearch.value);
});
console.log(ingredientsSearch.value);

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
function getFilterByInput() {
	return filterCardsByInput;
}
console.log(filterCardsByInput);

//==================================================================================================

// let recipesDisplayed = containerCards.innerHTML;

// let idCardsDisplayed = []
// function idRecipesDisplayed (id) {
//     let recipesDisplayed = recipesDisplayed.filter(card => {
//         idCardsDisplayed.push(card.id)
//     });
// }
// idRecipesDisplayed();
// console.log(idCardsDisplayed);
// console.log(recipesDisplayed);

//containerCards.map(card => {
// 	return card.getElementsByClassName('card-recipe');
// });
// console.log(idRecipesDisplayed);

//==================================================================================================

// const accentsMap = {
// 	a: 'á|à|ã|â|À|Á|Ã|Â',
// 	e: 'é|è|ê|É|È|Ê',
// 	i: 'í|ì|î|Í|Ì|Î',
// 	o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
// 	u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
// 	c: 'ç|Ç',
// 	n: 'ñ|Ñ',
// };
// const testWord = 'Crème fraîche';

// // const slugify = text => Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur), text);
// const slugify = text =>
// 	Object.keys(accentsMap).reduce(
// 		(acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur),
// 		text
// 	);

// console.log(ingredientsListArray);
// // String.prototype.matchAll(regexp)
// //// String.prototype.normalize([form])
// //// str.normalize('NFKC');
// console.log(slugify(testWord));

// const str = 'Crème Brulée';
// console.log(str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
