import { MainPage } from "./pages/main/Services_for_the_self-aware.js";
import { HomeButtonComponent } from "./components/back-button/Services_for_the_self-aware.js";

// 1. Функция для добавления глобальных стилей (с вашими правками)
function injectGlobalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Общий фон страницы – светло-голубой */
        body {
            background: #F7F9FD;
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        }

        /* Белый хедер */
        .white-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            z-index: 1050;
        }
        .header-title {
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            font-size: 24px;
            font-weight: bold;
            color: #3F68EA;
            margin-left: 20px;
        }
        /* Кнопка "Домой" всегда в правом углу */
        #back-button-header {
            margin-right: 20px;
            border-radius: 40px;
            padding: 6px 20px;
            background-color: #3F68EA;
            border-color: #3F68EA;
            color: white;
            cursor: pointer;
        }
        #back-button-header:hover {
            background-color: #1752d4;
        }

        /* Отступ под хедер */
        #root {
            padding-top: 80px;
            padding-bottom: 30px;
            max-width: 1280px;
            margin: 0 auto;
        }

        /* Сетка карточек (фиксированная ширина 300px, левый край) */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, 300px);
            gap: 24px;
            justify-content: start;
            align-items: stretch;
        }

        /* Стили карточек */
        .card {
            background: white;
            color: black;
            border: none;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }
        .card:hover {
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }
        .card-title {
            color: black;
            font-weight: 600;
        }
        .card-text {
            color: black;
        }

        /* Синие кнопки (в стиле калькулятора) */
        .btn-primary {
            background-color: #3F68EA;
            color: white;
            border-radius: 40px;
            padding: 8px 20px;
            font-weight: 500;
            transition: all 0.2s;
        }
        .btn-primary:hover {
            background-color: #1752d4;
        }
        /* кнопка "Добавить" */
        .btn-success {
            background-color: #3F68EA;
            border: none;
            color: white;
            border-radius: 40px;
            padding: 8px 20px;
        }
        .btn-success:hover {
            background-color: #1752d4;
        }
        /* Кнопка удаления */
        .btn-outline-danger {
            color: #dc3545;
            border: 1px solid #dc3545;
            background: white;
            border-radius: 40px;
        }
        .btn-outline-danger:hover {
            background-color: #dc3545;
            color: white;
        }

        /* Стили для страницы продукта (широкая карточка) */
        #product-page .card {
            width: 90%;
            max-width: 1280px;
            margin: 20px auto;
        }
        #product-page .card ul li {
            margin-bottom: 8px;
        }
        #product-page .card hr {
            margin: 12px 0;
        }
        @media (max-width: 768px) {
            #product-page .card {
                width: 95%;
            }
        }
        #search-input {
            border: 1px solid #ced4da;
            border-radius: 48px;
            padding: 12px 20px;
            font-size: 16px;
            outline: none;
            transition: all 0.2s;
            flex: 1;
            background: white;
        }
    `;
    document.head.appendChild(style);
}

// 2. Создание хедера с кнопкой "Домой"
function createHeader() {
    const header = document.createElement('div');
    header.className = 'white-header';
    const title = document.createElement('div');
    title.className = 'header-title';
    title.textContent = 'Сервис для самозанятых';
    header.appendChild(title);

    // Кнопка "Домой" через отдельный компонент
    const homeButton = new HomeButtonComponent(header, () => {
        const root = document.getElementById('root');
        const mainPage = new MainPage(root);
        mainPage.render();
    });
    homeButton.render();

    document.body.prepend(header);
}

// 3. Инициализация приложения
function init() {
    injectGlobalStyles();
    createHeader();

    const root = document.getElementById('root');
    const mainPage = new MainPage(root);
    mainPage.render();
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', init);
