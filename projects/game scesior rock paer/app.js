let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choice");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#comp-score");
const updatemsg = document.querySelector("#update-msg");

// 6. Event Listener: Add click events to all choices
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        let userchoice = choice.getAttribute("id");
        playgame(userchoice);
    });
});

// 2. Function: Computer choice generator
const compchoicegen = () => {
    let choicecomp = ["rock", "scissor", "paper"];
    let randomidx = Math.floor(Math.random() * 3);
    return choicecomp[randomidx];
};

// 5. Function: Game logic
const playgame = (userchoice) => {
    const choicecomp = compchoicegen();
    if (userchoice === choicecomp) {
        drawgame(userchoice, choicecomp);
    } else {
        let userwin = true;
        if (choicecomp === "rock") {
            userwin = userchoice === "paper";
        } else if (choicecomp === "paper") {
            userwin = userchoice === "scissor";
        } else if (choicecomp === "scissor") {
            userwin = userchoice === "rock";
        }
        showwinner(userchoice, choicecomp, userwin);
    }
};

// draw game function 
const drawgame = (userchoice, choicecomp) => {
    updatemsg.innerText = `😐 It's a draw! You both chose ${userchoice}`;
    updatemsg.style.backgroundColor = "yellow";
    updatemsg.style.color = "black";
};

// showwinner function 
const showwinner = (userchoice, choicecomp, userwin) => {
    if (userwin) {
        userscore++;
        userScore.innerText = userscore;
        updatemsg.innerText = `🎉 You win! ${userchoice} beats ${choicecomp}`;
        updatemsg.style.backgroundColor = "green";
        updatemsg.style.color = "white";
    } else {
        compscore++;
        compScore.innerText = compscore;
        updatemsg.innerText = `😞 You lose! ${choicecomp} beats ${userchoice}`;
        updatemsg.style.backgroundColor = "red";
        updatemsg.style.color = "white";
    }
};
