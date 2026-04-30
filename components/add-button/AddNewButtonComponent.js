export class AddNewButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.id = 'add-new-btn';
        button.className = 'btn btn-success';
        button.textContent = '+ Добавить';
        button.style.borderRadius = '40px';
        button.style.padding = '10px 24px';
        button.style.marginLeft = '8px';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}