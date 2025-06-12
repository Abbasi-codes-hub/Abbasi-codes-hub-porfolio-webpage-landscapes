const headingMain = document.getElementById("enter-amount");
const amountTexts = ["Enter Amount ", "Add Currency ", "Type Value ", "Let's Convert! "];
let amtIndex = 0;
let amtCharIndex = 0;
let isAmtDeleting = false;

function typeAmountEffect() {
  const currentText = amountTexts[amtIndex];
  
  if (isAmtDeleting) {
    headingMain.textContent = currentText.substring(0, amtCharIndex--);
  } else {
    headingMain.textContent = currentText.substring(0, amtCharIndex++);
  }

  if (!isAmtDeleting && amtCharIndex === currentText.length) {
    isAmtDeleting = true;
    setTimeout(typeAmountEffect, 1000);
    return;
  }

  if (isAmtDeleting && amtCharIndex === 0) {
    isAmtDeleting = false;
    amtIndex = (amtIndex + 1) % amountTexts.length;
  }

  setTimeout(typeAmountEffect, isAmtDeleting ? 50 : 100);
}

typeAmountEffect();
