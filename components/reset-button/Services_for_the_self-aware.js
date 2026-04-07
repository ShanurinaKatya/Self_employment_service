export class ResetButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.id = 'reset-search-btn';
        button.className = 'btn btn-outline-secondary';
        button.textContent = 'Сбросить';
        button.style.borderRadius = '40px';
        button.style.padding = '10px 24px';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}
