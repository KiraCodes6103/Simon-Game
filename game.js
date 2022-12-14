var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(this.id);
  animatePress(this.id);
  if (userClickedPattern.length <= level) {
    checkArray(userClickedPattern.length);
  }
});

$(document).on("keypress", function (event) {
  if (gameStarted === false) {
    gameStarted = true;
    nextSequence();
  }
});
//function to check the input
function checkArray(currentLevel) {
  if (arrEq(gamePattern.slice(0, currentLevel), userClickedPattern)) {
    if (currentLevel === level) {
      setTimeout(function () {
        nextSequence();
      }, 400);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game-Over");
    setTimeout(function () {
      $("h1").text("Press A Key to Start");
    }, 2000);
    level = 0;
    gameStarted = false;
    gamePattern = [];
    userClickedPattern = [];
  }
}
// function to be called when a sequence is needed
function nextSequence() {
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeOut();
  $("#" + randomColor).fadeIn();
  playSound(randomColor);
  level++;
}

//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//Array equality check function
function arrEq(arr1, arr2) {
  let arrLength;
  if ((arrLength = arr1.length) != arr2.length) return false;
  for (let i = 0; i < arrLength; i++) if (arr1[i] !== arr2[i]) return false;
  return true;
}
