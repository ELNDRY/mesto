export class Card {
    constructor(elementData, userId,  elementTemplate, handleCardClick, handleCardDelete, handleCardLike) {
        this._elementTemplate = elementTemplate;
        this._handleCardClick = handleCardClick;
        this._handleCardLike = handleCardLike;
        this._handleCardDelete = handleCardDelete;
        this._data = elementData;
        this._userId = userId;
        this._ownerId = this._data.owner._id;
    }

    _addElement() {
        return document.querySelector(this._elementTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _addEventListeners() {
        this._buttonLike.addEventListener('click', () => this._handleCardLike(this))
        this._buttonDelete.addEventListener('click', () => this._handleCardDelete(this));
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._data);
        })
    }

    likeElement(likes) {
        this._data.likes = likes;
        this._likeCounter.textContent = this._data.likes.length;
        if (this.isLiked()) {
            this._buttonLike.classList.add('element__like_active');
        } else {
            this._buttonLike.classList.remove('element__like_active');
        }
    }

    delete() {
        this._element.remove();
        this._element = null;
    }

    createElement() {
        this._element = this._addElement();
        this._element.querySelector('.element__text').textContent = this._data.name;
        this._image = this._element.querySelector('.element__image');
        this._image.src = this._data.link;
        this._image.alt = `Фотография: ${this._data.name}.`;
        this._buttonLike = this._element.querySelector('.element__like');
        this._buttonDelete = this._element.querySelector('.element__delete');
        this._likeCounter = this._element.querySelector('.element__counter');
        this._likeCounter.textContent = this._data.likes.length;

        if (!this.isOwned()) {
            this._buttonDelete.classList.add('element__delete_hidden');
        }

        if (this.isLiked()) {
            this._buttonLike.classList.add('element__like_active');
        } else {
            this._buttonLike.classList.remove('element__like_active');
        }
        this._addEventListeners();

        return this._element;
    }

    isOwned() {
        return this._userId === this._ownerId
    }

    isLiked() {
        return this._data.likes.some((user) => user._id === this._userId);
    }

}
