import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";
import { MainPage } from "../main/Services_for_the_self-aware.js";

export class EditPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
        this.serviceData = null;
    }

    get pageRoot() {
        return document.getElementById('edit-page');
    }

    get isEdit() {
        return !!this.id;
    }

    getHTML() {
        return `<div id="edit-page"></div>`;
    }

    showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            border-left: 4px solid ${isError ? '#dc3545' : '#3F68EA'};
        `;
        notification.innerHTML = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    loadServiceData() {
        if (!this.id) return;

        ajax.get(selfAwareUrls.getServiceById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.serviceData = data;
                this.fillForm(data);
            } else {
                this.showNotification('Ошибка загрузки данных услуги', true);
            }
        });
    }

    fillForm(data) {
        document.getElementById('edit-title').value = data.title || '';
        document.getElementById('edit-text').value = data.text || '';
        document.getElementById('edit-src').value = data.src || '';
        document.getElementById('edit-badge').value = data.badge || '';
        document.getElementById('edit-result').value = data.result || '';
        document.getElementById('edit-term').value = data.term || '';
        document.getElementById('edit-price').value = data.price || '';
        document.getElementById('edit-documents').value = data.documents || '';
    }

    getFormData() {
        return {
            title: document.getElementById('edit-title').value,
            text: document.getElementById('edit-text').value,
            src: document.getElementById('edit-src').value,
            badge: document.getElementById('edit-badge').value || null,
            result: document.getElementById('edit-result').value,
            term: document.getElementById('edit-term').value,
            price: document.getElementById('edit-price').value,
            documents: document.getElementById('edit-documents').value
        };
    }

    validateForm(data) {
        if (!data.title) {
            this.showNotification('Введите название услуги', true);
            return false;
        }
        return true;
    }

    createService(formData) {
        ajax.post(selfAwareUrls.createService(), formData, (data, status) => {
            if (status === 201 || status === 200) {
                this.showNotification('Услуга успешно создана!');
                setTimeout(() => {
                    new MainPage(this.parent).render();
                }, 1500);
            } else {
                this.showNotification('Ошибка при создании услуги', true);
            }
        });
    }

    updateService(formData) {
        ajax.patch(selfAwareUrls.updateService(this.id), formData, (data, status) => {
            if (status === 200) {
                this.showNotification('Услуга успешно обновлена!');
                setTimeout(() => {
                    new MainPage(this.parent).render();
                }, 1500);
            } else {
                this.showNotification('Ошибка при обновлении услуги', true);
            }
        });
    }

    onSave() {
        const formData = this.getFormData();
        if (this.validateForm(formData)) {
            if (this.id) {
                this.updateService(formData);
            } else {
                this.createService(formData);
            }
        }
    }

    onBack() {
        new MainPage(this.parent).render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());


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
                        <label class="form-label">Название *</label>
                        <input type="text" class="form-control" id="edit-title" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Описание</label>
                        <textarea class="form-control" id="edit-text" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">URL изображения</label>
                        <input type="text" class="form-control" id="edit-src">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Бейдж</label>
                        <input type="text" class="form-control" id="edit-badge">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Результат</label>
                        <input type="text" class="form-control" id="edit-result">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Срок</label>
                        <input type="text" class="form-control" id="edit-term">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Цена</label>
                        <input type="text" class="form-control" id="edit-price">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Документы</label>
                        <input type="text" class="form-control" id="edit-documents">
                    </div>
                    <div class="d-flex gap-2">
                        <button type="button" id="cancel-button" class="btn btn-secondary">Отмена</button>
                    </div>
                </form>
            </div>
        `;

        this.pageRoot.appendChild(card);

        document.getElementById('edit-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.onSave();
        });

        document.getElementById('cancel-button').addEventListener('click', () => {
            this.onBack();
        });

        if (this.id) {
            this.loadServiceData();
        }
    }
}