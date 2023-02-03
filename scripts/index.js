const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const closeButtonProfile = popupProfile.querySelector('.popup__close-cross');
const closeButtonCard = popupAddCard.querySelector('.popup__close-cross');

/* for already existing profile name and description */
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');

/* for name and description from form */
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');

/* forms */
const formProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');

/* card name and link */
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_card-link');

/* elements */
const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#element-template").content.querySelector('.element');
const element = elementTemplate.querySelector(".element");

function showPopup(popup) {
    popup.classList.add('popup_active');
}

/* show popup and get name and description from profile*/
function showPopupProfile() {
    nameInput.value = nameProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
    showPopup(popupProfile);
}

function closePopup(popup) {
    popup.classList.remove('popup_active');
}

/* create new card */
function createCard(link, name) {
    const newElement = elementTemplate.cloneNode(true);
    const elementImage = newElement.querySelector('.element__image');
    const elementText = newElement.querySelector('.element__text');
    const likeButton = newElement.querySelector('.element__like');
    likeButton.addEventListener('click', () => likeElement(likeButton));
    const deleteButton = newElement.querySelector('.element__delete');
    deleteButton.addEventListener('click', () => deleteElement(newElement));
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

/* delete card */
function deleteElement(element) {
    element.remove();
}

/* create initial cards */
function createInitCards(initCardsList) {
    initCardsList.forEach(({ link, name }) => {
        addCard(link, name);
    })
}

createInitCards(initialCards);

/* toggle like button */
function likeElement(likeButton) {
    likeButton.classList.toggle('element__like_active');
}

/* submit handlers */
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;
    closePopup(popupProfile);
}

function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    addCard(cardLink.value, cardName.value);
    closePopup(popupAddCard);
}

/*event listeners*/
/* listeners for buttons */
editButton.addEventListener('click', showPopupProfile);
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonCard.addEventListener('click', () => closePopup(popupAddCard));
addButton.addEventListener('click', () => showPopup(popupAddCard));
/* submit listeners */
formProfile.addEventListener('submit', handleFormSubmitProfile);
formAddCard.addEventListener('submit', handleFormSubmitAddCard);


