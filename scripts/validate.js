/* validation config */
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_visible'
};

/* get form list and send it to the from handler */
function enableValidation(validationSettings) {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(validationSettings, formElement);

    });
};

function setEventListeners(validationSettings, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonSubmit = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(validationSettings.inactiveButtonClass, inputList, buttonSubmit);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(validationSettings.inputErrorClass, validationSettings.errorClass, formElement, inputElement);
            toggleButtonState(validationSettings.inactiveButtonClass, inputList, buttonSubmit);
        });
    });
};

/* show and hide input error */
function showInputError(inputErrorClass, errorClass, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

function hideInputError(inputErrorClass, errorClass, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

/*  show and hide input error if based on it's validity */
function checkInputValidity(inputErrorClass, errorClass, formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(inputErrorClass, errorClass, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(inputErrorClass, errorClass, formElement, inputElement);
    }
};

/* check inputs field validity - return true if any input is invalid */
function hasInvalidInput(inputList) {
    return (inputList.some((inputElement) => !inputElement.validity.valid));
};

/* change button activity and appearance */
function toggleButtonState(inactiveButtonClass, inputList, buttonElement) {

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

enableValidation(validationSettings);
