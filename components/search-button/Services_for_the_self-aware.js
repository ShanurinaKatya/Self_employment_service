export class SearchButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.id = 'search-btn';
        button.className = 'btn btn-primary';
        button.textContent = 'Найти';
        button.style.borderRadius = '40px';
        button.style.padding = '10px 24px';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}
