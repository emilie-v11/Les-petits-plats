'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const mainSearchBar = document.getElementById('search-bar-input');
// console.log(mainSearchBar);

//=====================================
// Variables
//=====================================
console.log(recipes);
console.log(containerCards);

//==================================================================================================
// FILTER RECIPES BY MAIN INPUT SEARCH-BAR
//==================================================================================================

// Search recipes and filter it
const searchRecipes = searchText => {
	// Get matches to current text input
	let matches = recipes.filter(recipe => {
		// const regex = new RegExp(`${searchText}`, 'gi');
		const regex = new RegExp(
			`${searchText}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		);
		return (
			recipe.name
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex) ||
			recipe.ingredients
				.join()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex) ||
			recipe.description
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex)
		);
	});
	if (searchText.length === 0) {
		matches = [];
		containerCards.innerHTML = [];
	}

	outputHtml(matches);

	console.log(matches);
};

const outputHtml = matches => {
	if (matches.length > 0) {
		renderRecipesCards();
	}
};

mainSearchBar.addEventListener('input', () => {
	searchRecipes(mainSearchBar.value);
});
//==================================================================================================

const accentsMap = {
	a: 'á|à|ã|â|À|Á|Ã|Â',
	e: 'é|è|ê|É|È|Ê',
	i: 'í|ì|î|Í|Ì|Î',
	o: 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
	u: 'ú|ù|û|ü|Ú|Ù|Û|Ü',
	c: 'ç|Ç',
	n: 'ñ|Ñ',
};
const testWord = 'Crème fraîche';

// const slugify = text => Object.keys(accentsMap).reduce((acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur), text);
const slugify = text =>
	Object.keys(accentsMap).reduce(
		(acc, cur) => acc.replace(new RegExp(accentsMap[cur], 'g'), cur),
		text
	);

console.log(ingredientsListArray);
// String.prototype.matchAll(regexp)
//// String.prototype.normalize([form])
//// str.normalize('NFKC');
console.log(slugify(testWord));

const str = 'Crème Brulée';

console.log(str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
