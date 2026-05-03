class Ajax {
    async get(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }

    async patch(url, data) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    }

    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        const result = await response.json();
        return result;
    }
}

export const ajax = new Ajax();