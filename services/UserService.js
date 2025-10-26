export class UserService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getUserInfo() {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.json();
    }
}
