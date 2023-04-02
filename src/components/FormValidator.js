export class FormValidator {
    constructor(validationSettings, formElement) {
        this._validationSettings = validationSettings;
        this._formElement = document.querySelector(formElement);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    };

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };


    _setErrorMessage(inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        this._errorElement.textContent = errorMessage;
        console.log(this._errorElement);
    };

    /* show and hide input error */
    _showInputError(inputElement) {
        inputElement.classList.add(this._validationSettings.inputErrorClass);
        this._setErrorMessage(inputElement, inputElement.validationMessage)
    };

    _hideInputError(inputElement) {
        console.log(inputElement);
        inputElement.classList.remove(this._validationSettings.inputErrorClass);
        this._setErrorMessage(inputElement, '');
    };

    /*  show and hide input error if based on it's validity */
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    /* check inputs field validity - return true if any input is invalid */
    _hasInvalidInput() {
        return (this._inputList.some((inputElement) => !inputElement.validity.valid));
    };

    _disableButton() {
        this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableButton() {
        this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    resetForm() {
        this._inputList.forEach(inputElement => this._hideInputError(inputElement));
        this._disableButton();
    }

    /* change button activity and appearance */
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        }
    };
}