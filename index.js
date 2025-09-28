let loginButton = document.getElementById("loginInterface"); // Select the login button using id
let signUpButton = document.getElementById("signInterface"); // Select the sign up button or link using id
let hiddenScreen = document.getElementById("hidden-box"); // Select the hidden guess number from this line
let statusScreen = document.querySelector(".score-update"); // Status screen to show the status

const showLogin = () => { // Function for shows the login interface and hide signup 
    loginButton.style.display = "flex"; // Enable login interface
    signUpButton.style.display = "none"; // Disable signup interface
}
const showSignUp = () => { // Function for shows the signup interface and hide login
    signUpButton.style.display = "flex"; // Enable signup interface
    loginButton.style.display = "none";  // Disable login interface
}

let choiceTime = document.querySelector(".timerBtn");
let choiceChance = document.querySelector(".chanceBtn");
let chanceOption = document.querySelector(".chance");
let timerOption = document.querySelector(".time");

choiceTime.addEventListener("click", (event) => {
    event.stopPropagation();
    timerOption.style.display = "block";
    chanceOption.style.display = "none";
    console.log("Timer button was clicked ..");
});

choiceChance.addEventListener("click", (event) => {
    event.stopPropagation();
    timerOption.style.display = "none";
    chanceOption.style.display = "block";
    console.log("Chance button was clicked ..");
});

timerOption.addEventListener("click", (event) => event.stopPropagation());
chanceOption.addEventListener("click", (event) => event.stopPropagation());

document.addEventListener("click", () => {
    chanceOption.style.display = "none";
    timerOption.style.display = "none";
});

let timeBtn = document.querySelectorAll("#setTime span");
let timeScreen = document.getElementById("remainingTime");
let timeLeft = 30;

timeBtn.forEach(btn => {    // This function for check which time button is click by user
    btn.addEventListener("click", () => {
        const value = btn.innerText.trim();
        if (value === "10") {
            console.log("Ten");
            timeScreen.innerText = value;
            timeLeft = value;
        } else if (value === "30") {
            console.log("Thirty");
            timeScreen.innerText = value;
            timeLeft = value;
        } else {
            console.log("Sixty");
            timeScreen.innerText = value;
            timeLeft = value;
        }
    });
});

let chanceBtn = document.querySelectorAll("#setChance span");
let chanceScreen = document.getElementById("remainingChance");
let chanceLeft = 15;

chanceBtn.forEach(btn => {    // This funtion for check which chance button is click by user
    btn.addEventListener("click", () => {
        const value = btn.innerText.trim();
        if (value === "5") {
            console.log("Five");
            chanceScreen.innerText = value;
            chanceLeft = value;
        } else if (value === "10") {
            console.log("Ten");
            chanceScreen.innerText = value;
            chanceLeft = value;
        } else {
            console.log("Fifteen");
            chanceScreen.innerText = value;
            chanceLeft = value;
        }
    })
});


// Start from here
let random = Math.floor(Math.random() * 105); // Declare an varible which store random value
const generateRandom = () => {  // Function to generate random value 
    return random; // Return random value verifying or any uses
}

const startGame = () => { // Start game function 
    generateRandom(random); // Calling the random function
    console.log(random);
    const countDown = setInterval(() => { // Declare an countdown fucntion for time counting
        timeScreen.innerText = timeLeft; // Print the timeLeft
        timeLeft--; // Decrease time by 1 sec
        if (timeLeft < 0) {
            clearInterval(countDown); // Clear the time interval
            timeScreen.innerText = "Time Up!"
            console.log("Time Up !");
        }
    }, 1000);

    let cells = document.querySelectorAll(".game-console-input-keyboard td"); // Select all td tag from this line 
    cells.forEach((cell) => { // Iterate through each cell 
        cell.addEventListener("click", function () { // Add event listener to check which button is click
            // console.log("Value: " + cell.textContent);
            this.style.backgroundColor = "red";
            chanceLeft--; // Decrease chance by 1 after click
            chanceScreen.innerText = chanceLeft; // Print the chance
            if (chanceLeft <= 0) { //
                chanceScreen.innerText = chanceLeft;
                statusScreen.innerText = "GameOver";
                console.log("Chance is Over");
                cells.forEach(td => td.style.pointerEvents = "none"); // Block the cells after chance is zero
            }
            const value = Number(cell.textContent);
            if (random == value) {
                statusScreen.innerText = "Congratulations";
                statusScreen.style.color = "green";
                statusScreen.style.fontSize = "26px"
                hiddenScreen.innerText = random;
                this.style.backgroundColor = "green";
                cells.forEach(td => td.style.pointerEvents = "none");
                clearTimeout(countDown);
            } else if (value < random) {
                statusScreen.innerText = "Try greater one ";
            } else {
                statusScreen.innerText = "Try  Smaller one ";
            }
        });
    });
}
const restartGame = () => {
    console.log("game reset");
}