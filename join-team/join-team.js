document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const joinType = document.getElementById("join-type");
    const experience = document.getElementById("experience");
    const cv = document.getElementById("cv");
    const linkedin = document.getElementById("linkedin");
    const upwork = document.getElementById("upwork");
    const fiverr = document.getElementById("fiverr");

    // Helper Functions
    const isValidEmail = (email) =>
      /^[^ ]+@[^ ]+\.[a-z]{2,}$/.test(email);

    const isValidURL = (url) =>
      /^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(url);

    const isValidName = (name) =>
      /^[a-zA-Z\s]{4,}$/.test(name); // Only alphabets and space, min 4 chars

    // Trimmed values
    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const linkedinVal = linkedin.value.trim();
    const upworkVal = upwork.value.trim();
    const fiverrVal = fiverr.value.trim();

    // Validations Start
    if (!nameVal || !emailVal || !joinType.value || !experience.value || !cv.value || !linkedinVal || !upworkVal || !fiverrVal) {
      alert(" Please fill all required fields marked with *.");
      return;
    }

    if (!isValidName(nameVal)) {
      alert(" Name must be at least 4 characters long and contain only letters.");
      return;
    }

    if (!isValidEmail(emailVal)) {
      alert(" Please enter a valid email address.");
      return;
    }

    if (!isValidURL(linkedinVal) || !isValidURL(upworkVal) || !isValidURL(fiverrVal)) {
      alert(" Please enter valid URLs for LinkedIn, Upwork, and Fiverr.");
      return;
    }

    // Check for duplicate URLs
    if (
      linkedinVal === upworkVal ||
      linkedinVal === fiverrVal ||
      upworkVal === fiverrVal
    ) {
      alert("LinkedIn, Upwork, and Fiverr URLs must be different from each other.");
      return;
    }

    // ✅ All validations passed
    alert("Your application has been submitted successfully!");
    form.reset();
  });
});
