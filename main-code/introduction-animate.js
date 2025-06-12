const headingMain = document.getElementById("title");
const amountTexts = ["Welcome Back   ", "3d Animated landing pages  ","UX -Designs  " ,"UI-Designs " ,"optimized sites  ", "Modern-Designs  " ,"Order-Now " ,"Check our Projects "];
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
