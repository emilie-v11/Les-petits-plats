'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
//  Dropdowns
// const containerTags = document.getElementsByClassName('container-tags');
// const dropdownContainer = document.getElementsByClassName('dropdown-container');
// const inputDropdown = document.getElementsByClassName('input-dropdown');
// const btnChevron = document.getElementsByClassName('btn-chevron');

// Ingredients
const ingredientsDropdown = document.getElementById(
	'ingredients-container-dropdown'
);
const ingredientsSearch = document.getElementById('ingredients-search');
const ingredientsBtnChevron = document.getElementById(
	'ingredients-btn-chevron'
);
console.log(ingredientsBtnChevron);
const ingredientsContainerTags = document.getElementById(
	'ingredients-container-tags'
);

// Appliances
const appliancesDropdown = document.getElementById(
	'appliances-container-dropdown'
);
const appliancesSearch = document.getElementById('appliances-search');
const appliancesBtnChevron = document.getElementById('appliances-btn-chevron');
const appliancesContainerTags = document.getElementById(
	'appliances-container-tags'
);

// Ustensils
const ustensilsDropdown = document.getElementById(
	'ustensils-container-dropdown'
);
const ustensilsSearch = document.getElementById('ustensils-search');
const ustensilsBtnChevron = document.getElementById('ustensils-btn-chevron');
const ustensilsContainerTags = document.getElementById(
	'ustensils-container-tags'
);

// img chevron
const imgChevronIngredients = document.querySelector(
	'.img-chevron-ingredients'
);
const imgChevronAppliances = document.querySelector('.img-chevron-appliances');
const imgChevronUstensils = document.querySelector('.img-chevron-ustensils');

//  Cards
const containerCards = document.getElementById('container-cards-recipes');

//=====================================
// Variables
//=====================================
console.log(recipes);
const allRecipesData = recipes;
let textContentPlaceholder;

//==================================================================================================
// HANDLER DROPDOWNS
//==================================================================================================

// ingredientsSearch.addEventListener('click', function () {
ingredientsBtnChevron.addEventListener('click', function (e) {
	e.preventDefault();
	if (!ingredientsDropdown.classList.contains('expanded')) {
		textContentPlaceholder = 'Recherche un ingrédient';
		openDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
	} else {
		textContentPlaceholder = 'Ingrédients';
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
	}
});

appliancesBtnChevron.addEventListener('click', function (e) {
	e.preventDefault();
	if (!appliancesDropdown.classList.contains('expanded')) {
		textContentPlaceholder = 'Recherche un appareil';
		openDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
	} else {
		textContentPlaceholder = 'Appareils';
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
	}
	// appliancesDropdown.classList.toggle('expanded');
	// appliancesContainerTags.classList.toggle('hidden');
	// if (appliancesSearch.placeholder === 'Appareils') {
	// 	appliancesSearch.placeholder = 'Recherche un appareil';
	// 	imgChevronAppliances.src = './img/chevron-up.svg';
	// } else {
	// 	appliancesSearch.placeholder = 'Appareils';
	// 	imgChevronAppliances.src = './img/chevron-down.svg';
	// }
});

ustensilsSearch.addEventListener('click', function () {
	ustensilsDropdown.classList.toggle('expanded');
	ustensilsContainerTags.classList.toggle('hidden');
	if (ustensilsSearch.placeholder === 'Ustensiles') {
		ustensilsSearch.placeholder = 'Recherche un ustensile';
		imgChevronUstensils.src = './img/chevron-up.svg';
	} else {
		ustensilsSearch.placeholder = 'Ustensiles';
		imgChevronUstensils.src = './img/chevron-down.svg';
	}
});

// ingredientsSearch.addEventListener('click', openDropdown);
// appliancesSearch.addEventListener('click', openDropdown);
// ustensilsSearch.addEventListener('click', openDropdown);

function openDropdown(dropdown, containerTags, inputDropdown, btnChevron) {
	dropdown.classList.add('expanded');
	containerTags.classList.remove('hidden');
	inputDropdown.placeholder = textContentPlaceholder;
	btnChevron.style.background =
		'url(../img/chevron-up.svg) center center / 16px 11px no-repeat';
}

function closeDropdown(dropdown, containerTags, inputDropdown, btnChevron) {
	dropdown.classList.remove('expanded');
	containerTags.classList.add('hidden');
	inputDropdown.placeholder = textContentPlaceholder;
	btnChevron.style.background =
		'url(../img/chevron-down.svg) center center / 16px 11px no-repeat';
}

//==================================================================================================
//  INGREDIENTS TAGS LIST IN DROPDOWN
//==================================================================================================

//==================================================================================================
//  RECIPES' CARDS
//==================================================================================================
// Create all recipes' cards
function renderRecipesCards() {
	let newRecipeCard = '';

	allRecipesData.map(recipe => {
		let ingredients = recipe.ingredients;
		console.log(recipe);
		console.log(ingredients);

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
            <a href="#" class="card rounded-3">
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
	});
}

renderRecipesCards();
