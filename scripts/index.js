let editButton = document.querySelector('.profile__edit-button');
let saveButton = document.querySelector('.popup__submit-button');
let closeButton = document.querySelector('.popup__close-cross');

let popup = document.querySelector('.popup');

/* for already existing profile name and description */
let nameProfile = document.querySelector('.profile__name');
let descriptionProfile = document.querySelector('.profile__description');

let form = document.querySelector('.popup__form');


/* show popup and get name and description from profile*/
function showPopup() {
    /* for name and description from form */
    nameInput = document.querySelector('.popup__input_name');
    descriptionInput = document.querySelector('.popup__input_description');
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
    popup.classList.add('popup_active', true);
}

function closePopup() {
    popup.classList.remove('popup_active');
}

/* submit handler */
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
    closePopup(popup);
}

/* save on Enter */
function saveEnter(key) {
    if (key === 'Enter') {
        saveEnter.preventDefault;
        saveButton.click();
    }
}

/*event listeners*/
form.addEventListener('keypress', saveEnter);
/* listeners for buttons */
editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', formSubmitHandler);
