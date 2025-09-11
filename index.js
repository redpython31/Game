let random = Math.floor(Math.random() * 105); // Declare an varible which store random value
let loginButton = document.getElementById("loginInterface"); // Select the login button using id
let signUpButton = document.getElementById("signInterface"); // Select the sign up button or link using id
let hiddenScreen = document.getElementById("hidden-box"); // Select the hidden guess number from this line
let statusScreen = document.getElementsByClassName(".score-update"); // Status screen to show the status

const showLogin = () => { // Function for shows the login interface and hide signup 
    loginButton.style.display = "flex"; // Enable login interface
    signUpButton.style.display = "none"; // Disable signup interface
}
const showSignUp = () => { // Function for shows the signup interface and hide login
    signUpButton.style.display = "flex"; // Enable signup interface
    loginButton.style.display = "none";  // Disable login interface
}

const trialGame = () => { // Function for redirect on another game web
    location = ("http://127.0.0.1:5500/numberhunt.html"); // When user press the playnow button this will redirect to game web
}
const generateRandom = (random) => {  // Function to generate random value 
    console.log(random); // This line is for debugging in only nolonger use in code
    return random; // Return random value verifying or any uses
}
// Start from here
let cells = document.querySelectorAll("td"); // Select all td tag from this line 
cells.forEach((cell, index) => { // 
    cell.addEventListener("click", function () { // Add event listener to check which button is click
        console.log("Index: " + index + " | Value: " + cell.textContent);
    })
});