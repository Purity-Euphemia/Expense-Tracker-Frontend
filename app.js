const apiBaseUrl = "http://localhost:8080";

// Helpers
const show = (id) => document.getElementById(id).classList.remove("hidden");
const hide = (id) => document.getElementById(id).classList.add("hidden");
const getUser = () => localStorage.getItem("username");
const logout = () => {
  localStorage.removeItem("username");
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

// ✅ Register
document.getElementById("register-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const password = document.getElementById("register-password").value;

  document.getElementById("register-message").textContent = "";
  document.getElementById("register-error").textContent = "";

  try {
    const res = await fetch(apiBaseUrl + "/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }) // ✅ correct field name
    });

    if (res.ok) {
      document.getElementById("register-message").textContent = "Registered successfully! Redirecting to login...";
      setTimeout(() => {
        showLogin();
        document.getElementById("login-username").value = name;
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
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  document.getElementById("login-message").textContent = "";
  document.getElementById("login-error").textContent = "";

  try {
    const res = await fetch(apiBaseUrl + "/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: username, password }) // ✅ backend may expect "name" here too
    });

    if (res.ok) {
      localStorage.setItem("username", username);
      document.getElementById("current-user").textContent = username;
      showApp();
      loadTransactions(username);
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
    username: getUser(),
    amount: parseFloat(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    paymentMethod: document.getElementById("paymentMethod").value,
    date: document.getElementById("date").value,
    notes: document.getElementById("notes").value,
    recurring: document.getElementById("recurring").checked
  };

  const res = await fetch(apiBaseUrl + "/transactions", {
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
  const res = await fetch(`${apiBaseUrl}/transactions/${user}`);
  if (res.ok) {
    const transactions = await res.json();
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
        <td><button class="delete-btn" data-id="${tx.id}">X</button></td>
      `;
      tbody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const res = await fetch(`${apiBaseUrl}/transactions/${user}/${id}`, {
          method: "DELETE"
        });
        if (res.ok) loadTransactions(user);
      });
    });
  }
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
