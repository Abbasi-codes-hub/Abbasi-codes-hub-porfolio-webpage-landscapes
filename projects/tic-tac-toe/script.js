let boxes = document.querySelectorAll(".box");
let buttons = document.querySelector(".restart");
let btn2 = document.querySelector(".new-game");
let div = document.querySelector("div");
let message = document.querySelector(".mesage");

let turnO = true;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Box click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "blue";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
        playClickSound()
    });
});

// Disable all boxes
const disabled = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
};

// Reset message & board
const resetGame = () => {
    turnO = true;
    enableBoxes();
    message.innerText = "";
    div.classList.add("final-display"); // optional class to hide message
    playClickSound2() ;
};

// Show winner
const showwinner = (winner) => {
    message.innerText = `Congratulations ${winner} won the match`;
    div.classList.remove("winner-text"); // optional: show message styling
    disabled();
};

// Check if someone won
const checkwinner = () => {
    for (let patterns of winningPatterns) {
        let atPosition1 = boxes[patterns[0]].innerText;
        let atPosition2 = boxes[patterns[1]].innerText;
        let atPosition3 = boxes[patterns[2]].innerText;

        if (atPosition1 !== "" && atPosition2 !== "" && atPosition3 !== "") {
            if (
                atPosition1 === atPosition2 &&
                atPosition2 === atPosition3
            ) {
                div.classList.remove("final-display"); // optional: show message area
                showwinner(atPosition1);
            }
        }
    }
};

// Button event listeners
buttons.addEventListener("click", resetGame);   // Restart button
btn2.addEventListener("click", resetGame);      // New Game button
// Sound object create
const clickSound = new Audio('he.mp3'); // Make sure the file is in the correct folder

// Function to play sound
function playClickSound() {
    clickSound.currentTime = 0; // Reset sound to start
    clickSound.play();          // Play sound
}

// New button click sound
const buttonClickSound = new Audio('she.wav'); // Replace with actual file name

// Function to play button sound
function playButtonClickSound() {
    buttonClickSound.currentTime = 0; // Reset to beginning
    buttonClickSound.play();          // Play sound
}

// New Game button
const newGameBtn = document.querySelector('.new-game');
newGameBtn.addEventListener('click', () => {
    playButtonClickSound();

    // aapka New Game ka logic yahan hoga...
});

// Restart button
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', () => {
    playButtonClickSound();

    // aapka Restart logic yahan hoga...
});

