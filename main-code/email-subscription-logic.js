const form = document.getElementById("subscriptionForm");
  const message = document.getElementById("subscriptionMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = form.querySelector("input[type='email']").value;

    if (email) {
      message.innerText = "🎉 Thanks for subscribing!";
      message.style.color = "#00ffae";
      form.reset();
    } else {
      message.innerText = "❗ Please enter a valid email.";
      message.style.color = "#ff4d4d";
    }
  });

