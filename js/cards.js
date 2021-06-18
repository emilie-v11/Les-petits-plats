'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const wrapperHomepage = document.getElementById('wrapper-homepage');

//  Cards
const containerCards = document.getElementById('container-cards-recipes');
const cardsRecipes = document.getElementsByClassName('card-recipe');
console.log(cardsRecipes);

//=====================================
// Variables
//=====================================
console.log(recipes);
// const allRecipesData = recipes;
let allRecipes = recipes; // suppr in main branch

//==================================================================================================
//  RECIPES' CARDS
//==================================================================================================

// Create all recipes' cards
function renderRecipesCards(recipes) {
	// renderRecipesCards
	let newRecipeCard = '';

	recipes.forEach(recipe => {
		const ingredients = recipe.ingredients;

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
			// fix quantity's ingredients
			let fixQuantity =
				ingredient.quantity !== undefined
					? `: ${ingredient.quantity}`
					: '';

			newIngredientTag += `
            <li class="card-ingredients-item list-group-item bg-transparent border-0 fw-bold p-0">
                <span class="recipe-ingredient">${ingredient.ingredient}</span>
                <span class="recipe-quantity fw-normal">
                    ${fixQuantity}
                </span>
                <span class="recipe-unit fw-normal">
                    ${fixUnits}
                </span>
            </li>
            `;
		});

		// Create recipes' cards
		newRecipeCard += `
        <article id="${recipe.id}" class="card-recipe col rounded-3">
            <a href="#" class="col card rounded-3" aria-label="Accéder à la fiche de recette: '${recipe.name}'">
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
        </article>
        `;
	});
	containerCards.innerHTML = newRecipeCard;
	console.log(containerCards);

	// filter()
}
renderRecipesCards(allRecipes);
trapFocusDropdown(wrapperHomepage);

// containerCards.innerHTML = `
// Aucune recette ne correspond à votre recherche.
// Essayez fraise,
// `;
//===================================================================
// console.log(allRecipesData);
console.log(recipes);
