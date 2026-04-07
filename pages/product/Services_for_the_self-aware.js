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
                src: "https://cdn.gpb.ru/upload/files/iblock/f1c/h5pi4duvqhflhahp95loe4vrdshkptu7/x1_titul_2432x800.jpg",
                result: "статус самозанятого, можно выдавать чеки",
                term: "1–3 дня",
                price: "бесплатно",
                documents: "паспорт, ИНН, телефон, доступ к Госуслугам"
            },
            2: {
                title: "Изменение вида деятельности",
                text: "Добавление, удаление или замена кодов ОКВЭД/ОКПДТ",
                src: "https://cdn.gpb.ru/upload/files/iblock/18e/674mzgnqv20xyt6ryxad0t2trazpd3wz/x1_inside_2432x800.jpg",
                result: "новые коды видов деятельности в реестре",
                term: "1 день",
                price: "бесплатно",
                documents: "ИНН, новый список услуг"
            },
            3: {
                title: "Снятие с учёта самозанятого",
                text: "Прекращение деятельности в режиме НПД",
                src: "https://cdn.gpb.ru/upload/files/iblock/bf2/x53am725mw4hcw3fbvjeqw1h3ypzmmnw/titul_1200x630-_-2024_12_02T124856.085.png",
                result: "вы больше не самозанятый, налог платить не надо",
                term: "до 2 дней",
                price: "бесплатно",
                documents: "паспорт, ИНН, без долгов по налогам"
            },
            4: {
                title: "Выдача справки о постановке на учёт",
                text: "Официальный документ из ФНС для банков и заказчиков",
                src: "https://cdn.gpb.ru/upload/files/iblock/b78/9fdyo75ph27322mcx3kla766p54vsgj2/x1_IP.png",
                result: "официальная справка из ФНС (файл PDF)",
                term: "1 день",
                price: "бесплатно",
                documents: "ИНН, запрос через сервис"
            },
            5: {
                title: "Помощь в уплате налога",
                text: "Проверка начислений, формирование квитанции, контроль оплаты",
                src: "https://cdn.gpb.ru/upload/files/iblock/107/skbum8ndum12z2s9s6c9qsyngd6jc5do/x1_titul_2432x800.jpg",
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
