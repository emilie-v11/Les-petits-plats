//==================================================================================================
// FILTER WITH TAGS
//==================================================================================================

function renderAllArraySFiltred(ArrayFiltred) {
	return (
		renderRecipesCards(ArrayFiltred),
		renderIngredientsList(ArrayFiltred),
		renderAppliancesList(ArrayFiltred),
		renderUstensilsList(ArrayFiltred)
	);
}

function normalizeElement(element) {
	return element
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

function handlerRequestByTags() {
	if (searchBar.value.length >= 3) {
		furtherSearchByTags();

		// or just : else {}
	} else if (searchBar.value.length < 3) {
		mainSearchByTags();
	}
}

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
		// containerCards.innerHTML = '';
		renderAllArraySFiltred(filterFurtherByTags);
		// noMatch(ingredientsArray, filterFurtherByTags, 1);
	} else {
		// containerCards.innerHTML = '';
		renderAllArraySFiltred(filterCardsByInput);
	}
}

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
		// containerCards.innerHTML = '';
		renderAllArraySFiltred(filterOnlyByTags);
		// noMatch(ingredientsArray, filterOnlyByTags, 1);
	} else {
		renderAllArraySFiltred(allRecipes);
	}
}

//==================================================================================================

// List Tags Ingredients for filter
function renderIngredientsList(recipes) {
	let newItemIngredient = '';
	let allIngredientsRecipes = [];

	recipes.map(recipe => {
		recipe.ingredients.map(ingredients => {
			const ingredient = ingredients.ingredient;
			allIngredientsRecipes.push(ingredient);
		});
	});
	ingredientsListArray = [...new Set(allIngredientsRecipes)];

	ingredientsListArray.map(item => {
		newItemIngredient += `
	    <a href="#" class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
	        arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
	        ${item}
	    </a>
	    `;
		// console.log(item);
	});
	ingredientsListTags.innerHTML = newItemIngredient;
}

// // List Tags Ingredients for search in dropdown input
// const renderIngredientsListFiltred = listTagsItemArray => {
// 	const html = listTagsItemArray
// 		.map(
// 			item => `
//         <a href="#" class="list-tags-item ingredients col-1 list-group-item list-group-item-action bg-transparent border-0 text-white m-0 p-0 px-4"
//             arial-label="Rechercher des recettes avec l'ingrédient: '${item}'" data-color="blue" data-value="${item}" onclick="addNewTag(event, tagBgColor)">
//             ${item}
//         </a>
//         `
// 		)
// 		.join('');
// 	ingredientsListTags.innerHTML = html;
// };

let listIngredientsFiltred = [];

function searchListItem(searchText) {
	if (ingredientsSearch.value.length >= 1) {
		listIngredientsFiltred = ingredientsListArray.filter(itemTag => {
			const regex = new RegExp(normalizeElement(`${searchText}`));
			return normalizeElement(itemTag).match(regex);
		});
		renderIngredientsListFiltred(listIngredientsFiltred);
	} else {
		renderIngredientsListFiltred(ingredientsListArray);
	}
	// console.log(searchText); // +++ GOOD !!! lettre / mot input dropdown
	// console.log(ingredientsListArray); // +++ GOOD !!! array correspondant à la listItem en cours selon filtres en cours
	// console.log(listIngredientsFiltred); // +++ GOOD !!! array filtré par 'searchText'
}


//==================================================================================================

if (searchBar.value.length >= 3) {
	filterFurtherByTags = filterCardsByInput.filter(recipe => {
		const regex = new RegExp(
			`${activeTag}`
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
		);
		let ingredientsArray = [];
		for (let key in recipe.ingredients) {
			let ingredientElts = recipe.ingredients[key].ingredient;
			ingredientsArray.push(ingredientElts);
		}
		ustensilsListArray = recipe.ustensils;

		return (
			`${ingredientsArray}`
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex) ||
			recipe.appliance
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex) ||
			`${ustensilsListArray}`
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex)
		);
	});
	containerCards.innerHTML = '';
	renderRecipesCards(filterFurtherByTags);
	// noMatch(ingredientsArray, filterFurtherByTags, 1);
	renderIngredientsList(filterFurtherByTags); //searchText // filterFurtherByTags // ingredientsSearch.value
	renderAppliancesList(filterFurtherByTags);
	renderUstensilsList(filterFurtherByTags);
} else {
	renderRecipesCards(filterCardsByInput);
	renderIngredientsList(filterCardsByInput);
	renderAppliancesList(filterCardsByInput);
	renderUstensilsList(filterCardsByInput);
}

//==================================================================================================
//==================================================================================================

let filterCardsByTags = [];
console.log(ustensilsListArray);

function tagsListSearch(activeTag) {
	if (filteredTagsArray.length >= 1) {
		filterCardsByTags = filterCardsByInput.filter(recipe => {
			const regex = new RegExp(
				`${activeTag}`
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
			);
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			ustensilsListArray = recipe.ustensils;
			return (
				`${ingredientsArray}`
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(regex) ||
				recipe.appliance
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(regex) ||
				`${ustensilsListArray}`
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.match(regex)
			);
		});
		containerCards.innerHTML = '';
		renderRecipesCards(filterCardsByTags);
		// noMatch(ingredientsArray, filterCardsByTags, 1);
		renderIngredientsList(filterCardsByTags); //searchText // filterCardsByTags // ingredientsSearch.value
		renderAppliancesList(filterCardsByTags);
		renderUstensilsList(filterCardsByTags);
		// } else if (filteredTagsArray.length === 0) {
	} else {
		renderRecipesCards(filterCardsByInput);
		renderIngredientsList(filterCardsByInput);
		renderAppliancesList(filterCardsByInput);
		renderUstensilsList(filterCardsByInput);
	}
}

//  function tagsListSearch(activeTag) {
// 	let searchBarValue = searchBar.value;
// 	if (filteredTagsArray.length >= 1) {
//         if (searchBar.value.length >= 3) {

// 			filterFurtherByTags = filterCardsByInput.filter(recipe => {
// 				const regex = new RegExp(normalizeElement(`${activeTag}`));
// 				let ingredientsArray = [];
// 				for (let key in recipe.ingredients) {
// 					let ingredientElts = recipe.ingredients[key].ingredient;
// 					ingredientsArray.push(ingredientElts);
// 				}
// 				ustensilsListArray = recipe.ustensils;
// 				return (
// 					normalizeElement(`${ingredientsArray}`).match(regex) ||
// 					normalizeElement(recipe.appliance).match(regex) ||
// 					normalizeElement(`${ustensilsListArray}`).match(regex)
// 				);
// 			});
// 			// containerCards.innerHTML = '';
// 			// noMatch(ingredientsArray, filterFurtherByTags, 1);
// 			renderAllArraySFiltred(filterFurtherByTags);
//         } else {
// 			// containerCards.innerHTML = '';
// 			renderAllArraySFiltred(filterCardsByInput);
// 		}
//     } else if (filteredTagsArray.length >= 1 && searchBar.value.length === 0) {

// 		filterOnlyByTags = allRecipes.filter(recipe => {
// 			const regex = new RegExp(normalizeElement(`${activeTag}`));
// 			let ingredientsArray = [];
// 			for (let key in recipe.ingredients) {
// 				let ingredientElts = recipe.ingredients[key].ingredient;
// 				ingredientsArray.push(ingredientElts);
// 			}
// 			ustensilsListArray = recipe.ustensils;
// 			return (
// 				normalizeElement(`${ingredientsArray}`).match(regex) ||
// 				normalizeElement(recipe.appliance).match(regex) ||
// 				normalizeElement(`${ustensilsListArray}`).match(regex)
// 			);
// 		});
// 		// containerCards.innerHTML = '';
// 		renderAllArraySFiltred(filterOnlyByTags);
// 		// noMatch(ingredientsArray, filterOnlyByTags, 1);
//     } else {
// 		// containerCards.innerHTML = '';
// 		renderAllArraySFiltred(filterCardsByInput);
// 	}
// }

// let searchBarValue = searchBar.value;
// if (searchBarValue.length === 0) {
// 	console.log('empty');
// } else if (searchBarValue.length >= 1) {
// 	console.log('full');
// }

// console.log(filteredTagsArray);
// console.log(tagBgColorArray);

// function filterListByInput() {
// 	let searchBarValue = searchBar.value;
// 	if (searchBarValue.length === 0) {
// 		tagsListSearch(allrecipes);
// 		console.log('empty');
// 	} else if (searchBarValue.length >= 1) {
// 		tagsListSearch(filterCardsByInput);
// 		// tagsListSearch(ingredientsSearch.value, 1);
// 		console.log('full');
// 	}
// }
// furtherSearch();
// console.log(searchText.value);

let filterCardsByTags = [];

function tagsListSearch(searchText) {
	if (searchText.length >= 1) {
		filterCardsByTags = filterCardsByInput.filter(recipe => {
			const regex = new RegExp(
				`${searchText}`
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
			);
			let ingredientsArray = [];
			for (let key in recipe.ingredients) {
				let ingredientElts = recipe.ingredients[key].ingredient;
				ingredientsArray.push(ingredientElts);
			}
			return `${ingredientsArray}`
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex);
		});
		renderRecipesCards(filterCardsByTags);
		noMatch(searchText, filterCardsByTags, 3);

		renderIngredientsList(ingredientsSearch.value); //searchText // filterCardsByTags // ingredientsSearch.value
		renderAppliancesList(filterCardsByTags);
		renderUstensilsList(filterCardsByTags);
	} else {
		renderRecipesCards(filterCardsByInput);
	}
}

// tagsListSearch(filterCardsByTags);

// ingredientsSearch.addEventListener('input', function());
// ingredientsSearch.addEventListener('click', function());

// function searchTags(inputText) {
// 	const filterTagsByInput = ingredientsListArray.filter(ingredients => {
// 		const regex = new RegExp(
// 			`${inputText}`
// 				.toLowerCase()
// 				.normalize('NFD')
// 				.replace(/[\u0300-\u036f]/g, '')
// 		);
// 		return (
// 			ingredients
// 				// .join()
// 				.toLowerCase()
// 				.normalize('NFD')
// 				.replace(/[\u0300-\u036f]/g, '')
// 				.match(regex)
// 		);
// 	});
// 	// ingredientsListTags.innerHTML = '';
// 	renderIngredientsList(filterTagsByInput);
// 	console.log(filterTagsByInput);
// }

// ingredientsSearch.addEventListener('input', () => {
// 	searchTags(ingredientsSearch.value);
// });
// console.log(ingredientsSearch.value);

//appliancesSearch.addEventListener('input', () => {
//	searchTags(appliancesSearch.value);
//});

//ustensilsSearch.addEventListener('input', () => {
//	searchTags(ustensilsSearch.value);
//});

// let ingredientsListArray = [];
// let appliancesListArray = [];
// let ustensilsListArray = [];

//==================================================================================================
// FOCUS
//==================================================================================================

// document.addEventListener('keydown', function (e) {
// 	if (e.key === 'Enter' || e.key === 13) {
// 		document.activeElement.blur();
// 	}
// });

//==================================================================================================
// ENLEVER LES ACCENTS
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
