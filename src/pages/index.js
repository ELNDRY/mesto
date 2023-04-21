import {
    validationSettings,
    buttonEdit,
    buttonAdd,
    popupAddCardSelector,
    popupProfileSelector,
    popupImageSelector,
    profileNameSelector,
    profileJobSelector,
    cardsContainerSelector,
    cardTemplate,
    profileNameInput,
    profileDescriptionInput,
    apiOptions,
    popupConfirmSelector,
    profileAvatarSelector,
    popupEditAvatarSelector,
    overlayAvatar,
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

/* user info initialization */
const userInfo = new UserInfo({ profileNameSelector, profileJobSelector, profileAvatarSelector });
const formValidators = {}
/* form validators initialization and enable validation */
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(`${config.formSelector}:not(.popup__form_confirm)`))
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        // get data from the `name` attribute of the form
        const formName = formElement.getAttribute('name');
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(validationSettings);

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

/* submit handlers */
/* universal function that accepts a request function and a popup instance */
function handleSubmit(request, popupInstance) {
    popupInstance.renderSubmitText(true);
    request()
        .then(() => {
            popupInstance.close()
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupInstance.renderSubmitText(false);
        });
}

const handleFormSubmitProfile = (userData) => {
    function makeRequest() {
        return api.editUserInfo(userData)
            .then((userData) => {
                userInfo.setUserInfo(userData);
            });
    }

    handleSubmit(makeRequest, popupEditProfile);
}

const handleFormSubmitAddCard = (cardData) => {
    function makeRequest() {
        return api.addCard(cardData)
            .then((data) => {
                cardsContainer.addItem(data)
            })
    }

    handleSubmit(makeRequest, popupAddCard);
}

const handleFormSubmitEditAvatar = (avatar) => {
    function makeRequest() {
        return api.editUserAvatar(avatar)
            .then((data) => {
                userInfo.setUserAvatar(data)
            })
    }

    handleSubmit(makeRequest, popupEditAvatar);
}

const handleConfirm = (card) => {
    api.deleteCard(card._data._id)
        .then(() => {
            card.delete();
            popupWithConfirmation.close();
        })
        .catch((error) => console.log(error))
}

/* buttons listeners */
buttonEdit.addEventListener('click', () => {
    console.log(userInfo.getUserInfo());
    popupEditProfile.open(userInfo.getUserInfo());
});
buttonAdd.addEventListener('click', () => popupAddCard.open());
overlayAvatar.addEventListener('click', () => popupEditAvatar.open());

/* popups initialization */
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

const popupEditProfile = new PopupWithForms(popupProfileSelector, handleFormSubmitProfile, () => formValidators['edit-profile'].resetForm());
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForms(popupAddCardSelector, handleFormSubmitAddCard, () => formValidators['add-card'].resetForm());
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForms(popupEditAvatarSelector, handleFormSubmitEditAvatar, () => formValidators['edit-avatar'].resetForm());
popupEditAvatar.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(popupConfirmSelector, handleConfirm);
popupWithConfirmation.setEventListeners();

const cardsContainer = new Section(createCard, cardsContainerSelector);

/* receiving user's info and cards from the server */
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, initialCards]) => {
        userInfo.setUserInfo(info);
        userInfo.setUserAvatar(info);
        cardsContainer.renderItems(initialCards);
    })
    .catch(error => console.log(error));