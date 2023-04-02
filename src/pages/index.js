import { Card } from "../components/Card.js";
import {
    initialCards,
    validationSettings,
    buttonEdit,
    buttonAdd,
    popupAddCardSelector,
    popupProfileSelector,
    popupImageSelector,
    profileNameSelector,
    profileJobSelector,
    formProfileSelector,
    formAddCardSelector,
    cardsContainerSelector,
    cardTemplate,
    profileNameInput,
    profileDescriptionInput
} from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForms } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

import "./index.css";

const profileName = document.querySelector(profileNameSelector);
const profileJob = document.querySelector(profileJobSelector);

const formProfileValidator = new FormValidator(validationSettings, formProfileSelector);
const formAddCardValidator = new FormValidator(validationSettings, formAddCardSelector);

const userInfo = new UserInfo({ profileNameSelector, profileJobSelector });

/* create new card */
const createCard = (cardData) => {
    const newElement = new Card(cardData, cardTemplate, () => popupWithImage.open(cardData));
    cardsContainer.addItem(newElement.createElement());
}

const resetProfileForm = () => {
    formProfileValidator.resetForm();
    popupEditProfile.reset();
}

const resetAddCardForm = () => {
    formAddCardValidator.resetForm();
    popupAddCard.reset();
}

/* submit handlers */
const handleFormSubmitProfile = (evt, userData) => {
    evt.preventDefault();
    userInfo.setUserInfo(userData)
    popupEditProfile.close();
}

const handleFormSubmitAddCard = (evt, cardData) => {
    evt.preventDefault();
    createCard(cardData)
    popupAddCard.close();
}


function getProfileInfo() {
    profileNameInput.value = profileName.textContent;
    profileDescriptionInput.value = profileJob.textContent;
}

/* enable validation */
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

/* buttons listeners */
buttonEdit.addEventListener('click', () => {
    popupEditProfile.open();
    getProfileInfo()
});

buttonAdd.addEventListener('click', () => popupAddCard.open());

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForms(popupProfileSelector, handleFormSubmitProfile, resetProfileForm);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForms(popupAddCardSelector, handleFormSubmitAddCard, resetAddCardForm);
popupAddCard.setEventListeners();

/* create initial cards */
const cardsContainer = new Section({ items: initialCards, renderer: createCard }, cardsContainerSelector);
cardsContainer.renderItems();