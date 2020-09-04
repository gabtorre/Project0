
let timeleft = 10;

function counter() {
  count = setInterval(timer, 1000);
}

function timer() {

  
  if (timeleft <= 0) {
    timeUp();
    clearInterval(count);
    timeleft = 10;
    return;
  }

  timeleft = timeleft - 1;
  const timerdiv = $("#timer");
  console.log(timeleft)
  timerdiv.html(`Time ${timeleft}`)//
}


// Coint toss, Assigns mark x or o to player name
const game = {
  x: "",
  o: "",
  win: null,
}
//Keeps track of rounds and whos turn it is
let round = 0;
//Game controls section
let controls = $("#game-controls");
// Clears the game controls section
const clearControls = function () {
  controls.empty();
};
// Gets player names from DOM
$("#submit-names").on("click", function () {

sound("./sounds/click.wav");

const player1 = document.getElementById("player1").value;
const player2 = document.getElementById("player2").value;
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

// Sound functions
function sound(file) {
  const obj = document.createElement("audio");
  obj.src = file;
  obj.play();
}

//After names are entered, clears form and shows who goes first
const showFirst = function () {
  //shows who goes first
  clearControls();
  if (round == 0) {
    controls.append(`
    <p class="x">X</p>
    <p>${game.x} goes first</p>
    <p class="small">Select a Category</p>
    `);
  }
};

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
  if (round % 2 == 0 && game.win == null) {
    clearControls();
    controls.append(`
      <p>${game.x}'s turn</p>
      <p class="x">X</p>
      <p class="small">Select a Category</p>
      `);
  } else if (round % 2 !== 0 && game.win == null) {
    clearControls();
    controls.append(`
      <p>${game.o}'s turn</p>
      <p class="o">O</p>
      <p class="small">Select a Category</p>
      `);
  }
};

//adds click listeners to buttons
const addListeners = function () {
  for (let index = 1; index < 10; index++) {
    $(`#${index}`).on("click", getTrivia);
    $(`#${index}`).on("click", handler);
    $(`#${index}`).on("click", counter);
  }
};

// Adds class to mark which square triggered the trivia 
function handler( event ) {
$( event.target ).addClass("clicked")
}

//Shuffle function to shuffle annswers https://css-tricks.com/snippets/jquery/shuffle-children/
$.fn.shuffleChildren = function () {
  $.each(this.get(), function (index, el) {
    var $el = $(el);
    var $find = $el.children();

    $find.sort(function () {
      return 0.5 - Math.random();
    });

    $el.empty();
    $find.appendTo($el);
  });
};

//Gets questions to display
const getTrivia = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple", function(json) {
         console.log(json)

         

         sound("./sounds/click.wav");

         clearControls();
        

         controls.append(`
         <p id="timer">Time 10</p>
         <p class="trivia">${json.results[0].question}</p>
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

const rightAnswer = function () {
  $("#right").on("click", function () {
    clearInterval(count);
    timeleft = 10;

    let clicked = $(".clicked");
    if (round % 2 == 0) {
      clicked.addClass("x").text("x");
      clicked.removeClass("clicked");
    } else {
      $(".clicked").addClass("o").text("o");
      clicked.removeClass("clicked");
    }

    sound("./sounds/correct.wav");

    addListeners();

    round++;

    winCombos("o", game.o);
    winCombos("x", game.x);

    removeClick("x");
    removeClick("o");

    const correctAr = [
      "You got it!",
      "Right you are!",
      "Correct!",
      "Right!",
      "That's it!",
      "Yes!",
    ];

    showTurn();
    controls.prepend(
      `<p>${correctAr[Math.floor(Math.random() * 6)]}</p>  <hr>`
    );
  });
};

const wrongAnswer = function () {
  
  $(".wrong").on("click", function () {

    clearInterval(count);
    timeleft = 10;

    let clicked = $(".clicked");

    clicked.removeClass("clicked");

    sound("./sounds/wrong.wav");

    addListeners();

    round++;

    winCombos("o", game.o);
    winCombos("x", game.x);

    removeClick("x");
    removeClick("o");

    showTurn();

    const wrongAr = ["No", "Oh no!", "Wrong!", "Nope!"];

    controls.prepend(`<p>${wrongAr[Math.floor(Math.random() * 4)]}</p> <hr>`);
  });
};


const timeUp = function () {
  
    let clicked = $(".clicked");

    clicked.removeClass("clicked");

    sound("./sounds/wrong.wav");

    addListeners();

    round++;

    winCombos("o", game.o);
    winCombos("x", game.x);

    removeClick("x");
    removeClick("o");

    showTurn();

    controls.prepend("<p>Time's Up</p>");

};


const winCombos = function (who, name) {
  checkWin(who, name,"#1","#2","#3")
  checkWin(who, name,"#4","#5","#6")
  checkWin(who, name,"#7","#8","#9")
  checkWin(who, name,"#1","#4","#7")
  checkWin(who, name,"#2","#5","#8")
  checkWin(who, name,"#3","#6","#9")
  checkWin(who, name,"#1","#5","#9")
  checkWin(who, name,"#3","#5","#7")
}

//Checks possible winning combos
const checkWin = function (mark, player, num1, num2, num3) {

  const nameWin = `<p>${player} wins!</p>`;

  if ( $(num1).hasClass(mark) && $(num2).hasClass(mark) && $(num3).hasClass(mark) ) {
    game.win = true;
    sound("./sounds/win.wav");
    clearControls();
    controls.append(nameWin);
    $(num1).addClass("win")
    $(num2).addClass("win")
    $(num3).addClass("win")
  }

  // tied condition
  else if (  $(".x").length == 5 && $(".y").length == 4 ){
    game.win = "tie";
    clearControls();
    controls.append(`<p>Tie</p>`);
  }
}

const timeOver = function(){

  clearTimeout(timer);
    //time = 5;

    let clicked = $(".clicked");
  
    clicked.removeClass("clicked");
  
    addListeners();
  
    round++;
  
    checkWin("x", game.x);
    checkWin("o", game.o);
  
    removeClick("x");
    removeClick("o");
  
    showTurn();
    controls.prepend("<p>Time's Up</p>");
  }


