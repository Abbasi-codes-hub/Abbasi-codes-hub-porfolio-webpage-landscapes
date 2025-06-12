// Contact Form Logic – Abbasi Codes Hub

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Fetch all input values
    const name = document.getElementById("name").value.trim();
    const gmail = document.getElementById("email").value.trim(); // kept as 'email' for id
    const subject = document.getElementById("subject").value.trim();
    const mesage = document.getElementById("message").value.trim(); // kept original typo for UI match

    // Validation logic
    if (!name || !gmail || !subject || !mesage) {
      alert("⚠️ Please fill in all the required fields.");
      return;
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(gmail)) {
      alert("❌ Please enter a valid Gmail address.");
      return;
    }

    // Ensure Gmail only
    if (!gmail.endsWith("@gmail.com")) {
      alert("✉️ Only Gmail addresses are accepted.");
      return;
    }

    // Character limit on message
    if (mesage.length > 1200) {
      alert("🚫 Your message exceeds the 1200 character limit. Please shorten it.");
      return;
    }

    // Optional: success UI feedback
    alert("✅ Thank you for contacting us! Our team will respond within 24 hours.");

    // You can also clear the form:
    form.reset();

    // [Optional] Send to Firebase / Backend here
  });
});

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const messageInput = document.getElementById("message");
  const charCounter = document.getElementById("char-counter");
  const MAX_CHARS = 1200;

  // Set initial counter
  charCounter.textContent = `Remaining characters: ${MAX_CHARS}`;

  messageInput.addEventListener("input", () => {
    let currentText = messageInput.value;

    // If user exceeds max, trim it
    if (currentText.length > MAX_CHARS) {
      messageInput.value = currentText.slice(0, MAX_CHARS);
      currentText = messageInput.value;
    }

    const remaining = MAX_CHARS - currentText.length;
    charCounter.textContent = remaining > 0 
      ? `Remaining characters: ${remaining}` 
      : `Character limit reached`;

    // Styling logic
    if (remaining <= 0) {
      charCounter.style.color = "#ef4444"; // Red
      messageInput.classList.add("limit-reached");
    } else {
      charCounter.style.color = "#9ca3af"; // Gray
      messageInput.classList.remove("limit-reached");
    }
  });
});

