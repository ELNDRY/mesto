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
    profileDescriptionInput,
    apiOptions
} from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForms } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "./index.css";

const api = new Api(apiOptions);

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
}

const resetAddCardForm = () => {
    formAddCardValidator.resetForm();
}

/* submit handlers */
const handleFormSubmitProfile = (userData) => {
    userInfo.setUserInfo(userData)
}

const handleFormSubmitAddCard = (cardData) => {
    createCard(cardData)
}


function fillProfileInfo() {
    const inputsValue = userInfo.getUserInfo();
    profileNameInput.value = inputsValue.name;
    profileDescriptionInput.value = inputsValue.job;
}

/* enable validation */
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();

/* buttons listeners */
buttonEdit.addEventListener('click', () => {
    popupEditProfile.open();
    fillProfileInfo()
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