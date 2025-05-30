
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("inscriptionForm");
    const pseudo = document.getElementById("pseudo");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm_password");

    form.addEventListener("submit", function (e) {
      let hasError = false;

      // Cacher toutes les erreurs avant nouvelle validation
      document.querySelectorAll("p.text-red-500").forEach(p => p.classList.add("hidden"));

      // Validation pseudo
      if (pseudo.value.trim() === "") {
        document.getElementById("error-pseudo").classList.remove("hidden");
        hasError = true;
      }

      // Validation email simple
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        document.getElementById("error-email").classList.remove("hidden");
        hasError = true;
      }

      // Validation mot de passe (min 6)
      if (password.value.length < 6) {
        document.getElementById("error-password").classList.remove("hidden");
        hasError = true;
      }

      // Confirmation mot de passe
      if (password.value !== confirmPassword.value) {
        document.getElementById("error-confirm-password").classList.remove("hidden");
        hasError = true;
      }

      if (hasError) {
        e.preventDefault();
      }
    });
  });