export class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleClosePopupByOverlay = this._handleClosePopupByClick.bind(this);
        this._handleClosePopupByEsc = this._handleClosePopupByEsc.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_active');
        document.addEventListener('keydown', this._handleClosePopupByEsc)
    }

    close() {
        this._popupElement.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleClosePopupByEsc);
    }

    _handleClosePopupByClick(evt) {
        if (evt.target.classList.contains('popup__close-cross') || evt.target.classList.contains('popup_active')) {
            this.close();
        }
    }

    /* escape handler */
    _handleClosePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', evt => this._handleClosePopupByClick(evt));
    }

}