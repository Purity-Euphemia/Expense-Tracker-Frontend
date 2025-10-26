import { AuthService } from "./services/AuthService.js";
import { BudgetService } from "./services/BudgetService.js";
import { CategoryService } from "./services/CategoryService.js";
import { ExpenseService } from "./services/ExpenseService.js";
import { IncomeService } from "./services/IncomeService.js";
import { ReportService } from "./services/ReportService.js";
import { UserService } from "./services/UserService.js";

const baseUrl = "http://localhost:8080/api";

// Initialize services
const authService = new AuthService(baseUrl);
const budgetService = new BudgetService(baseUrl);
const categoryService = new CategoryService(baseUrl);
const expenseService = new ExpenseService(baseUrl);
const incomeService = new IncomeService(baseUrl);
const reportService = new ReportService(baseUrl);
const userService = new UserService(baseUrl);

// ==================== AUTH ====================
document.getElementById("register-btn").addEventListener("click", async () => {
    const data = {
        name: document.getElementById("register-name").value,
        email: document.getElementById("register-email").value,
        password: document.getElementById("register-password").value,
    };
    const res = await authService.register(data);
    console.log("Registered:", res);
});

document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const res = await authService.login({ email, password });
    console.log("Logged in:", res);
});

document.getElementById("logout-btn").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    const res = await authService.logout(token);
    console.log(res);
});

// ==================== BUDGET ====================
document.getElementById("add-budget-btn").addEventListener("click", async () => {
    const data = {
        amount: parseFloat(document.getElementById("budget-amount").value),
        categoryId: document.getElementById("budget-category").value,
        month: parseInt(document.getElementById("budget-month").value.split("-")[1]),
        year: parseInt(document.getElementById("budget-month").value.split("-")[0])
    };
    const res = await budgetService.setBudget(data);
    console.log("Budget Added:", res);
});

// ==================== CATEGORY ====================
document.getElementById("add-category-btn").addEventListener("click", async () => {
    const name = document.getElementById("category-name").value;
    const res = await categoryService.addCategory({ name });
    console.log("Category Added:", res);
});

// ==================== EXPENSE ====================
document.getElementById("add-expense-btn").addEventListener("click", async () => {
    const data = {
        categoryId: document.getElementById("expense-category").value,
        amount: parseFloat(document.getElementById("expense-amount").value),
        date: document.getElementById("expense-date").value
    };
    const res = await expenseService.addExpense(data);
    console.log("Expense Added:", res);
});

// ==================== INCOME ====================
document.getElementById("add-income-btn").addEventListener("click", async () => {
    const data = {
        source: document.getElementById("income-source").value,
        amount: parseFloat(document.getElementById("income-amount").value),
        date: document.getElementById("income-date").value
    };
    const res = await incomeService.addIncome(data);
    console.log("Income Added:", res);
});

// ==================== REPORT ====================
document.getElementById("generate-report-btn").addEventListener("click", async () => {
    const [year, month] = document.getElementById("report-month").value.split("-");
    const res = await reportService.getMonthlyReport(parseInt(month), parseInt(year));
    document.getElementById("report-result").innerText = JSON.stringify(res, null, 2);
});

// ==================== USER ====================
document.getElementById("get-user-btn").addEventListener("click", async () => {
    const res = await userService.getUserInfo();
    document.getElementById("user-info").innerText = JSON.stringify(res, null, 2);
});
