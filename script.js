/* --- PART 1: GREEN MATRIX RAIN --- */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = "10";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    // Fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Color: Green Only
    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 33);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* --- PART 2: CALCULATOR LOGIC --- */
const display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === 'Error') display.value = '';
    if (display.value.length > 9) return;
    display.value += number;
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '×', '÷', '%'].includes(lastChar) || display.value === '') return;
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

function calculateResult() {
    try {
        let expression = display.value;
        expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        
        let result = eval(expression);
        
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(6));
        }
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    let button = null;

    if (key === 'Enter') button = document.querySelector(`button[data-key="Enter"]`);
    else if (key === 'Backspace') button = document.querySelector(`button[data-key="Backspace"]`);
    else if (key === 'Escape') button = document.querySelector(`button[data-key="Escape"]`);
    else if (key === '*') button = document.querySelector(`button[data-key="*"]`); 
    else if (key === '/') button = document.querySelector(`button[data-key="/"]`); 
    else {
        button = document.querySelector(`button[data-key="${key}"]`);
    }

    if (button) {
        button.click();
        button.style.opacity = '0.7';
        setTimeout(() => button.style.opacity = '1', 100);
    }
});