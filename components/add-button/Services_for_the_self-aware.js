export class AddButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.id = 'add-copy-btn';
        button.className = 'btn btn-success';
        button.textContent = 'Добавить';
        button.style.borderRadius = '40px';
        button.style.padding = '10px 24px';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}
