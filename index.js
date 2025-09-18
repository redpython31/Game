// let random = Math.floor(Math.random() * 105); // Declare an varible which store random value
let loginButton = document.getElementById("loginInterface"); // Select the login button using id
let signUpButton = document.getElementById("signInterface"); // Select the sign up button or link using id
// let hiddenScreen = document.getElementById("hidden-box"); // Select the hidden guess number from this line
// let statusScreen = document.getElementsByClassName(".score-update"); // Status screen to show the status
// const generateRandom = (random) => {  // Function to generate random value 
//     console.log(random); // This line is for debugging in only nolonger use in code
//     return random; // Return random value verifying or any uses
// }

const showLogin = () => { // Function for shows the login interface and hide signup 
    loginButton.style.display = "flex"; // Enable login interface
    signUpButton.style.display = "none"; // Disable signup interface
}
const showSignUp = () => { // Function for shows the signup interface and hide login
    signUpButton.style.display = "flex"; // Enable signup interface
    loginButton.style.display = "none";  // Disable login interface
}

// Start from here
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

// agar menus ke andar click hua toh bhi document listener na chale
timerOption.addEventListener("click", (event) => event.stopPropagation());
chanceOption.addEventListener("click", (event) => event.stopPropagation());

document.addEventListener("click", () => {
    chanceOption.style.display = "none";
    timerOption.style.display = "none";
});


let timeBtn = document.querySelectorAll(".game-console-box-mode-userInput span");
timeBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        const value = btn.innerText.trim();
        if (value === "10") {
            console.log("ten");
        } else if (value === "30") {
            console.log("thir");
        } else {
            console.log("sixty");
        }
    });
});

// let timeScreen = document.getElementById("remainingtime");
// timeScreen.innerHTML = "hello";
// const countDown = setInterval(() => {
//     // timeScreen.innerText = time;
//     console.log(timeLeft);
//     timeLeft--;
//     if (time < 0) {
//         clearInterval(countDown);
//         console.log("time up");
//     }
// }, 1000);

let cells = document.querySelectorAll(".game-console-input-keyboard td"); // Select all td tag from this line 
cells.forEach((cell, index) => { // 
    cell.addEventListener("click", function () { // Add event listener to check which button is click
        console.log("Index: " + index + " | Value: " + cell.textContent);
    });
});
