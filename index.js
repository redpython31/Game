// Selecting DOM elements for login/signup and game
const loginButton = document.getElementById("loginInterface");
const signUpButton = document.getElementById("signInterface");
const hiddenScreen = document.getElementById("hidden-box");
const statusScreen = document.querySelector(".score-update");

const choiceTime = document.querySelector(".timerBtn");
const choiceChance = document.querySelector(".chanceBtn");
const chanceOption = document.querySelector(".chance");
const timerOption = document.querySelector(".time");

const timeButtons = document.querySelectorAll("#setTime span");
const chanceButtons = document.querySelectorAll("#setChance span");
const timeScreen = document.getElementById("remainingTime");
const chanceScreen = document.getElementById("remainingChance");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

// Game variables
let timeLeft = 30;          // default time
let chanceLeft = 15;        // default chance
let randomNumber = 0;       // hidden number
let countDown = null;       // interval reference
let gameActive = false;     // is game currently active
let settingsLocked = false; // are time/chance settings locked

// Show login interface and hide signup
const showLogin = () => {
    loginButton.style.display = "flex";
    signUpButton.style.display = "none";
};

// Show signup interface and hide login
const showSignUp = () => {
    signUpButton.style.display = "flex";
    loginButton.style.display = "none";
};

// Toggle timer dropdown menu
choiceTime.addEventListener("click", (e) => {
    if (settingsLocked) return;  // Prevent changing settings during game
    e.stopPropagation();
    timerOption.style.display = "block";
    chanceOption.style.display = "none";
});

// Toggle chance dropdown menu
choiceChance.addEventListener("click", (e) => {
    if (settingsLocked) return; // Prevent changing settings during game
    e.stopPropagation();
    chanceOption.style.display = "block";
    timerOption.style.display = "none";
});

// Prevent dropdown from closing when clicked inside
timerOption.addEventListener("click", (e) => e.stopPropagation());
chanceOption.addEventListener("click", (e) => e.stopPropagation());

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
    timerOption.style.display = "none";
    chanceOption.style.display = "none";
});

// Set time when user clicks a time button
timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (settingsLocked) return; // Do not allow changes during game
        timeLeft = parseInt(btn.innerText.trim());
        timeScreen.innerText = timeLeft;
    });
});

// Set chance when user clicks a chance button
chanceButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if (settingsLocked) return; // Do not allow changes during game
        chanceLeft = parseInt(btn.innerText.trim());
        chanceScreen.innerText = chanceLeft;
    });
});

// Function to generate a random number between 1-105
const generateRandomNumber = () => Math.floor(Math.random() * 105) + 1;

// Lock or unlock time/chance buttons
const lockSettingsButtons = (lock) => {
    const pointer = lock ? "none" : "auto"; // disable pointer events if locked
    timeButtons.forEach(btn => btn.style.pointerEvents = pointer);
    chanceButtons.forEach(btn => btn.style.pointerEvents = pointer);
    choiceTime.style.opacity = lock ? "0.5" : "1";   // show visual lock
    choiceChance.style.opacity = lock ? "0.5" : "1";
};

// Start the game
const startGame = (isRestart = false) => {
    if (!isRestart) {
        randomNumber = generateRandomNumber(); // generate new hidden number
    }

    // Reset UI elements
    hiddenScreen.innerText = "?";
    statusScreen.innerText = "";
    settingsLocked = true;
    lockSettingsButtons(true);
    gameActive = true;

    // Clear any previous countdown
    clearInterval(countDown);
    countDown = setInterval(() => {
        timeScreen.innerText = timeLeft;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(countDown);
            timeScreen.innerText = "Time Up!";
            endGame(false, "Time’s Up!");
        }
    }, 1000);

    // Prepare all number cells
    const cells = document.querySelectorAll(".game-console-input-keyboard td");
    cells.forEach(cell => {
        cell.style.pointerEvents = "auto";
        cell.style.backgroundColor = ""; // reset color
    });

    // Add click listeners to each cell
    cells.forEach(cell => {
        cell.onclick = () => handleCellClick(cell, cells);
    });
};

// Handle user clicking a number
const handleCellClick = (cell, cells) => {
    if (!gameActive || chanceLeft <= 0) return; // ignore if game over

    const value = Number(cell.textContent);
    cell.style.backgroundColor = "red"; // indicate clicked

    // Reduce remaining chance
    chanceLeft--;
    chanceScreen.innerText = chanceLeft;

    // Check if user guessed correctly
    if (value === randomNumber) {
        hiddenScreen.innerText = randomNumber;
        cell.style.backgroundColor = "green";
        endGame(true, "Congratulations!");
        cells.forEach(td => td.style.pointerEvents = "none"); // disable further clicks
        return;
    }

    // Check if chances are over
    if (chanceLeft <= 0) {
        endGame(false, "Chances Over!");
        cells.forEach(td => td.style.pointerEvents = "none");
        return;
    }

    // Give feedback to user
    statusScreen.innerText = value < randomNumber ? "Try greater number" : "Try smaller number";
};

// End game and update UI
const endGame = (win, message) => {
    statusScreen.innerText = message;
    statusScreen.style.color = win ? "green" : "red";
    statusScreen.style.fontSize = "26px";
    clearInterval(countDown);
    gameActive = false;

    // Unlock settings after game over
    settingsLocked = false;
    lockSettingsButtons(false);
};

// Reset the game completely
const resetGame = () => {
    clearInterval(countDown);
    timeLeft = 30;
    chanceLeft = 15;
    timeScreen.innerText = timeLeft;
    chanceScreen.innerText = chanceLeft;
    statusScreen.innerText = "Game Reset!";
    hiddenScreen.innerText = "?";

    randomNumber = generateRandomNumber(); // generate new hidden number

    settingsLocked = false;
    lockSettingsButtons(false);
    startGame(true); // restart game
};

// Add listeners for start and reset buttons after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    startBtn.addEventListener("click", () => {
        if (!gameActive) startGame();
    });

    resetBtn.addEventListener("click", resetGame);
});
