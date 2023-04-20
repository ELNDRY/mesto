import { Popup } from "./Popup";

export class PopupWithForms extends Popup {
    constructor(popupSelector, handleFormSubmit, resetForm) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._resetForm = resetForm;
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._submitButton = this._formElement.querySelector('.popup__submit-button');
        this._initButtonText = this._submitButton.textContent;
    }

    _getInputValues() {
        const inputValues = {}
        this._inputList.forEach(input => {
            return inputValues[input.name] = input.value;
        });
        return inputValues;
    }


    renderSubmitText(isSubmiting) {
        if (isSubmiting) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._initButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._formElement.reset();
        this._resetForm();
    }
}