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
let filteredTagsArr = [];
let filteredTagValue;

let tagBgColorArray = [];
let tagBgColor;

//==================================================================================================
// FILTERED TAGS
//==================================================================================================

function addNewTag(event, tagBgColor) {
	filteredTagValue = event.target.dataset.value;
	if (filteredTagsArr.includes(filteredTagValue)) {
		return;
	} else {
		filteredTagsArr.push(filteredTagValue);
		tagBgColor = event.target.dataset.color;
		tagBgColorArray.push(tagBgColor);

		renderFilteredTags();
		// handlerRequestByTags(filteredTagsArr);
		handlerRequestByTags();

		console.log(filteredTagsArr, filterCardsByTags);
	}
}

function renderFilteredTags() {
	let newTag = '';
	for (let i = 0; i < filteredTagsArr.length; i++) {
		newTag += `
        <li class="filtered-tags-item list-group-item d-flex align-items-center rounded-3 border-light ps-3 py-2 me-2 mb-2 fw-bold text-white bg-${tagBgColorArray[i]}"
           data-tag="#${i}">
                ${filteredTagsArr[i]}
            <button class="filtered-tags-btn ms-3" type="button" aria-label="Supprimer le tag" onclick="deleteTag(${i})"></button>
        </li>`;
	}
	//adding new tag inside ul tag
	filteredTagsList.innerHTML = newTag;
	closeAllDropdowns();
}

function deleteTag(index) {
	// delete or remove the tag name
	filteredTagsArr.splice(index, 1);
	// delete or remove the tag color
	tagBgColorArray.splice(index, 1);

	renderFilteredTags();
	// handlerRequestByTags(filteredTagsArr);
	handlerRequestByTags();
}
