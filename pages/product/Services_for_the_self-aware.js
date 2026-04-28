import { ProductComponent } from "../../components/product/Services_for_the_self-aware.js";
import { ajax } from "../../modules/ajax.js";
import { selfAwareUrls } from "../../modules/selfAwareUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
        this.productComp = null;
    }

    // Вместо статического объекта берем данные из API
    getData() {
        ajax.get(selfAwareUrls.getServiceById(this.id), (data) => {
            if (data) {
                this.renderData(data);
            }
        });
    }

    renderData(data) {
        const root = document.getElementById('product-page-container');
        this.productComp = new ProductComponent(root);
        // Здесь вызовется твой рендер, который создаст ThreeViewerComponent
        this.productComp.render(data);
    }

    render() {
        this.parent.innerHTML = '<div id="product-page-container"></div>';
        this.getData();
    }

    destroy() {
        if (this.productComp && this.productComp.destroy) {
            this.productComp.destroy();
        }
    }
}
