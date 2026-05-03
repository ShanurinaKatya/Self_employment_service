import { ProductComponent } from "../../components/product/Services_for_the_self-aware.js";
import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";
import { MainPage } from "../main/Services_for_the_self-aware.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id);
    }

    async getData() {
        try {
            const data = await ajax.get(selfAwareUrls.getServiceById(this.id));
            this.renderData(data);
        } catch (error) {
            console.error('Failed to load service:', error);
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
    }

    onBack() {
        new MainPage(this.parent).render();
    }

    renderData(data) {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());


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