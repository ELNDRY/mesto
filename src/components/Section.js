export class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
        const rendered = this._renderer(item)
        this._container.prepend(rendered);
    }

    renderItems(items) {
        this._container.innerHTML = '';
        items.forEach(item => this.addItem(item));
    }
}