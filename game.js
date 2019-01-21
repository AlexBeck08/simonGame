var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence() {
   level++;
   $('h1').text('Level ' + level);
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
}

function playSound(name) {
   var audio = new Audio('sounds/' + name + '.mp3');
   audio.play();
}

function playWrongSound() {
   var audio = new Audio('sounds/wrong.mp3');
   audio.play();
}

function animatePress(currentColor) {
   $('.' + currentColor).addClass('pressed');
   setTimeout(function() {
      $('.' + currentColor).removeClass('pressed');
   }, 100);
}

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function() {
            nextSequence();
            userClickedPattern = [];
         }, 1000);
      }
   } else {
      $('body').addClass('game-over');
      setTimeout(function() {
         $('body').removeClass('game-over');
      }, 200);
      $('h1').text('Game Over, Press Any Key To Restart');
      playWrongSound();
      startOver();
   }
}

function startOver() {
   level = 0;
   gamePattern = [];
   userClickedPattern = [];
}

$('.btn').on('click', function(event) {
   var userChosenColor = event.target.id;
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
   if (gamePattern.length < 1) {
      nextSequence();
      $('h1').text("Level " + level);
   }
});