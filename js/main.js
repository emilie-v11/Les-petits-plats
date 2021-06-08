'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
//  Dropdowns
// const containerTags = document.getElementsByClassName('container-tags');
// const dropdownContainer = document.getElementsByClassName('dropdown-container');
// const inputDropdown = document.getElementsByClassName('input-dropdown');

// Ingredients
const ingredientsContainerDropdown = document.getElementById(
	'ingredients-container-dropdown'
);
const ingredientsSearch = document.getElementById('ingredients-search');
const ingredientsContainerTags = document.getElementById(
	'ingredients-container-tags'
);

// Appliances
const appliancesContainerDropdown = document.getElementById(
	'appliances-container-dropdown'
);
const appliancesSearch = document.getElementById('appliances-search');
const appliancesContainerTags = document.getElementById(
	'appliances-container-tags'
);

// Ustensils
const ustensilsContainerDropdown = document.getElementById(
	'ustensils-container-dropdown'
);
const ustensilsSearch = document.getElementById('ustensils-search');
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

//==================================================================================================
// HANDLER DROPDOWNs
//==================================================================================================

ingredientsSearch.addEventListener('click', function () {
	ingredientsContainerDropdown.classList.toggle('expanded');
	ingredientsContainerTags.classList.toggle('hidden');
	if (ingredientsSearch.placeholder === 'Ingrédients') {
		ingredientsSearch.placeholder = 'Recherche un ingrédient';
		imgChevronIngredients.src = './img/chevron-up.svg';
	} else {
		ingredientsSearch.placeholder = 'Ingrédients';
		imgChevronIngredients.src = './img/chevron-down.svg';
	}
});

appliancesSearch.addEventListener('click', function () {
	appliancesContainerDropdown.classList.toggle('expanded');
	appliancesContainerTags.classList.toggle('hidden');
	if (appliancesSearch.placeholder === 'Appareils') {
		appliancesSearch.placeholder = 'Recherche un appareil';
		imgChevronAppliances.src = './img/chevron-up.svg';
	} else {
		appliancesSearch.placeholder = 'Appareils';
		imgChevronAppliances.src = './img/chevron-down.svg';
	}
});

ustensilsSearch.addEventListener('click', function () {
	ustensilsContainerDropdown.classList.toggle('expanded');
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

function openDropdown() {
	dropdownContainer.classList.toggle('expanded');
	containerTags.classList.toggle('hidden');
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
