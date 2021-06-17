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
		'url(./img/chevron-up.svg) center center / 16px 11px no-repeat';
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
		'url(./img/chevron-down.svg) center center / 16px 11px no-repeat';
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
		trapFocusDropdown(ingredientsDropdown);
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
		trapFocusDropdown(appliancesDropdown);
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
		trapFocusDropdown(ustensilsDropdown);
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
// Trap the focus in each Dropdown
//=====================================

// add all the elements inside modal which you want to make focusable
let focusableElements = 'button, [href], input';
let modal;
let firstFocusableElement;
let focusableContent;
let lastFocusableElement;

// trap the focus inside the form
function trapFocusDropdown(dropdownType) {
	modal = dropdownType; // select the modal by id
	firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
	focusableContent = modal.querySelectorAll(focusableElements);
	lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
	trapFocus();
}

// Function for trap the focus
function trapFocus() {
	document.addEventListener('keydown', function (e) {
		let isTabPressed = e.key === 'Tab' || e.key === 9;
		if (!isTabPressed) {
			return;
		}
		if (e.shiftKey) {
			// if shift key pressed for shift + tab combination
			if (document.activeElement === firstFocusableElement) {
				e.preventDefault();
				lastFocusableElement.focus(); // add focus for the last focusable element
			}
		} else {
			// if tab key is pressed
			if (document.activeElement === lastFocusableElement) {
				e.preventDefault();
				// if focused has reached to last focusable element then focus first focusable element after pressing tab
				firstFocusableElement.focus(); // add focus for the first focusable element
			}
		}
	});
	firstFocusableElement.focus();
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

// document.addEventListener('click', event => {
// 	// if (
// 	// 	dropdownsEl.classList.contains('expanded') &&
// 	// 	!event.target === dropdownsEl)
// 	// ) {
// 	// 	closeAllDropdowns();
// 	// }
// 	console.log(event.target);
// });
