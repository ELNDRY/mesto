export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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

/* popups selectors */
export const popupProfileSelector ='.popup_type_profile';
export const popupAddCardSelector = '.popup_type_add-card';
export const popupImageSelector = '.popup_type_image';

/* for already existing profile name and description */
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__description';

export const profileNameInput = document.querySelector('.popup__input_type_name');
export const profileDescriptionInput = document.querySelector('.popup__input_type_description');

/* forms selectors */
export const formProfileSelector = '.popup__form_profile';
export const formAddCardSelector = '.popup__form_add-card';

/* cards selectors */
export const cardsContainerSelector = '.elements__list';
export const cardTemplate = '#element-template';

