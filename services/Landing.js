const getStartedBtn = document.getElementById("get-started-btn");

// When user clicks "Get Started", send them to register page
getStartedBtn.addEventListener("click", () => {
  window.location.href = "register.html";
});
