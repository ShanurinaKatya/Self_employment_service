export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3" style="width: 90%; max-width: 1200px; margin: 20px auto;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.src}" class="img-fluid rounded-start" alt="картинка" style="height: 100%; object-fit: cover;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                            <hr>
                            <ul class="list-unstyled">
                                <li><strong>Результат:</strong> ${data.result}</li>
                                <li><strong>Срок:</strong> ${data.term}</li>
                                <li><strong>Цена:</strong> ${data.price}</li>
                                <li><strong>Документы:</strong> ${data.documents}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
    }
}
