// js/register.js

document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.getElementById("register-btn");

  registerBtn.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    // Prepare the correct JSON object
    const userData = { name, email, password };

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // ✅ Send the raw object (NOT wrapped in { userData })
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.message || "Registration failed"}`);
        return;
      }

      // ✅ Save user so home page can find it
      localStorage.setItem("user", JSON.stringify(data));

      alert(`Welcome ${data.name}! Registration successful.`);

      // ✅ Redirect to home page
      window.location.href = "home.html";
    } catch (err) {
      console.error("❌ Registration failed:", err);
      alert("Server error. Please check your backend connection.");
    }
  });
});
