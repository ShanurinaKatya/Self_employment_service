// components/three-viewer/Services_for_the_self-aware.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ThreeViewerComponent {
    constructor(parentContainer, modelUrl) {
        this.parent = parentContainer; // DOM-элемент-контейнер
        this.modelUrl = modelUrl;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.animationId = null;
    }

    init() {
        if (!this.parent) return;
        this.parent.innerHTML = ''; // очищаем

        // Создаём canvas
        const canvas = document.createElement('canvas');
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        this.parent.appendChild(canvas);

        // Сцена
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf7f9fd); // под цвет фона

        // Камера
        const width = this.parent.clientWidth;
        const height = this.parent.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(2, 1.5, 3);
        this.camera.lookAt(0, 0, 0);

        // Рендерер
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // Освещение
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(1, 2, 1);
        this.scene.add(dirLight);
        const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
        backLight.position.set(-1, 1, -1);
        this.scene.add(backLight);

        // Орбит контрол
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.enableZoom = true;

        // Загружаем модель
        this.loadModel();

        // Анимация
        this.animate();

        // Слушаем изменение размера окна
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    loadModel() {
    const loader = new GLTFLoader();
    loader.load(this.modelUrl, (gltf) => {
        this.model = gltf.scene;
        // Центрируем модель: ставим на пол (Y=0)
        const box = new THREE.Box3().setFromObject(this.model);
        const minY = box.min.y;
        this.model.position.y -= minY;
        this.scene.add(this.model);

        // === МАСШТАБИРОВАНИЕ ===
        this.model.scale.set(8, 8, 8);  // подберите нужное значение

    }, undefined, (error) => {
        console.error('Ошибка загрузки модели:', error);
        this.parent.innerHTML = '<div style="text-align:center; padding:20px;">Модель не загружена</div>';
    });
}

    animate() {
        this.animationId = requestAnimationFrame(this.animate.bind(this));
        if (this.controls) this.controls.update();
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize() {
        if (!this.parent) return;
        const width = this.parent.clientWidth;
        const height = this.parent.clientHeight;
        if (this.camera) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
        if (this.renderer) {
            this.renderer.setSize(width, height);
        }
    }

    // Управление ракурсами
    setView(view) {
        if (!this.camera) return;
        switch(view) {
            case 'front': this.camera.position.set(0, 1, 5); break;
            case 'back':  this.camera.position.set(0, 1, -5); break;
            case 'left':  this.camera.position.set(-5, 1, 0); break;
            case 'right': this.camera.position.set(5, 1, 0); break;
        }
        this.camera.lookAt(0, 1, 0);
        if (this.controls) this.controls.target.set(0, 1, 0);
        this.controls.update();
    }

    zoomIn() {
        if (this.camera) this.camera.translateZ(-0.5);
    }
    zoomOut() {
        if (this.camera) this.camera.translateZ(0.5);
    }

    destroy() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.renderer) this.renderer.dispose();
        window.removeEventListener('resize', this.onWindowResize.bind(this));
        if (this.parent) this.parent.innerHTML = '';
    }
}
