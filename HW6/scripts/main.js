// create an array of image names that correspond to the image tags
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];

// create a variable with the blank image name
var blankImagePath = "images/back.png";
// create a empty array for the actual images
var actualImages = new Array();

var firstNumber = -1;
var secondNumber = -1;

var player = { "firstname": "", "lastname": "", "age": "", "attemptCounts": "" };

var attemptCount = 0;

var matchCount = 0;
var totalPairs = 6;

function printBlanks() {
    // call our random image creation function
    createRandomImageArray();
    // create a for loop
    for (var i = 0; i < imageTags.length; i++) {
        // iterate through the image tag ids and sets the source 
        document.getElementById(imageTags[i]).src = blankImagePath;
    }



}

function createRandomImageArray() {
    // create an array of actual images
    var actualImagePath = ["images/Ace.png", "images/King.png", "images/Jack.png", "images/Joker.png", "images/Queen.png", "images/Seven.png"];
    // create another array to make sure the images only get added twice
    var count = new Array(actualImagePath.length).fill(0);
    // create a while statement to check to see if our actual image array is full
    while (actualImages.length <12){
        // get a random number between 0 and the number total number of images that we can choose from
        var randomNumber = Math.floor(Math.random() * actualImagePath.length)
        // create an if statement that says if the total number added is less than 2, then
        // add the image to the actual image array
        if (count[randomNumber] < 2) {
            actualImages.push(actualImagePath[randomNumber]);
            // then add one to the array that makes sure only two images can be added
            count[randomNumber] = count[randomNumber] + 1;
        }
    }





}
function flipImage(number) {

    // make the second image appear
    if (firstNumber >= 0) {
        secondNumber = number;
        document.getElementById(imageTags[number]).src = actualImages[secondNumber];

    }
    else if (firstNumber < 0) // make the first image appear
    {
        firstNumber = number;
        document.getElementById(imageTags[firstNumber]).src = actualImages[firstNumber];

    }

    // check to see if the images do not match
    if (actualImages[secondNumber] != actualImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0) {
        setTimeout(imagesDisappear, 1000); // calls a method after 1 second
        attemptCount++;
        updateAttempts();
    }
    // check to see if the images do match
    else if (actualImages[secondNumber] == actualImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0) {
        firstNumber = -1;
        secondNumber = -1;
        matchCount++;
        checkWin();
    }



}

function imagesDisappear() {
    console.log(firstNumber, secondNumber);

    if (
        firstNumber >= 0 &&
        secondNumber >= 0 &&
        document.getElementById(imageTags[firstNumber]) &&
        document.getElementById(imageTags[secondNumber])
    ) {
        document.getElementById(imageTags[firstNumber]).src = blankImagePath;
        document.getElementById(imageTags[secondNumber]).src = blankImagePath;
    }

    firstNumber = -1;
    secondNumber = -1;
}

// add to the JSON from the textboxes
function addToPlayer() {
    var firstName = document.getElementById("txtFirstName").value;
    console.log(firstName);
    player.firstname = firstName;
   

    var lastName = document.getElementById("txtLastName").value;
    console.log(lastName);
    player.lastname = lastName;

    var Age = document.getElementById("txtAge").value;
    console.log(Age);
    player.age = Age;
  
    localStorage.setItem("playerInfo", JSON.stringify(player));
    window.location = "index.html";
}

// get the information out of JSON
function playerInfo() {
    var playerInformation = localStorage.getItem("playerInfo");
    player = JSON.parse(playerInformation);
    console.log(player.firstname);
    console.log(player.lastname);
    console.log(player.age);

}

function updateAttempts() {
    document.getElementById("attemptCounter").textContent = "Attempts: " + attemptCount;
}

function checkWin() {
    if (matchCount === totalPairs) {
        player.attemptCounts = attemptCount;
        localStorage.setItem("playerInfo", JSON.stringify(player));
        window.location = "JSON.html";
    }
}