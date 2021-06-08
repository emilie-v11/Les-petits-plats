'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
const containerCards = document.getElementById('container-cards-recipes');
console.log(containerCards);

console.log(recipes);
// let newRecipeCard = '';
const allRecipesData = recipes;

function allRecipesCards() {
	let newRecipeCard = '';
	// allRecipesData.forEach(recipe => {})

	allRecipesData.map(recipe => {
		let ingredients = recipe.ingredients;
		console.log(ingredients);

		// Ingredients' recipe
		let newIngredientTag = '';
		ingredients.map(ingredient => {
			// fix unit's ingredients : Plural / singular or abbreviation
			const fixUnit =
				ingredient.unit === 'grammes'
					? ingredient.unit.replace('grammes', 'g')
					: ingredient.unit === 'cuillère à soupe' &&
					  ingredient.quantity !== 1
					? ingredient.unit.replace('cuillère à soupe', 'cuillères')
					: ingredient.unit === 'cuillère à soupe' &&
					  ingredient.quantity === 1
					? ingredient.unit.replace('cuillère à soupe', 'cuillère')
					: ingredient.unit === 'cuillère à café' &&
					  ingredient.quantity !== 1
					? ingredient.unit.replace('cuillère à café', 'cuillères')
					: ingredient.unit === 'cuillère à café' &&
					  ingredient.quantity === 1
					? ingredient.unit.replace('cuillère à café', 'cuillère')
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
                    ${fixUnit}
                </span>
            </li>
            `;
		});

		// Render recipes' cards
		newRecipeCard += `
        <div class="col rounded-3">
            <div class="card rounded-3">
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
            </div>
        </div>
        `;
		containerCards.innerHTML = newRecipeCard;
	});
}

allRecipesCards();
