const editButton = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.popup__submit-button');
const closeButton = document.querySelector('.popup__close-cross');

const popup = document.querySelector('.popup');

/* for already existing profile name and description */
let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');
/* for name and description from form */
let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');

const form = document.querySelector('.popup__form');

/* show popup and get name and description from profile*/
function showPopup() {
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
    popup.classList.add('popup_active');
}

function closePopup() {
    popup.classList.remove('popup_active');
}

/* submit handler */
function handleFormSubmit(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
    closePopup(popup);
}

/*event listeners*/
/* listeners for buttons */
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);
