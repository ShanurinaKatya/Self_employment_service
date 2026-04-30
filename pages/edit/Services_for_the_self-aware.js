import { BackButtonComponent } from "../../components/back-button/BackButtonComponent.js";
import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";
import { MainPage } from "../main/Services_for_the_self-aware.js";

export class EditPage {
    constructor(parent, service) {
        this.parent = parent;
        this.service = service;
        this.isEdit = !!service;
    }

    get pageRoot() {
        return document.getElementById('edit-page');
    }

    getHTML() {
        return `<div id="edit-page"></div>`;
    }

    onSave() {
        const title = document.getElementById('edit-title').value;
        const text = document.getElementById('edit-text').value;
        const src = document.getElementById('edit-src').value;
        const badge = document.getElementById('edit-badge').value;
        const result = document.getElementById('edit-result').value;
        const term = document.getElementById('edit-term').value;
        const price = document.getElementById('edit-price').value;
        const documents = document.getElementById('edit-documents').value;

        const data = {
            title,
            text,
            src,
            badge: badge || null,
            result,
            term,
            price,
            documents
        };

        if (this.isEdit) {
            ajax.patch(selfAwareUrls.getServiceById(this.service.id), data, (response, status) => {
                if (status === 200) {
                    new MainPage(this.parent).render();
                } else {
                    console.error('Failed to update:', status);
                }
            });
        } else {
            ajax.post(selfAwareUrls.createService(), data, (response, status) => {
                if (status === 201 || status === 200) {
                    new MainPage(this.parent).render();
                } else {
                    console.error('Failed to create:', status);
                }
            });
        }
    }

    onBack() {
        new MainPage(this.parent).render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.onBack.bind(this));

        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '90%';
        card.style.maxWidth = '800px';
        card.style.margin = '20px auto';

        const title = this.isEdit ? 'Редактирование услуги' : 'Добавление услуги';

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <form id="edit-form">
                    <div class="mb-3">
                        <label class="form-label">Название</label>
                        <input type="text" class="form-control" id="edit-title" value="${this.service ? this.service.title || '' : ''}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea class="form-control" id="edit-text" rows="2">${this.service ? this.service.text || '' : ''}</textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">URL изображения</label>
                        <input type="text" class="form-control" id="edit-src" value="${this.service ? this.service.src || '' : ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Бейдж (необязательно)</label>
                        <input type="text" class="form-control" id="edit-badge" value="${this.service ? this.service.badge || '' : ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Результат</label>
                        <input type="text" class="form-control" id="edit-result" value="${this.service ? this.service.result || '' : ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Срок</label>
                        <input type="text" class="form-control" id="edit-term" value="${this.service ? this.service.term || '' : ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Цена</label>
                        <input type="text" class="form-control" id="edit-price" value="${this.service ? this.service.price || '' : ''}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Документы</label>
                        <input type="text" class="form-control" id="edit-documents" value="${this.service ? this.service.documents || '' : ''}">
                    </div>
                    <button type="submit" class="btn btn-primary">Сохранить</button>
                </form>
            </div>
        `;

        this.pageRoot.appendChild(card);

        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.onSave();
        });
    }
}