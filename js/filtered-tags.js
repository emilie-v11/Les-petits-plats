'use strict';
//==================================================================================================
// DOM ELEMENTS
//==================================================================================================
// List tags item
const listTagsItem = document.querySelectorAll('.list-tags-item');


//filtered tags
const filteredTagsList = document.querySelector('.filtered-tags-list');
const filteredTagsItem = document.getElementsByClassName('filtered-tags-item');

//=====================================
// Variables
//=====================================
let filteredTagsArray = [];
// let activeTagsArray = [];
let RecipesByTagsItemArray = [];

let tagBgColorArray = [];
let tagBgColor;

//==================================================================================================
// FILTERED TAGS
//==================================================================================================
// let activeTags;

function addNewTag(event, tagBgColor) {
	let filteredTagValue = event.target.dataset.value; // textContent
	if (filteredTagsArray.includes(filteredTagValue)) {
		return;
	} else {
		filteredTagsArray.push(filteredTagValue);
		console.log(filteredTagValue, event.target.dataset);

		tagBgColor = event.target.dataset.color;
		tagBgColorArray.push(tagBgColor);
		// console.log(tagBgColor);

		// event.target.style.opacity = '0.5';

		renderFilteredTags();
		console.log(filteredTagsArray);
		console.log(tagBgColorArray);
		// filterRecipesByTagsItem();
	}
}

function renderFilteredTags() {
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
}

function deleteTag(index) {
	filteredTagsArray.splice(index, 1); // delete or remove the tag name
	tagBgColorArray.splice(index, 1); // delete or remove the tag color
	renderFilteredTags();
}

function searchTags(inputText) {
	const filterTagsByInput = ingredientsListArray.filter(ingredients => {
		const regex = new RegExp(
			`${inputText}`
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
		);
		return (
			ingredients
				// .join()
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.match(regex)
		);
	});
	// ingredientsListTags.innerHTML = '';
	renderIngredientsList(filterTagsByInput);
	console.log(filterTagsByInput);
}

ingredientsSearch.addEventListener('input', () => {
	searchTags(ingredientsSearch.value);
});
console.log(ingredientsSearch.value);

//appliancesSearch.addEventListener('input', () => {
//	searchTags(appliancesSearch.value);
//});

//ustensilsSearch.addEventListener('input', () => {
//	searchTags(ustensilsSearch.value);
//});

// let ingredientsListArray = [];
// let appliancesListArray = [];
// let ustensilsListArray = [];
