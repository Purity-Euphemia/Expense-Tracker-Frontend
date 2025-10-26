document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Home page loaded");

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Loaded user:", user);

  if (!user) {
    alert("No user found. Redirecting to register page.");
    window.location.href = "register.html";
    return;
  }

  document.getElementById("welcome-text").textContent = `Welcome, ${user.name}!`;

  const API_BASE = "http://localhost:8080/api";

  try {
    console.log("Fetching data for user:", user.email);

    const incomeRes = await fetch(`${API_BASE}/incomes/user/${user.email}`);
    const expenseRes = await fetch(`${API_BASE}/expenses/user/${user.email}`);

    console.log("Income status:", incomeRes.status, "Expense status:", expenseRes.status);

    if (!incomeRes.ok || !expenseRes.ok) {
      throw new Error("Failed to load data from backend.");
    }

    const incomes = await incomeRes.json();
    const expenses = await expenseRes.json();

    console.log("Incomes:", incomes);
    console.log("Expenses:", expenses);

    const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const balance = totalIncome - totalExpense;

    document.querySelector("#total-income p").textContent = `₦${totalIncome.toLocaleString()}`;
    document.querySelector("#total-expense p").textContent = `₦${totalExpense.toLocaleString()}`;
    document.querySelector("#balance p").textContent = `₦${balance.toLocaleString()}`;
  } catch (err) {
    console.error("Error:", err);
    alert("Error loading your financial data. Check console for details.");
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
});
