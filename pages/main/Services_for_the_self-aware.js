import { ProductCardComponent } from "../../components/product-card/Services_for_the_self-aware.js";
import { ProductPage } from "../product/Services_for_the_self-aware.js";
import { EditPage } from "../edit/Services_for_the_self-aware.js";
import { AddButtonComponent } from "../../components/add-button/Services_for_the_self-aware.js";
import { SearchButtonComponent } from "../../components/search-button/Services_for_the_self-aware.js";
import { ResetButtonComponent } from "../../components/reset-button/Services_for_the_self-aware.js";
import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";

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

    async getData() {
        try {
            const data = await ajax.get(selfAwareUrls.getServices());
            if (data && Array.isArray(data)) {
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
        } catch (error) {
            this.showNotification('Ошибка загрузки услуг!', true);
            this.servicesContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-danger">Ошибка загрузки данных с сервера</div>
                </div>
            `;
        }
    }

    async deleteService(id) {
        try {
            await ajax.delete(selfAwareUrls.removeServiceById(id));
            this.showNotification('Услуга удалена');
            this.getData();
        } catch (error) {
            this.showNotification('Ошибка при удалении услуги', true);
        }
    }

    getFilteredServices() {
        if (!this.filterText.trim()) return this.services;
        const lowerFilter = this.filterText.toLowerCase();
        return this.services.filter(s => 
            s.title.toLowerCase().includes(lowerFilter) || 
            s.text.toLowerCase().includes(lowerFilter)
        );
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


    async onSearchClick() {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        
        if (!query) {
            this.getData();
            return;
        }
        
        try {
            const data = await ajax.get(selfAwareUrls.searchServices(query));
            if (Array.isArray(data)) {
                this.services = data;
                this.filterText = query;
                this.renderCards();
            } else {
                this.showNotification('Ошибка поиска', true);
                this.getData();
            }
        } catch (error) {
            this.showNotification('Ошибка поиска', true);
            this.getData();
        }
    }


    onResetSearchClick() {
        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
        this.filterText = '';
        this.getData();
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


        const addNewButton = new AddButtonComponent(buttonsDiv, this.onAddClick.bind(this));
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