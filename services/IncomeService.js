export class IncomeService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async addIncome(data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/incomes`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async getUserIncome(userEmail) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/incomes/user/${userEmail}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.json();
    }

    async updateIncome(id, data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/incomes/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async deleteIncome(id) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/incomes/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.text();
    }
}
