import {
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
    apiOptions,
    popupConfirmSelector,
    profileAvatarSelector,
    popupEditAvatarSelector,
    overlayAvatar,
    formEditAvatarSelector
} from "../utils/constants.js";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForms } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "./index.css";

const api = new Api(apiOptions);
const userInfo = new UserInfo({ profileNameSelector, profileJobSelector, profileAvatarSelector });
const formProfileValidator = new FormValidator(validationSettings, formProfileSelector);
const formAddCardValidator = new FormValidator(validationSettings, formAddCardSelector);
const formEditAvatarValidator = new FormValidator(validationSettings, formEditAvatarSelector);

/* create new card */
const createCard = (cardData) => {
    const userData = userInfo.getUserId();
    const newElement = new Card(cardData,
        userData,
        cardTemplate,
        () => popupWithImage.open(cardData),
        deleteCard,
        likeCard);
        return newElement.createElement();
}

const deleteCard = (card) => {
    popupWithConfirmation.open(card);
};

const likeCard = (card) => {
    if (card.isLiked()) {
        api.deleteLike(card._data._id)
            .then((data) => card.likeElement(data.likes))
            .catch((error) => console.log(error));
    } else {
        api.addLike(card._data._id)
            .then((data) => card.likeElement(data.likes))
            .catch((error) => console.log(error));
    }
}


const resetProfileForm = () => {
    formProfileValidator.resetForm();
}

const resetAddCardForm = () => {
    formAddCardValidator.resetForm();
}

const resetEditAvatarForm = () => {
    formEditAvatarValidator.resetForm();
}

/* submit handlers */
const handleFormSubmitProfile = (userData) => {
    popupEditProfile.renderSubmitText(true);
    api.editUserInfo(userData)
        .then((userData) => {
            userInfo.setUserInfo(userData);
            popupEditProfile.close();
        })
        .catch((error) => console.log(error))
        .finally(() => popupEditProfile.renderSubmitText(false));
}

const handleFormSubmitAddCard = (cardData) => {
    popupAddCard.renderSubmitText(true);
    api.addCard(cardData)
        .then((data) => {
            cardsContainer.addItem(data)
            popupAddCard.close();
        })
        .catch((error) => console.log(error))
        .finally(() => popupAddCard.renderSubmitText(false));
}

const handleFormSubmitEditAvatar = (avatar) => {
    popupEditAvatar.renderSubmitText(true);
    api.editUserAvatar(avatar)
        .then((data) => {
            userInfo.setUserAvatar(data)
            popupEditAvatar.close();
        })
        .catch((error) => console.log(error))
        .finally(() => popupEditAvatar.renderSubmitText(false));
}

const handleConfirm = (card) => {
    api.deleteCard(card._data._id)
        .then(() => {
            card.delete();
            popupWithConfirmation.close();
        })
        .catch((error) => console.log(error))
}


function fillProfileInfo() {
    const inputsValue = userInfo.getUserInfo();
    profileNameInput.value = inputsValue.name;
    profileDescriptionInput.value = inputsValue.job;
}


/* enable validation */
formProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formEditAvatarValidator.enableValidation();


/* buttons listeners */
buttonEdit.addEventListener('click', () => {
    popupEditProfile.open();
    fillProfileInfo()
});

buttonAdd.addEventListener('click', () => popupAddCard.open());

overlayAvatar.addEventListener('click', () => popupEditAvatar.open());

const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForms(popupProfileSelector, handleFormSubmitProfile, resetProfileForm);
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForms(popupAddCardSelector, handleFormSubmitAddCard, resetAddCardForm);
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForms(popupEditAvatarSelector, handleFormSubmitEditAvatar, resetEditAvatarForm);
popupEditAvatar.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(popupConfirmSelector, handleConfirm);
popupWithConfirmation.setEventListeners();

/* create initial cards */
const cardsContainer = new Section(createCard, cardsContainerSelector);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, initialCards]) => {
        userInfo.setUserInfo(info);
        userInfo.setUserAvatar(info);
        cardsContainer.renderItems(initialCards);
    })
    .catch(error => console.log(error));