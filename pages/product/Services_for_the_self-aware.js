import { ProductComponent } from "../../components/product/Services_for_the_self-aware.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getFullData() {
        const baseData = {
            1: {
                title: "Регистрация в качестве самозанятого",
                text: "Подача заявки в ФНС, присвоение статуса «плательщик НПД»",
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                result: "статус самозанятого, можно выдавать чеки",
                term: "1–3 дня",
                price: "бесплатно",
                documents: "паспорт, ИНН, телефон, доступ к Госуслугам"
            },
            2: {
                title: "Изменение вида деятельности",
                text: "Добавление, удаление или замена кодов ОКВЭД/ОКПДТ",
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                result: "новые коды видов деятельности в реестре",
                term: "1 день",
                price: "бесплатно",
                documents: "ИНН, новый список услуг"
            },
            3: {
                title: "Снятие с учёта самозанятого",
                text: "Прекращение деятельности в режиме НПД",
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                result: "вы больше не самозанятый, налог платить не надо",
                term: "до 2 дней",
                price: "бесплатно",
                documents: "паспорт, ИНН, без долгов по налогам"
            },
            4: {
                title: "Выдача справки о постановке на учёт",
                text: "Официальный документ из ФНС для банков и заказчиков",
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                result: "официальная справка из ФНС (файл PDF)",
                term: "1 день",
                price: "бесплатно",
                documents: "ИНН, запрос через сервис"
            },
            5: {
                title: "Помощь в уплате налога",
                text: "Проверка начислений, формирование квитанции, контроль оплаты",
                src: "https://i.pinimg.com/originals/c9/ea/65/c9ea654eb3a7398b1f702c758c1c4206.jpg",
                result: "оплаченный налог, квитанция, уведомление",
                term: "сразу онлайн",
                price: "бесплатно (оплачиваете только сам налог)",
                documents: "ИНН"
            }
        };
        return baseData[this.id] || {
            title: "Услуга не найдена",
            text: "Попробуйте вернуться на главную",
            src: "",
            result: "—",
            term: "—",
            price: "—",
            documents: "—"
        };
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const data = this.getFullData();
        const product = new ProductComponent(this.pageRoot);
        product.render(data);
    }
}
