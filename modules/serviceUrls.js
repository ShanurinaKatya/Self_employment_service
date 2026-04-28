class ServiceUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getServices() {
        return `${this.baseUrl}/services`;
    }

    getServiceById(id) {
        return `${this.baseUrl}/services/${id}`;
    }

    createService() {
        return `${this.baseUrl}/services`;
    }

    removeServiceById(id) {
        return `${this.baseUrl}/services/${id}`;
    }
}

export const serviceUrls = new ServiceUrls();
