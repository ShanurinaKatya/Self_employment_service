// components/product/Services_for_the_self-aware.js
import { ThreeViewerComponent } from "../three-viewer/Services_for_the_self-aware.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
        this.viewer = null;
    }

    getHTML(data) {
        return `
            <div class="card mb-3" style="width: 90%; max-width: 1280px; margin: 20px auto;">
                <div class="row g-0">
                    <div class="col-md-6">
                        <div id="three-container" style="height: 400px; background: #e9ecef; border-radius: 16px; overflow: hidden;"></div>
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                            <hr>
                            <ul class="list-unstyled">
                                <li><strong>Результат:</strong> ${data.result}</li>
                                <li><strong>Срок:</strong> ${data.term}</li>
                                <li><strong>Цена:</strong> ${data.price}</li>
                                <li><strong>Документы:</strong> ${data.documents}</li>
                            </ul>
                            <div class="d-flex gap-2 mt-3 flex-wrap">
                                <button id="view-front" class="btn btn-sm btn-outline-primary">Вид спереди</button>
                                <button id="view-back" class="btn btn-sm btn-outline-primary">Сзади</button>
                                <button id="view-left" class="btn btn-sm btn-outline-primary">Слева</button>
                                <button id="view-right" class="btn btn-sm btn-outline-primary">Справа</button>
                                <button id="zoom-in" class="btn btn-sm btn-primary">+</button>
                                <button id="zoom-out" class="btn btn-sm btn-primary">-</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        const container = document.getElementById('three-container');
        if (container) {
            // Используем одну модель для всех услуг
            const modelUrl = '/models/model.glb';   // путь к вашему единственному файлу
            this.viewer = new ThreeViewerComponent(container, modelUrl);
            this.viewer.init();

            // Обработчики кнопок
            const front = document.getElementById('view-front');
            const back = document.getElementById('view-back');
            const left = document.getElementById('view-left');
            const right = document.getElementById('view-right');
            const zoomIn = document.getElementById('zoom-in');
            const zoomOut = document.getElementById('zoom-out');
            if (front) front.addEventListener('click', () => this.viewer.setView('front'));
            if (back) back.addEventListener('click', () => this.viewer.setView('back'));
            if (left) left.addEventListener('click', () => this.viewer.setView('left'));
            if (right) right.addEventListener('click', () => this.viewer.setView('right'));
            if (zoomIn) zoomIn.addEventListener('click', () => this.viewer.zoomIn());
            if (zoomOut) zoomOut.addEventListener('click', () => this.viewer.zoomOut());
        }
    }

    destroy() {
        if (this.viewer) this.viewer.destroy();
    }
}
