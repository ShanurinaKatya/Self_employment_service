import { ProductCardComponent } from "../../components/product-card/Services_for_the_self-aware.js";
import { ProductPage } from "../product/Services_for_the_self-aware.js";
import { AddButtonComponent } from "../../components/add-button/Services_for_the_self-aware.js";
import { SearchButtonComponent } from "../../components/search-button/Services_for_the_self-aware.js";
import { ResetButtonComponent } from "../../components/reset-button/Services_for_the_self-aware.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.services = this.getInitialServices();
        this.filterText = "";
        this.nextId = 6;
    }

    getInitialServices() {
        return [
            { id: 1, src: "https://cdn.gpb.ru/upload/files/iblock/f1c/h5pi4duvqhflhahp95loe4vrdshkptu7/x1_titul_2432x800.jpg", title: "Регистрация в качестве самозанятого", text: "Подача заявки в ФНС, присвоение статуса «плательщик НПД»" },
            { id: 2, src: "https://cdn.gpb.ru/upload/files/iblock/18e/674mzgnqv20xyt6ryxad0t2trazpd3wz/x1_inside_2432x800.jpg", title: "Изменение вида деятельности", text: "Добавление, удаление или замена кодов ОКВЭД/ОКПДТ" },
            { id: 3, src: "https://cdn.gpb.ru/upload/files/iblock/bf2/x53am725mw4hcw3fbvjeqw1h3ypzmmnw/titul_1200x630-_-2024_12_02T124856.085.png", title: "Снятие с учёта самозанятого", text: "Прекращение деятельности в режиме НПД" },
            { id: 4, src: "https://cdn.gpb.ru/upload/files/iblock/b78/9fdyo75ph27322mcx3kla766p54vsgj2/x1_IP.png", title: "Выдача справки о постановке на учёт", text: "Официальный документ из ФНС для банков и заказчиков" },
            { id: 5, src: "https://cdn.gpb.ru/upload/files/iblock/107/skbum8ndum12z2s9s6c9qsyngd6jc5do/x1_titul_2432x800.jpg", title: "Помощь в уплате налога", text: "Проверка начислений, формирование квитанции, контроль оплаты" }
        ];
    }

    getFilteredServices() {
        if (!this.filterText.trim()) return this.services;
        const lowerFilter = this.filterText.toLowerCase();
        return this.services.filter(s => s.title.toLowerCase().includes(lowerFilter) || s.text.toLowerCase().includes(lowerFilter));
    }

    addCopyOfFirst() {
        if (this.services.length === 0) return;
        const first = this.services[0];
        const newId = this.nextId++;
        const copy = { ...first, id: newId };
        this.services.push(copy);
        this.render();
    }

    deleteService(id) {
        this.services = this.services.filter(s => s.id !== id);
        this.render();
    }

    onDetailClick(cardId) {
        new ProductPage(this.parent, cardId).render();
    }

    onDeleteClick(cardId) {
        this.deleteService(cardId);
    }

    onSearchClick() {
        const searchInput = document.getElementById('search-input');
        this.filterText = searchInput.value;
        this.render();
    }

    onResetSearchClick() {
        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
        this.filterText = '';
        this.render();
    }

    onAddCopyClick() {
        this.addCopyOfFirst();
    }

    render() {
        this.parent.innerHTML = '';

        // Создаём контейнер для элементов управления
        const controlsDiv = document.createElement('div');
        controlsDiv.style.marginBottom = '24px';
        controlsDiv.className = 'main-controls';

        // Поле ввода поиска
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.id = 'search-input';
        searchInput.placeholder = 'Поиск по названию или описанию...';
        searchInput.style.borderRadius = '40px';
        searchInput.style.padding = '10px 20px';
        searchInput.style.flex = '1';
        searchInput.value = this.filterText;

        // Контейнер для кнопок (flex)
        const buttonsRow = document.createElement('div');
        buttonsRow.style.display = 'flex';
        buttonsRow.style.gap = '8px';
        buttonsRow.style.marginBottom = '16px';

        // Добавляем поле ввода и кнопки в строку
        buttonsRow.appendChild(searchInput);

        const searchButton = new SearchButtonComponent(buttonsRow, this.onSearchClick.bind(this));
        searchButton.render();

        const resetButton = new ResetButtonComponent(buttonsRow, this.onResetSearchClick.bind(this));
        resetButton.render();

        const addButton = new AddButtonComponent(buttonsRow, this.onAddCopyClick.bind(this));
        addButton.render();

        controlsDiv.appendChild(buttonsRow);

        // Контейнер для сетки карточек
        const gridDiv = document.createElement('div');
        gridDiv.id = 'main-page';
        gridDiv.className = 'services-grid';

        this.parent.appendChild(controlsDiv);
        this.parent.appendChild(gridDiv);

        // Рендерим карточки
        this.getFilteredServices().forEach(service => {
            const card = new ProductCardComponent(gridDiv);
            card.render(
                service,
                () => this.onDetailClick(service.id),
                (id) => this.onDeleteClick(id)
            );
        });
    }
}
