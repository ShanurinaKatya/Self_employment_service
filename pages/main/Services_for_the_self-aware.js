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

    getData() {
        ajax.get(selfAwareUrls.getServices(), (data, status) => {
            if (status === 200 && data) {
                this.services = Array.isArray(data) ? data : [];
                this.render();
            } else {
                console.error('Failed to load services:', status);
            }
        });
    }

    deleteService(id) {
        ajax.delete(selfAwareUrls.removeServiceById(id), (data, status) => {
            if (status === 200 || status === 204) {
                this.services = this.services.filter(s => s.id !== id);
                this.render();
            } else {
                console.error('Failed to delete service:', status);
            }
        });
    }

    getFilteredServices() {
        if (!this.filterText.trim()) return this.services;
        const lowerFilter = this.filterText.toLowerCase();
        return this.services.filter(s => s.title.toLowerCase().includes(lowerFilter) || s.text.toLowerCase().includes(lowerFilter));
    }

    onDetailClick(cardId) {
        new ProductPage(this.parent, cardId).render();
    }

    onEditClick(cardId) {
        const service = this.services.find(s => s.id === cardId);
        new EditPage(this.parent, service).render();
    }

    onDeleteClick(cardId) {
        this.deleteService(cardId);
    }

    onAddClick() {
        new EditPage(this.parent, null).render();
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
        const gridDiv = document.getElementById('main-page');
        if (gridDiv) {
            gridDiv.innerHTML = '';
            this.getFilteredServices().forEach(service => {
                const card = new ProductCardComponent(gridDiv);
                card.render(
                    service,
                    () => this.onDetailClick(service.id),
                    (id) => this.onEditClick(id),
                    (id) => this.onDeleteClick(id)
                );
            });
        }
    }

    render() {
        this.parent.innerHTML = '';

        const controlsDiv = document.createElement('div');
        controlsDiv.style.marginBottom = '24px';
        controlsDiv.className = 'main-controls';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-input';
        searchInput.placeholder = 'Поиск по названию или описанию...';
        searchInput.style.borderRadius = '40px';
        searchInput.style.padding = '10px 20px';
        searchInput.style.flex = '1';
        searchInput.value = this.filterText;

        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.marginBottom = '16px';
        buttonsRow.appendChild(searchInput);

        const searchButton = new SearchButtonComponent(buttonsRow, this.onSearchClick.bind(this));
        searchButton.render();

        const resetButton = new ResetButtonComponent(buttonsRow, this.onResetSearchClick.bind(this));
        resetButton.render();

        const addButton = new AddButtonComponent(buttonsRow, this.onAddClick.bind(this));
        addButton.render();

        controlsDiv.appendChild(buttonsRow);

        const gridDiv = document.createElement('div');
        gridDiv.id = 'main-page';
        gridDiv.className = 'services-grid';

        this.parent.appendChild(controlsDiv);
        this.parent.appendChild(gridDiv);

        this.getData();
    }
}
