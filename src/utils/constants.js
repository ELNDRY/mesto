export const apiOptions = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        authorization: 'b7b03174-bbfa-4035-a313-c9d956a938c1',
        'Content-Type': 'application/json',
    }
}

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_visible'
};

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const overlayAvatar = document.querySelector('.profile__avatar-overlay');

/* popups selectors */
export const popupProfileSelector = '.popup_type_profile';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupImageSelector = '.popup_type_image';
export const popupConfirmSelector = '.popup_type_confirm';
export const popupEditAvatarSelector = '.popup_type_avatar';

/* for already existing profile name and description */
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__description';
export const profileAvatarSelector = '.profile__avatar';

export const profileNameInput = document.querySelector('.popup__input_type_name');
export const profileDescriptionInput = document.querySelector('.popup__input_type_description');

/* cards selectors */
export const cardsContainerSelector = '.elements__list';
export const cardTemplate = '#element-template';

