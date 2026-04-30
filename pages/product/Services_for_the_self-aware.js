import { ProductComponent } from "../../components/product/Services_for_the_self-aware.js";
import { BackButtonComponent } from "../../components/back-button/BackButtonComponent.js";
import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";
import { MainPage } from "../main/Services_for_the_self-aware.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    getData() {
        ajax.get(selfAwareUrls.getServiceById(this.id), (data, status) => {
            if (status === 200 && data) {
                this.renderData(data);
            } else {
                console.error('Failed to load service:', status);
                this.renderData({
                    title: "Услуга не найдена",
                    text: "Попробуйте вернуться на главную",
                    src: "",
                    result: "—",
                    term: "—",
                    price: "—",
                    documents: "—"
                });
            }
        });
    }

    onBack() {
        new MainPage(this.parent).render();
    }

    renderData(data) {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.onBack.bind(this));

        this.productComp = new ProductComponent(this.pageRoot);
        this.productComp.render(data);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    render() {
        this.getData();
    }

    destroy() {
        if (this.productComp && this.productComp.destroy) {
            this.productComp.destroy();
        }
    }
}
