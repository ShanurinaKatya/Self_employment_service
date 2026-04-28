class SelfAwareUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getServices() {
        // Должно быть точно так же, как в браузере
        return `${this.baseUrl}/self-employment-services`;
    }

    getServiceById(id) {
        return `${this.baseUrl}/self-employment-services/${id}`;
    }

    createService() {
        return `${this.baseUrl}/self-employment-services`;
    }

    removeServiceById(id) {
        return `${this.baseUrl}/self-employment-services/${id}`;
    }
}

export const selfAwareUrls = new SelfAwareUrls();
