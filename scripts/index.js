import { Card } from "./Card.js";
import { initialCards, validationSettings } from "./Constants.js";
import { FormValidator } from "./FormValidator.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

/* popups initialization */
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupList = document.querySelectorAll('.popup');

/* all close buttons */
const buttonCloseList = document.querySelectorAll('.popup__close-cross');

/* for already existing profile name and description */
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

/* for name and description from form */
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileDescriptionInput = document.querySelector('.popup__input_type_description');

/* forms */
const formProfile = popupProfile.querySelector('.popup__form');
const formAddCard = popupAddCard.querySelector('.popup__form');

/* card name and link */
const cardName = document.querySelector('.popup__input_type_card-name');
const cardLink = document.querySelector('.popup__input_type_card-link');

/* elements */
const elementsContainer = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#element-template").content.querySelector('.element');
const element = elementTemplate.querySelector(".element");

/* fullscreen image popup */
const image = document.querySelector('.img-figure__image');
const imageDescription = document.querySelector('.img-figure__description');

const formProfileValidator = new FormValidator(validationSettings, formProfile);
const formAddCardValidator = new FormValidator(validationSettings, formAddCard);

function showPopup(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', keyHandler);
}

/* show popup and get name and description from profile*/
function showPopupProfile() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
    showPopup(popupProfile);
}

function closePopup(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', keyHandler);
    // document.removeEventListener('mousedown', clickHandler);
}

/* create new card */
function createCard(elementData) {
    const newElement = new Card(elementData, elementTemplate, showImage)
    return newElement.createElement();
}

/* add new card to the beginning of the cards list */
function addCard(elementData) {
    const newCard = createCard(elementData);
    elementsContainer.prepend(newCard);
}

/* create initial cards */
function createInitCards(initCardsList) {
    initCardsList.forEach(({ link, name }) => {
        addCard({
            link: link,
            name: name
        });
    })
}

createInitCards(initialCards);

function showImage(elementData) {
    showPopup(popupImage);
    imageDescription.textContent = elementData.name;
    image.src = elementData.link;
    image.alt = `Фотография: ${elementData.name}.`;
}

/* submit handlers */
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup(popupProfile);
}

function handleFormSubmitAddCard(evt) {
    evt.preventDefault();
    const elementData = {
        name: cardName.value,
        link: cardLink.value
    }
    addCard(elementData);
    closePopup(popupAddCard);
    evt.target.reset();
    evt.submitter.classList.add('popup__submit-button_disabled');
    evt.submitter.disabled = true;
}

/* escape handler */
function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_active');
        closePopup(popupActive);
    }
}

function clickHandler(evt) {
    if (evt.target.classList.contains('popup_active')) {
        closePopup(evt.target);
    }
}

/* enable validation */
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

/*event listeners*/

popupList.forEach(popup => popup.addEventListener('mousedown', clickHandler));

/* listeners for buttons */
buttonEdit.addEventListener('click', showPopupProfile);

buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup));
})

buttonAdd.addEventListener('click', () => showPopup(popupAddCard));
/* submit listeners */
formProfile.addEventListener('submit', handleFormSubmitProfile);
formAddCard.addEventListener('submit', handleFormSubmitAddCard);