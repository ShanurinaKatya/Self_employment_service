export class HomeButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.id = 'back-button-header';
        button.className = 'btn btn-primary';
        button.textContent = 'Домой';
        button.style.marginRight = '20px';
        button.style.borderRadius = '40px';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}
