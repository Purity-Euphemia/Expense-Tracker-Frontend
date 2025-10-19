const apiBaseUrl = "http://localhost:8080";

// Helpers
const show = (id) => document.getElementById(id).classList.remove("hidden");
const hide = (id) => document.getElementById(id).classList.add("hidden");
const getUser = () => localStorage.getItem("name");
const logout = () => {
  localStorage.removeItem("name");
  showLogin();
};

// Show sections
function showRegister() {
  hide("login-section");
  hide("app-section");
  show("register-section");
}

function showLogin() {
  hide("register-section");
  hide("app-section");
  show("login-section");
}

function showApp() {
  hide("register-section");
  hide("login-section");
  show("app-section");
}

// Register
document.getElementById("register-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  document.getElementById("register-message").textContent = "";
  document.getElementById("register-error").textContent = "";

  try {
    const res = await fetch(apiBaseUrl + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (res.ok) {
      document.getElementById("register-message").textContent = "Registered successfully! Redirecting to login...";
      setTimeout(() => {
        showLogin();
        document.getElementById("login-email").value = email;
      }, 1500);
    } else {
      document.getElementById("register-error").textContent = await res.text();
    }
  } catch {
    document.getElementById("register-error").textContent = "Network error.";
  }
});

// Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  document.getElementById("login-message").textContent = "";
  document.getElementById("login-error").textContent = "";

  try {
    const res = await fetch(apiBaseUrl + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("name", data.name || email);
      document.getElementById("current-user").textContent = data.name || email;
      showApp();
      loadTransactions(data.name || email);
    } else {
      document.getElementById("login-error").textContent = await res.text();
    }
  } catch {
    document.getElementById("login-error").textContent = "Login failed.";
  }
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", logout);

// Add Transaction
document.getElementById("transaction-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tx = {
    userEmail: getUser(),
    amount: parseFloat(document.getElementById("amount").value),
    type: document.getElementById("type").value, // "income" or "expense"
    category: document.getElementById("category").value,
    paymentMethod: document.getElementById("paymentMethod").value,
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value,
    recurring: document.getElementById("recurring").checked,
    source: document.getElementById("source").value
  };

  const endpoint =
    tx.type === "income"
      ? `${apiBaseUrl}/api/incomes`
      : `${apiBaseUrl}/api/expenses?userEmail=${encodeURIComponent(tx.userEmail)}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tx)
  });

  if (res.ok) {
    document.getElementById("app-message").textContent = "Transaction added!";
    loadTransactions(getUser());
    e.target.reset();
  } else {
    document.getElementById("app-error").textContent = await res.text();
  }
});

// Load Transactions
async function loadTransactions(user) {
  const [incomesRes, expensesRes] = await Promise.all([
    fetch(`${apiBaseUrl}/api/incomes/user/${encodeURIComponent(user)}`),
    fetch(`${apiBaseUrl}/api/expenses/user/${encodeURIComponent(user)}`)
  ]);

  const incomes = incomesRes.ok ? await incomesRes.json() : [];
  const expenses = expensesRes.ok ? await expensesRes.json() : [];

  // Tag each with type
  const transactions = [
    ...incomes.map(tx => ({ ...tx, type: "income" })),
    ...expenses.map(tx => ({ ...tx, type: "expense" }))
  ];

  const tbody = document.querySelector("#transactions-table tbody");
  tbody.innerHTML = "";

  transactions.forEach(tx => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tx.amount}</td>
      <td>${tx.type}</td>
      <td>${tx.category}</td>
      <td>${tx.paymentMethod}</td>
      <td>${tx.date}</td>
      <td>${tx.notes}</td>
      <td>${tx.recurring ? "Yes" : "No"}</td>
      <td><button class="delete-btn" data-id="${tx.id}" data-type="${tx.type}">X</button></td>
    `;
    tbody.appendChild(row);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      const type = btn.getAttribute("data-type");

      const url =
        type === "income"
          ? `${apiBaseUrl}/api/incomes/${id}`
          : `${apiBaseUrl}/api/expenses/${id}`;

      const res = await fetch(url, { method: "DELETE" });
      if (res.ok) {
        loadTransactions(user);
      } else {
        alert("Failed to delete.");
      }
    });
  });
}

// Auto-load on page load
const user = getUser();
if (user) {
  document.getElementById("current-user").textContent = user;
  showApp();
  loadTransactions(user);
} else {
  showRegister();
}
