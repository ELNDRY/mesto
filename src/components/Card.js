export class Card {
    constructor(elementData, elementTemplate, handleCardClick) {
        this._elementTemplate = elementTemplate;
        this._handleCardClick = handleCardClick;
        this._data = elementData;
    }

    createElement() {
        this._element = document.querySelector(this._elementTemplate).content.querySelector('.element').cloneNode(true);
        this._element.querySelector('.element__text').textContent = this._data.name;
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._data.link;
        this._image.alt = `Фотография: ${this._data.name}.`;
        this._buttonLike = this._element.querySelector('.element__like');
        this._buttonDelete = this._element.querySelector('.element__delete');
        this._addEventListeners();

        return this._element;
    }

    _addEventListeners() {
        this._buttonLike.addEventListener('click', () => this._likeElement())
        this._buttonDelete.addEventListener('click', () => this._deleteElement());
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._data);
        })
    }

    _likeElement() {
        this._buttonLike.classList.toggle('element__like_active');
    }

    _deleteElement() {
        this._element.remove();
    }
}