export class AuthService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async register(data) {
        const res = await fetch(`${this.baseUrl}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await res.json();
    }

    async login(data) {
        const res = await fetch(`${this.baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) localStorage.setItem("token", result.token);
        return result;
    }

    async logout(token) {
        const res = await fetch(`${this.baseUrl}/auth/logout?token=${token}`, { method: "POST" });
        localStorage.removeItem("token");
        return await res.text();
    }
}
