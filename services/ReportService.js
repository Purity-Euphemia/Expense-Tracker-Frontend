export class ReportService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getMonthlyReport(month, year) {
        const token = localStorage.getItem("token");
        const res = await fetch(`${this.baseUrl}/reports/monthly?month=${month}&year=${year}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return await res.json();
    }
}
