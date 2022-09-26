var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Thanks to this link https://dev.to/rfornal/-replacing-jquery-with-vanilla-javascript-1k2g#working-with-events

document.addEventListener("keydown", () => {
  if(!started) {
    document.querySelector("#level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
})

//This one was tricky
document.querySelectorAll(".btn").forEach((bt) => {
  bt.onclick = () => {

    let userChosenColor = bt.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern)
  };
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  document.querySelector("#" + currentColor).classList.add("pressed");
  setTimeout(function() {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success")

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  }
  else {

    playSound("wrong");

    document.querySelector("body").classList.add("game-over");
    setTimeout(function() {
      document.querySelector("body").classList.remove("game-over");
    }, 200)

    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

    startOver();
    console.log("wrong");
  }
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  document.querySelector("#level-title").textContent = "Level " + level;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //Second tricky part.
  document.querySelector("#" + randomChosenColor).classList.add("hidden");
  setTimeout(() => {
    document.querySelector("#" + randomChosenColor).classList.remove("hidden");
  }, 100)

  playSound(randomChosenColor)
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
