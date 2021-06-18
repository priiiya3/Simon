var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStart = false;

$(document).keypress(function() {
    if (!gameStart){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
    
});


//Array to store the pattern of user-clicked buttons.
$(".btn").click(function() {

    var userChosenColour =  $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});


// Function to check that the User-Clicked pattern matches with
// the Computer generated Pattern.

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart.");    
        
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
};


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    // Adding Flash Effect to the Randomly Choosen buttonColours.

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour);
}


// Adding Sound Effect to the Randomly Choosen buttonColours.
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};



function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    // Removing the color grey after 100 milisecond.
    setTimeout(function() {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
};

// Restarts the Game.
function startOver(){
    level = 0;
    gamePattern = [];
    gameStart = false;
}
