'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================

// Ingredients
const ingredientsDropdown = document.getElementById(
	'ingredients-container-dropdown'
);
const ingredientsSearch = document.getElementById('ingredients-search');
const ingredientsBtnChevron = document.getElementById(
	'ingredients-btn-chevron'
);
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

//==================================================================================================
// HANDLING THE DROPDOWNS
//==================================================================================================
// Functions
//=====================================

function openDropdown(dropdown, containerTags, inputDropdown, btnChevron) {
	dropdown.classList.add('expanded');
	containerTags.classList.remove('hidden');
	btnChevron.style.background =
		'url(../img/chevron-up.svg) center center / 16px 11px no-repeat';
	switch (inputDropdown.id) {
		case 'ingredients-search':
			inputDropdown.placeholder = 'Recherche un ingrédient';
			break;
		case 'appliances-search':
			inputDropdown.placeholder = 'Recherche un appareil';
			break;
		case 'ustensils-search':
			inputDropdown.placeholder = 'Recherche un ustensile';
			break;
	}
}

function closeDropdown(dropdown, containerTags, inputDropdown, btnChevron) {
	dropdown.classList.remove('expanded');
	containerTags.classList.add('hidden');
	btnChevron.style.background =
		'url(../img/chevron-down.svg) center center / 16px 11px no-repeat';
	inputDropdown.value = '';
	switch (inputDropdown.id) {
		case 'ingredients-search':
			inputDropdown.placeholder = 'Ingrédients';
			break;
		case 'appliances-search':
			inputDropdown.placeholder = 'Appareils';
			break;
		case 'ustensils-search':
			inputDropdown.placeholder = 'Ustensiles';
			break;
	}
}

function handlerDropdownIngredients(e) {
	e.preventDefault();
	if (!ingredientsDropdown.classList.contains('expanded')) {
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
		openDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		// renderIngredientsList();
	} else {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
	}
}

function handlerDropdownAppliances(e) {
	e.preventDefault();
	if (!appliancesDropdown.classList.contains('expanded')) {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
		openDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		// renderAppliancesList();
	} else {
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
	}
}

function handlerDropdownUstensils(e) {
	e.preventDefault();
	if (!ustensilsDropdown.classList.contains('expanded')) {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		openDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
		// renderUstensilsList();
	} else {
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
	}
}

function closeAllDropdowns() {
	if (
		ingredientsDropdown.classList.contains('expanded') ||
		appliancesDropdown.classList.contains('expanded') ||
		ustensilsDropdown.classList.contains('expanded')
	) {
		closeDropdown(
			ingredientsDropdown,
			ingredientsContainerTags,
			ingredientsSearch,
			ingredientsBtnChevron
		);
		closeDropdown(
			appliancesDropdown,
			appliancesContainerTags,
			appliancesSearch,
			appliancesBtnChevron
		);
		closeDropdown(
			ustensilsDropdown,
			ustensilsContainerTags,
			ustensilsSearch,
			ustensilsBtnChevron
		);
	}
}

//=====================================
// Events
//=====================================

ingredientsBtnChevron.addEventListener('click', handlerDropdownIngredients);
appliancesBtnChevron.addEventListener('click', handlerDropdownAppliances);
ustensilsBtnChevron.addEventListener('click', handlerDropdownUstensils);

document.addEventListener('keydown', function (e) {
	// console.log(e.key);
	if (e.key === 'Escape') {
		closeAllDropdowns();
	}
});

// .addEventListener('click', closeAllDropdown);

//==================================================================================================

// let type;
// function openDropdown(type) {
// 	`${type + 'Dropdown'}`.classList.add('expanded');
// 	`${type + 'ContainerTags'}`.classList.remove('hidden');
// 	`${type + 'BtnChevron'}`.style.background =
// 		'url(../img/chevron-up.svg) center center / 16px 11px no-repeat';
// 	// `${type + 'Search'}`.placeholder = 'Recherche un ingrédient';
// 	switch (inputDropdown.id) {
// 		case 'ingredients-search':
// 			inputDropdown.placeholder = 'Recherche un ingrédient';
// 			break;
// 		case 'appliances-search':
// 			inputDropdown.placeholder = 'Recherche un appareil';
// 			break;
// 		case 'ustensils-search':
// 			inputDropdown.placeholder = 'Recherche un ustensile';
// 			break;
// 	}
// }

// function closeDropdownIngredients() {
// 	closeDropdown(
// 		ingredientsDropdown,
// 		ingredientsContainerTags,
// 		ingredientsSearch,
// 		ingredientsBtnChevron
// 	);
// }

// function openDropdownIngredients() {
// 	ingredientsDropdown.classList.add('expanded');
// 	ingredientsContainerTags.classList.remove('hidden');
// 	ingredientsSearch.placeholder = 'Recherche un ingrédient';
// 	ingredientsBtnChevron.style.background =
// 		'url(../img/chevron-up.svg) center center / 16px 11px no-repeat';
// }

// function closeDropdownIngredients() {
// 	ingredientsDropdown.classList.remove('expanded');
// 	ingredientsContainerTags.classList.add('hidden');
// 	ingredientsSearch.placeholder = 'Ingrédients';
// 	ingredientsBtnChevron.style.background =
// 		'url(../img/chevron-down.svg) center center / 16px 11px no-repeat';
// }

// function openDropdownAppliances() {
// 	appliancesDropdown.classList.add('expanded');
// 	appliancesContainerTags.classList.remove('hidden');
// 	appliancesSearch.placeholder = 'Recherche un appareils';
// 	appliancesBtnChevron.style.background =
// 		'url(../img/chevron-up.svg) center center / 16px 11px no-repeat';
// }

// function closeDropdownAppliances() {
// 	appliancesDropdown.classList.remove('expanded');
// 	appliancesContainerTags.classList.add('hidden');
// 	appliancesSearch.placeholder = 'Appareils';
// 	appliancesBtnChevron.style.background =
// 		'url(../img/chevron-down.svg) center center / 16px 11px no-repeat';
// }

// function openDropdownUstensils() {
// 	ustensilsDropdown.classList.add('expanded');
// 	ustensilsContainerTags.classList.remove('hidden');
// 	ustensilsSearch.placeholder = 'Recherche un appareils';
// 	ustensilsBtnChevron.style.background =
// 		'url(../img/chevron-up.svg) center center / 16px 11px no-repeat';
// }

// function closeDropdownUstensils() {
// 	ustensilsDropdown.classList.remove('expanded');
// 	ustensilsContainerTags.classList.add('hidden');
// 	ustensilsSearch.placeholder = 'Appareils';
// 	ustensilsBtnChevron.style.background =
// 		'url(../img/chevron-down.svg) center center / 16px 11px no-repeat';
// }
