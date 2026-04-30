export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const badgeHtml = data.badge ? `<div class="card-badge">${data.badge}</div>` : '';
        return `
            <div class="card d-flex flex-column" style="width: 100%; height: 100%; margin: 0; position: relative;">
                ${badgeHtml}
                <img class="card-img-top" src="${data.src}" alt="картинка" style="height: 140px; object-fit: cover; background: #f0f0f0;">
                <div class="card-body d-flex flex-column flex-grow-1">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text flex-grow-1">${data.text}</p>
                    <div class="d-flex justify-content-between gap-2 mt-3">
                        <button class="btn btn-primary flex-grow-1" id="detail-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        <button class="btn btn-warning flex-grow-1" id="edit-card-${data.id}" data-id="${data.id}">Редактировать</button>
                        <button class="btn btn-outline-danger flex-grow-1" id="delete-card-${data.id}" data-id="${data.id}">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, onDetail, onEdit, onDelete) {
        document
            .getElementById(`detail-card-${data.id}`)
            .addEventListener("click", onDetail);
        document
            .getElementById(`edit-card-${data.id}`)
            .addEventListener("click", () => onEdit(data.id));
        document
            .getElementById(`delete-card-${data.id}`)
            .addEventListener("click", () => onDelete(data.id));
    }

    render(data, onDetail, onEdit, onDelete) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, onDetail, onEdit, onDelete);
    }
}
