const editButton = document.querySelector('.profile__edit-button');
const saveButton = document.querySelector('.popup__submit-button');
const closeButton = document.querySelector('.popup__close-cross');

const popup = document.querySelector('.popup');

/* for already existing profile name and description */
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
/* for name and description from form */
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

const form = document.querySelector('.popup__form');

/* elements */
const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#element-template").content.querySelector('.element');
const element = elementTemplate.querySelector(".element");

/* show popup and get name and description from profile*/
function showPopup() {
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
    popup.classList.add('popup_active');
}

function closePopup() {
    popup.classList.remove('popup_active');
}

/* create new card */
function createCard(link, name) {
    const newElement = elementTemplate.cloneNode(true);
    const elementImage = newElement.querySelector(".element__image");
    const elementText = newElement.querySelector(".element__text");
    // const elementLike = newElement.querySelector(".element__like");
    elementImage.src = link;
    elementImage.alt = `Фотография: ${name}.`;
    elementText.textContent = name;
    /*add new card elemennt to the beginning of the section*/
    return newElement;
}

/* add new card to the beginning of the cards list */
function addCard(link, name) {
    const newCard = createCard(link, name);
    elementsList.prepend(newCard);
}

/* create initial cards */
function createInitCards(initCardsList) {
    initCardsList.forEach(({ link, name }) => {
        addCard(link, name);
    })
}

createInitCards(initialCards);

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
