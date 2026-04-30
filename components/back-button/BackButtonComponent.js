export class BackButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.id = 'back-button-page';
        button.className = 'btn btn-secondary';
        button.textContent = 'Назад';
        button.style.margin = '20px';
        button.style.borderRadius = '40px';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}