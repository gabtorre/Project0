// Coint toss, Assigns mark x or o to player name
const game = {
  x: "",
  o: "",
  win: null,
}
//Keeps track of rounds and whos turn it is
let round = 0;
let controls = $("#game-controls");
// Gets player names from DOM
$("#submit-names").on("click", function () {
const player1 = document.getElementById("player1").value;
//console.log(player1);
const player2 = document.getElementById("player2").value;
//console.log(player2);
// True or false 50/50
randNum = Math.floor(Math.random() * 2) == 0;
// Assigns x and o
if (randNum) {
  game.x = player1;
  game.o = player2;
} else {
  game.x = player2;
  game.o = player1;
}
showFirst();
addListeners();
});
//////////////////////////////////////////////////////////
//HELPER FUNCTIONS
//////////////////////////////////////////////////////////
// Clears the game controls section
const clearControls = function () {
controls.empty();
}
/////


//After names are entered, clears form and shows who goes first
const showFirst = function () {
//shows who goes first
clearControls();
if (round == 0) {
controls.append(`<p>${game.x} goes first (X)</p>`)
} 
}

//Removes event listener so square can't be clicked twice
const removeClick = function (mark) {

//removes click if game is won
for (let index = 1; index < 10; index++) {
  if (game.win) {
    $(`#${index}`).off("click");
  }
}

//removes click if suqare is marked with x or o
for (let index = 1; index < 10; index++) {
  const beenClicked = $(`#${index}`).hasClass(mark);
  if (beenClicked) {
    $(`#${index}`).off("click");
  }
}
};

// updates UI to show who's turn it is
const showTurn = function () {
if ( round % 2 == 0 && game.win == null ) {
  clearControls();
  controls.append(`<p>${game.x}'s turn (X)</p>`)
} else if (  round % 2 !== 0 && game.win == null ) {
  clearControls();
  controls.append(`<p>${game.o}'s turn (O)</p>`)
}
}


//adds click listeners to buttons
const addListeners = function () {
for (let index = 1; index < 10; index++) {
  $(`#${index}`).on("click", getTrivia);
  $(`#${index}`).on("click", handler);
}
};



function handler( event ) {
$( event.target ).addClass("clicked")
//$(event.target).text("?")

console.log(event.target)

}


//Shuffle function https://css-tricks.com/snippets/jquery/shuffle-children/
$.fn.shuffleChildren = function() {
$.each(this.get(), function(index, el) {
  var $el = $(el);
  var $find = $el.children();

  $find.sort(function() {
    return 0.5 - Math.random();
  });

  $el.empty();
  $find.appendTo($el);
});
};

// $("#shuffle").click(function() {
//   // Usage

// });

const getTrivia = function () { $.getJSON("https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple", function(json) {
         console.log(json)

         

         clearControls();
         controls.append(`<p class="trivia">${json.results[0].question}</p>`)

         controls.append(`
         
         <div class="btns">
         <button id="right" class="right">${json.results[0].correct_answer}</button>
         <button class="wrong">${json.results[0].incorrect_answers[0]}</button>
         <button class="wrong">${json.results[0].incorrect_answers[1]}</button>
         <button class="wrong">${json.results[0].incorrect_answers[2]}</button>
         </div>
         
         `)

        $(".btns").shuffleChildren();

         removeClick("clicked");
         removeClick("x");
         removeClick("square");

         rightAnswer();
         wrongAnswer();
});
}

const rightAnswer = function(){

$("#right").on("click", function () {
let clicked = $(".clicked");
if (round % 2 == 0) {
  clicked.addClass("x").text("x");
  clicked.removeClass("clicked");
} else {
  $(".clicked").addClass("o").text("o");
  clicked.removeClass("clicked");
}

addListeners();

round++;

checkWin("x", game.x);
checkWin("o", game.o);

removeClick("x");
removeClick("o");

showTurn();
controls.prepend("<p>Correct</p>")
});
}

const wrongAnswer = function(){

$(".wrong").on("click", function () {
  let clicked = $(".clicked");

  clicked.removeClass("clicked");

  addListeners();

  round++;

  checkWin("x", game.x);
  checkWin("o", game.o);

  removeClick("x");
  removeClick("o");

  showTurn();
  controls.prepend("<p>Wrong</p>")
});
}

//Checks possible winning combos
const checkWin = function (mark, player) {

  if ( $("#1").hasClass(mark) && $("#2").hasClass(mark) && $("#3").hasClass(mark) ) {    game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#1, #2, #3").addClass("win")
  } 
  
  else if ( $("#4").hasClass(mark) && $("#5").hasClass(mark) && $("#6").hasClass(mark) ) {game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#4, #5, #6").addClass("win")
  } 
  
  else if ( $("#7").hasClass(mark) && $("#8").hasClass(mark) && $("#9").hasClass(mark) ) {game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#7, #8, #9").addClass("win")
  } 
  
  else if ( $("#1").hasClass(mark) && $("#4").hasClass(mark) && $("#7").hasClass(mark) ) {game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#1, #4, #7").addClass("win")
  } 
  
  else if ( $("#2").hasClass(mark) && $("#5").hasClass(mark) && $("#8").hasClass(mark) ) {game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#2, #5, #8").addClass("win")
  } 
  
  else if ( $("#3").hasClass(mark) && $("#6").hasClass(mark) && $("#9").hasClass(mark) ) {game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#3, #6, #9").addClass("win")
  } 
  
  else if ( $("#1").hasClass(mark) && $("#5").hasClass(mark) && $("#9").hasClass(mark) ) {game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#1, #5, #9").addClass("win")
  } 
  
  else if ( $("#3").hasClass(mark) && $("#5").hasClass(mark) && $("#7").hasClass(mark) ) {game.win = true;
      clearControls();
  controls.append(`<p>${player} ${mark} wins</p>`);
  $("#3, #5, #7").addClass("win")
  } 
  // tied condition
  else if (  $(".x").length == 5 ){
    game.win = "tie";
    clearControls();
    controls.append(`<p>Tie</p>`);
  }
}