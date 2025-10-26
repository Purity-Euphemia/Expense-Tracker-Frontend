export class BudgetService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async setBudget(data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/budgets`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        return await res.json();
    }

    async getUserBudgets(userEmail) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/budgets/user/${userEmail}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.json();
    }

    async updateBudget(id, data) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/budgets/${id}`, {
            method: "PUT",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return await res.json();
    }

    async deleteBudget(id) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/budgets/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.text();
    }
}
