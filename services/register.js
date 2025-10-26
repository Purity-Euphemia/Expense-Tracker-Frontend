// js/register.js

const registerBtn = document.getElementById("register-btn");

registerBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Error: ${data.message || "Registration failed"}`);
      return;
    }

    alert(`Welcome ${data.name}! Registration successful.`);
    // Optionally save token or user info if backend provides it
    // localStorage.setItem("token", data.token);

    // Redirect to login page
    window.location.href = "login.html";
  } catch (err) {
    console.error(err);
    alert("Server error. Please check your backend.");
  }
});
