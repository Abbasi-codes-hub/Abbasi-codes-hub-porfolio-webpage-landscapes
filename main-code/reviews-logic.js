// Dummy reviews array (Firebase se replace hoga)
let allReviews = [
  { name: "Ali", text: "Excellent service!" },
  { name: "Zara", text: "Very professional and clean UI." },
  { name: "Ahmed", text: "Highly recommended!" },
  { name: "Fatima", text: "Loved the layout and speed." },
  { name: "Bilal", text: "10/10 experience." },
  { name: "Sara", text: "Looks amazing on mobile too." },
  { name: "Hamza", text: "Dark mode is 🔥🔥" },
  { name: "Ayesha", text: "Great work and smooth transitions." },
];

const reviewsContainer = document.getElementById("reviewsContainer");
const seeMoreBtn = document.getElementById("seeMoreBtn");
const submitBtn = document.getElementById("submitReviewBtn");

let displayedReviews = []; // Track displayed reviews
let initialLoad = 5;        // Only show 5 reviews first

// Shuffle helper (for random initial 5)
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Display reviews
function renderReviews(limit = null) {
  reviewsContainer.innerHTML = ""; // Clear old content
  const toDisplay = limit ? displayedReviews.slice(0, limit) : displayedReviews;

  toDisplay.forEach((review) => {
    const div = document.createElement("div");
    div.className = "review-item";
    div.innerHTML = `<strong>${review.name}</strong><p>${review.text}</p>`;
    reviewsContainer.appendChild(div);
  });

  // Hide button if all are shown
  if (displayedReviews.length <= initialLoad || toDisplay.length === displayedReviews.length) {
    seeMoreBtn.style.display = "none";
  }
}

// On Submit Review
submitBtn.addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  const text = document.getElementById("reviewText").value.trim();

  if (name && text) {
    const newReview = { name, text };
    allReviews.unshift(newReview); // Add on top
    displayedReviews = [...allReviews];
    renderReviews(initialLoad); // Re-render with new review
    document.getElementById("username").value = "";
    document.getElementById("reviewText").value = "";

    // TODO: Add to Firebase here later
  } else {
    alert("Please fill in both fields!");
  }
});

// See More Reviews
seeMoreBtn.addEventListener("click", () => {
  renderReviews(); // Show all
});

// INIT
function initReviews() {
  displayedReviews = shuffleArray(allReviews);
  renderReviews(initialLoad);
}

initReviews();
