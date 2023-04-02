import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector('.img-figure__image');
        this._textElement = this._popupElement.querySelector('.img-figure__description');
    }

    open(cardData) {
        console.log(this._popupElement)
        this._textElement.textContent = cardData.name;
        this._imageElement.src = cardData.link;
        this._imageElement.alt = `Фотография: ${cardData.name}.`;
        super.open();
    }
}