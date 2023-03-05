export class Card {
    constructor(elementData, elementTemplate, showImage) {
        this._name = elementData.name;
        this._link = elementData.link;
        this._elementTemplate = elementTemplate;
        this._showImage = showImage;
        this._data = elementData;
    }

    createElement() {
        this._element = this._elementTemplate.cloneNode(true);
        this._element.querySelector('.element__text').textContent = this._name;
        // поправить кучу пробегов до селектора картинки 
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._link;
        this._image.alt = `Фотография: ${this._name}.`;
        this._buttonLike = this._element.querySelector('.element__like');
        this._buttonDelete = this._element.querySelector('.element__delete');
        this._addEventListeners();

        return this._element;
    }

    _addEventListeners() {
        this._buttonLike.addEventListener('click', () => this._likeElement())
        this._buttonDelete.addEventListener('click', () => this._deleteElement());
        this._image.addEventListener('click', () => {
            this._showImage(this._data);
        })
    }

    _likeElement() {
        this._buttonLike.classList.toggle('element__like_active');
    }

    _deleteElement() {
        this._element.remove();
    }
}