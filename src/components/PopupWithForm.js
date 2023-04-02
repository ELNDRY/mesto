import { Popup } from "./Popup";

export class PopupWithForms extends Popup {
    constructor(popupSelector, handleFormSubmit, resetForm) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._resetForm = resetForm;
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValues = {}
        this._inputList.forEach(input => {
            return this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => this._handleFormSubmit(evt, this._getInputValues()));
    }

    reset() {
        this._formElement.reset();
    }

    close() {
        super.close();
        this._resetForm();
    }
}