export class CategoryService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async addCategory(data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/categories`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async getAllCategories() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/categories`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.json();
    }

    async getCategoryById(id) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/categories/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.json();
    }

    async updateCategory(id, data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/categories/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async deleteCategory(id) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/categories/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.text();
    }
}
