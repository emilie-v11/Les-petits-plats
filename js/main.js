'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const wrapperHomepage = document.getElementById('wrapper-homepage');
console.log(wrapperHomepage);

// Dropdown container list tags
const ingredientsListTags = document.getElementById('ingredients-list-tags');
const appliancesListTags = document.getElementById('appliances-list-tags');
const ustensilsListTags = document.getElementById('ustensils-list-tags');

//filtered tags
const filteredTagsList = document.querySelector('.filtered-tags-list');

//  Cards
const containerCards = document.getElementById('container-cards-recipes');

//=====================================
// Variables
//=====================================
console.log(recipes);
const allRecipesData = recipes;
let ingredientsListArray = [];
let appliancesListArray = [];
let ustensilsListArray = [];

let filteredTagsArray = [];
console.log(filteredTagsArray);
let activeTagsArray = [];

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

	allRecipesData.map(recipes => {
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
	console.log(ingredientsListArray.length);
}
renderIngredientsList();

//=====================================
// List Tags Appliances
//=====================================

function renderAppliancesList() {
	let newItemAppliance = '';
	let allAppliancesRecipes = [];

	allRecipesData.map(recipes => {
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

	allRecipesData.map(recipes => {
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
let activeTags;

function addNewTag(event, tagBgColor) {
	// activeTags = event.target;
	// activeTags.classList.add('hidden');
	// if (activeTags.classList.contains('hidden')) {
	// 	activeTagsArray.push(activeTags);
	// } else {
	// 	activeTagsArray.slice(index, 1);
	// }

	let filteredTagValue = event.target.textContent;
	filteredTagsArray.push(filteredTagValue);
	// console.log(filteredTagValue);

	tagBgColor = event.target.dataset.color;
	tagBgColorArray.push(tagBgColor);
	// console.log(tagBgColor);

	// event.target.style.display = 'none';

	// handlerTagsVisibility(event.target);

	showFilteredTags();
	console.log(filteredTagsArray);
	console.log(activeTagsArray);
}

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
	// inputField.value = ''; //once task added leave the input field blank
	// addBtn.classList.remove('active'); //unactive the add button
}

function deleteTag(index) {
	filteredTagsArray.splice(index, 1); // delete or remove the tag name
	tagBgColorArray.splice(index, 1); // delete or remove the tag color
	// activeTagsArray[index].classList.remove('hidden');
	// activeTagsArray.slice(index, 1);
	showFilteredTags();
}

//==================================================================================================
//  RECIPES' CARDS
//==================================================================================================

// Create all recipes' cards
function renderRecipesCards() {
	let newRecipeCard = '';

	allRecipesData.map(recipe => {
		const ingredients = recipe.ingredients;
		// console.log(recipe);
		// console.log(ingredients);

		// Ingredients' recipes cards
		let newIngredientTag = '';
		ingredients.map(ingredient => {
			// fix unit's ingredients : Plural / singular or abbreviation
			let fixUnits =
				ingredient.unit === 'grammes'
					? ingredient.unit.replace('grammes', 'g')
					: (ingredient.unit === 'cuillère à soupe' ||
							ingredient.unit === 'cuillère à café') &&
					  ingredient.quantity !== 1
					? ingredient.unit.replace(ingredient.unit, 'cuillères')
					: (ingredient.unit === 'cuillère à soupe' ||
							ingredient.unit === 'cuillère à café') &&
					  ingredient.quantity === 1
					? ingredient.unit.replace(ingredient.unit, 'cuillère')
					: (ingredient.unit === 'gousse' ||
							ingredient.unit === 'sachet') &&
					  ingredient.quantity !== 1
					? ingredient.unit.concat('s')
					: ingredient.unit !== undefined
					? ingredient.unit
					: '';

			newIngredientTag += `
            <li class="card-ingredients-item list-group-item bg-transparent border-0 fw-bold p-0">
                <span class="recipe-ingredient">${ingredient.ingredient}</span>
                <span class="recipe-quantity fw-normal">
                    ${
						ingredient.quantity !== undefined
							? `: ${ingredient.quantity}`
							: ''
					}
                </span>
                <span class="recipe-unit fw-normal">
                    ${fixUnits}
                </span>
            </li>
            `;
		});

		// Create recipes' cards
		newRecipeCard += `
        <div class="col rounded-3">
            <a href="#" class="card rounded-3" aria-label="Accéder à la fiche de recette: '${recipe.name}'">
                <img src="./img/bg-card-img.svg" class="card-img-top rounded-top border-0" width="380"
                    height="178" aria-hidden="true" alt="">
                <div class="card-body p-3 rounded-bottom">
                    <div class="card-heading d-flex justify-content-between align-items-center fw-bold mb-3">
                        <h2 class="card-title mb-0 fw-bold">${recipe.name}</h2>
                        <div class="recipe-time align-self-start d-flex align-items-center">
                            <img class="me-2" src="./img/clock.svg" width="20" height="20" alt=""
                                aria-hidden="true">
                            <p class="mb-0 "><span>${recipe.time}</span> min</p>
                        </div>
                    </div>
                    <div class="row mt-1 lh-sm">
                        <div class="col-6 p-0 ps-3">
                            <ul class="card-ingredients-list card-text list-group ps-0 ">
                                ${newIngredientTag}
                            </ul>
                        </div>
                        <div class="col-6 p-0 pe-3">
                            <p class="recipe-description card-text ">${recipe.description}</p>
                        </div>
                    </div>

                </div>
            </a>
        </div>
        `;
		containerCards.innerHTML = newRecipeCard;
		// console.log(containerCards);
	});
}

renderRecipesCards();
trapFocusDropdown(wrapperHomepage);

// containerCards.innerHTML = `
// Aucune recette ne correspond à votre recherche.
// Essayez fraise,
// `;
//===================================================================
