export class ExpenseService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async addExpense(data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/expenses`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async getUserExpenses(userEmail) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/expenses/user/${userEmail}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.json();
    }

    async updateExpense(id, data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/expenses/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async deleteExpense(id) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/expenses/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.text();
    }
}
