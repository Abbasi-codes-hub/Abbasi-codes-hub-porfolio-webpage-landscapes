let display = document.getElementById('display');
let history = document.getElementById('history');
let currentTheme = 'light';

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let result = eval(display.value);
        history.innerHTML = display.value + ' =';
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Advanced Functions
function square() {
    display.value = Math.pow(eval(display.value), 2);
}

function squareRoot() {
    display.value = Math.sqrt(eval(display.value));
}

function power() {
    display.value += '**';
}

function factorial() {
    let num = eval(display.value);
    let fact = 1;
    for (let i = 1; i <= num; i++) {
        fact *= i;
    }
    display.value = fact;
}

function sin() {
    display.value = Math.sin(eval(display.value));
}

function cos() {
    display.value = Math.cos(eval(display.value));
}

function tan() {
    display.value = Math.tan(eval(display.value));
}

function log() {
    display.value = Math.log10(eval(display.value));
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        currentTheme = 'dark';
        document.querySelector('.theme-toggle i').className = 'fas fa-sun';
    } else {
        body.setAttribute('data-theme', 'light');
        currentTheme = 'light';
        document.querySelector('.theme-toggle i').className = 'fas fa-moon';
    }
}