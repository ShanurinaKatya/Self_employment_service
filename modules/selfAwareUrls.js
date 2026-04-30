class SelfAwareUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getServices() {
        return `${this.baseUrl}/self-employment-services`;
    }

    getServiceById(id) {
        return `${this.baseUrl}/self-employment-services/${id}`;
    }

    createService() {
        return `${this.baseUrl}/self-employment-services`;
    }

    updateService(id) {
        return `${this.baseUrl}/self-employment-services/${id}`;
    }

    removeServiceById(id) {
        return `${this.baseUrl}/self-employment-services/${id}`;
    }

    searchServices(query) {
        return `${this.baseUrl}/self-employment-services?q=${encodeURIComponent(query)}`;
    }
}

export const selfAwareUrls = new SelfAwareUrls();
