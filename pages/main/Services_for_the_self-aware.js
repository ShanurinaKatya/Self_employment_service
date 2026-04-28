import { ProductCardComponent } from "../../components/product-card/Services_for_the_self-aware.js";
import { ProductPage } from "../product/Services_for_the_self-aware.js";
import { AddButtonComponent } from "../../components/add-button/Services_for_the_self-aware.js";
import { SearchButtonComponent } from "../../components/search-button/Services_for_the_self-aware.js";
import { ResetButtonComponent } from "../../components/reset-button/Services_for_the_self-aware.js";
import { removeValues, merge } from "../../utils/Services_for_the_self-aware.js";
import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.services = []; // Теперь данные придут из API
        this.filterText = "";
    }

    getData() {
        ajax.get(selfAwareUrls.getServices(), (data) => {
            this.services = data || [];
            this.render();
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

    // ТВОЯ ФУНКЦИЯ КОПИРОВАНИЯ (теперь с сохранением в API)
    addCopyOfFirst() {
        if (this.services.length === 0) return;
        const first = this.services[0];
        const secondService = this.services[1];
        const extraBadge = secondService && secondService.badge ? { badge: secondService.badge } : {};

        // Создаем копию без ID (сервер сам назначит новый ID)
        const { id, ...dataWithoutId } = first;
        const copy = merge(dataWithoutId, extraBadge);

        // Отправляем на бэкенд
        ajax.post(selfAwareUrls.createService(), copy, () => {
            this.getData(); // Обновляем список после добавления
        });
    }

    deleteService(id) {
        ajax.delete(selfAwareUrls.removeServiceById(id), () => {
            this.getData(); // Обновляем список после удаления
        });
    }

    render() {
        this.parent.innerHTML = '';
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'main-controls';
        controlsDiv.style.marginBottom = '24px';

        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.marginBottom = '16px';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-input';
        searchInput.placeholder = 'Поиск...';
        searchInput.value = this.filterText;
        searchInput.style.flex = '1';
        buttonsRow.appendChild(searchInput);

        new SearchButtonComponent(buttonsRow, () => {
            this.filterText = document.getElementById('search-input').value;
            this.render();
        }).render();

        new ResetButtonComponent(buttonsRow, () => {
            this.filterText = '';
            this.render();
        }).render();

        // Кнопка копирования первой карточки
        new AddButtonComponent(buttonsRow, this.addCopyOfFirst.bind(this)).render();

        const gridDiv = document.createElement('div');
        gridDiv.id = 'main-page';
        gridDiv.className = 'services-grid';

        this.parent.appendChild(controlsDiv);
        controlsDiv.appendChild(buttonsRow);
        this.parent.appendChild(gridDiv);

        this.getFilteredServices().forEach(service => {
            const card = new ProductCardComponent(gridDiv);
            card.render(
                service,
                () => new ProductPage(this.parent, service.id).render(),
                (id) => this.deleteService(id)
            );
        });
    }
}
