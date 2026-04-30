import { ProductCardComponent } from "../../components/product-card/Services_for_the_self-aware.js";
import { ProductPage } from "../product/Services_for_the_self-aware.js";
import { EditPage } from "../edit/Services_for_the_self-aware.js";
import { AddButtonComponent } from "../../components/add-button/Services_for_the_self-aware.js";
import { AddNewButtonComponent } from "../../components/add-button/AddNewButtonComponent.js";
import { SearchButtonComponent } from "../../components/search-button/Services_for_the_self-aware.js";
import { ResetButtonComponent } from "../../components/reset-button/Services_for_the_self-aware.js";
import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";
import { merge } from "../../utils/Services_for_the_self-aware.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.services = [];
        this.filterText = "";
    }

    get servicesContainer() {
        return document.getElementById('main-page');
    }

    showNotification(message, isError = false) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 400px;
            font-family: system-ui, sans-serif;
            font-size: 14px;
            border-left: 4px solid ${isError ? '#dc3545' : '#3F68EA'};
            animation: slideInRight 0.3s ease-out;
        `;
        notification.innerHTML = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getData() {
        ajax.get(selfAwareUrls.getServices(), (data, status) => {
            if (status === 200 && data && Array.isArray(data)) {
                this.services = data;
                this.renderCards();
            } else {
                this.showNotification('Ошибка загрузки услуг!', true);
                this.servicesContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">Ошибка загрузки данных с сервера</div>
                    </div>
                `;
            }
        });
    }

    deleteService(id) {
        ajax.delete(selfAwareUrls.removeServiceById(id), (data, status) => {
            if (status === 200 || status === 204) {
                this.showNotification('Услуга удалена');
                this.getData();
            } else {
                this.showNotification('Ошибка при удалении услуги', true);
            }
        });
    }

    getFilteredServices() {
        if (!this.filterText.trim()) return this.services;
        const lowerFilter = this.filterText.toLowerCase();
        return this.services.filter(s => 
            s.title.toLowerCase().includes(lowerFilter) || 
            s.text.toLowerCase().includes(lowerFilter)
        );
    }

    addCopyOfFirst() {
        if (this.services.length === 0) return;
        const first = this.services[0];
        const secondService = this.services[1];
        const extraBadge = secondService && secondService.badge ? { badge: secondService.badge } : {};
        const copy = merge({ id: Date.now() }, first, extraBadge);

        const data = {
            title: copy.title,
            text: copy.text,
            src: copy.src,
            badge: copy.badge || null,
            result: copy.result || "",
            term: copy.term || "",
            price: copy.price || "",
            documents: copy.documents || ""
        };

        ajax.post(selfAwareUrls.createService(), data, (response, status) => {
            if (status === 201 || status === 200) {
                this.showNotification(`Добавлена услуга: ${response.title}`);
                this.getData();
            } else {
                this.showNotification('Ошибка при добавлении услуги', true);
            }
        });
    }

    onDetailClick(cardId) {
        new ProductPage(this.parent, cardId).render();
    }

    onEditClick(cardId) {
        const service = this.services.find(s => s.id === cardId);
        new EditPage(this.parent, service ? service.id : null).render();
    }

    onDeleteClick(cardId) {
        this.deleteService(cardId);
    }

    onAddClick() {
        new EditPage(this.parent, null).render();
    }

    onAddCopyClick() {
        this.addCopyOfFirst();
    }

    onSearchClick() {
        const searchInput = document.getElementById('search-input');
        this.filterText = searchInput.value;
        this.renderCards();
    }

    onResetSearchClick() {
        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
        this.filterText = '';
        this.renderCards();
    }

    renderCards() {
        const container = this.servicesContainer;
        if (!container) return;
        container.innerHTML = '';
        const filteredServices = this.getFilteredServices();

        if (filteredServices.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">Услуг не найдено. Добавьте первую услугу!</div>
                </div>
            `;
            return;
        }

        filteredServices.forEach(service => {
            const card = new ProductCardComponent(container);
            card.render(
                service,
                () => this.onDetailClick(service.id),
                (id) => this.onEditClick(id),
                (id) => this.onDeleteClick(id)
            );
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.setupEventListeners();
        this.getData();
    }

    getHTML() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-input';
        searchInput.placeholder = 'Поиск по названию или описанию...';
        searchInput.style.borderRadius = '48px';
        searchInput.style.padding = '12px 20px';
        searchInput.style.fontSize = '16px';
        searchInput.style.flex = '1';
        searchInput.style.border = '1px solid #ced4da';
        searchInput.style.outline = 'none';
        searchInput.style.background = 'white';

        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.display = 'flex';
        buttonsDiv.style.gap = '8px';
        buttonsDiv.style.marginBottom = '16px';
        buttonsDiv.appendChild(searchInput);

        const searchButton = new SearchButtonComponent(buttonsDiv, this.onSearchClick.bind(this));
        searchButton.render();

        const resetButton = new ResetButtonComponent(buttonsDiv, this.onResetSearchClick.bind(this));
        resetButton.render();

        const addCopyButton = new AddButtonComponent(buttonsDiv, this.onAddCopyClick.bind(this));
        addCopyButton.render();

        const addNewButton = new AddNewButtonComponent(buttonsDiv, this.onAddClick.bind(this));
        addNewButton.render();

        const controlsDiv = document.createElement('div');
        controlsDiv.style.marginBottom = '24px';
        controlsDiv.className = 'main-controls';
        controlsDiv.appendChild(buttonsDiv);

        const gridDiv = document.createElement('div');
        gridDiv.id = 'main-page';
        gridDiv.className = 'services-grid';

        return { controlsDiv, gridDiv };
    }

    render() {
        this.parent.innerHTML = '';
        const { controlsDiv, gridDiv } = this.getHTML();
        this.parent.appendChild(controlsDiv);
        this.parent.appendChild(gridDiv);
        this.getData();
    }
}