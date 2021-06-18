'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const mainSearchBar = document.getElementById('search-bar-input');
// console.log(mainSearchBar);
const alertMessage = document.getElementById('alert-message');

const cardTitles = document.getElementsByClassName('card-title');
console.log(cardTitles);
const cardIngredientsItems = document.getElementsByClassName(
	'card-ingredients-item'
);
const cardDescriptions = document.getElementsByClassName('recipe-description');

//=====================================
// Variables
//=====================================
// console.log(recipes);
console.log(allRecipes);

//==================================================================================================
// FILTER RECIPES BY MAIN INPUT SEARCH-BAR
//==================================================================================================

function searchRecipes(searchText) {
	if (searchText.length >= 3) {
		const filterCardsByInput = allRecipes.filter(recipe => {
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
		// containerCards.innerHTML = '';
		renderRecipesCards(filterCardsByInput);

		noMatch(searchText, filterCardsByInput, 3);
		// recipes filtered
		console.log(filterCardsByInput);
	} else {
		renderRecipesCards(allRecipes);
		alertMessage.classList.add('hidden');
	}
}

//==================================================================================================
// EVENT
//==================================================================================================
mainSearchBar.addEventListener('click', closeAllDropdowns);

mainSearchBar.addEventListener('input', () => {
	searchRecipes(mainSearchBar.value);
});
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
