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
    toggleButtonState(validationSettings, inputList, buttonSubmit);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(validationSettings, formElement, inputElement);
            toggleButtonState(validationSettings, inputList, buttonSubmit);
        });
    });
};

/* show and hide input error */
function showInputError(validationSettings, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

function hideInputError(validationSettings, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationSettings.errorClass);
};

/*  show and hide input error if based on it's validity */
function checkInputValidity(validationSettings, formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(validationSettings, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(validationSettings, formElement, inputElement);
    }
};

/* check inputs field validity - return true if any input is invalid */
function hasInvalidInput(inputList) {
    return (inputList.some((inputElement) => !inputElement.validity.valid));
};

/* change button activity and appearance */
function toggleButtonState(validationSettings, inputList, buttonElement) {

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

enableValidation(validationSettings);
