import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
    }

    open(card) {
        this._card = card;
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._card);
        })
    }
}