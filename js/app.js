
let timeleft = 15;

function counter() {
  count = setInterval(timer, 1000);
}

function timer() {

  if (timeleft <= 0) {
    timeUp();
    clearInterval(count);
    timeleft = 15;
    return;
  }

  timeleft = timeleft - 1;
  const timerdiv = $("#timer");
  //console.log(timeleft)
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

sound("./sounds/start.wav");

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
    //$(`#${index}`).on("click", getTrivia);
    $(`#${index}`).on("click", handler);
    $(`#${index}`).on("click", counter);
  }
  $("#1").on("click", getTrivia1);
  $("#2").on("click", getTrivia2);
  $("#3").on("click", getTrivia3);
  $("#4").on("click", getTrivia4);
  $("#5").on("click", getTrivia5);
  $("#6").on("click", getTrivia6);
  $("#7").on("click", getTrivia7);
  $("#8").on("click", getTrivia8);
  $("#9").on("click", getTrivia9);
};



// Adds class to mark which square triggered the trivia 
function handler( event ) {
$( event.target ).addClass("clicked")
}

//Shuffle function to shuffle answers https://css-tricks.com/snippets/jquery/shuffle-children/
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


const showTrivia = function (json) {
  sound("./sounds/click.wav");

  clearControls();

  controls.append(`
  <p id="timer">Time 15</p>
  <p class="trivia">${json.results[0].question}</p>
  <div class="btns">
  <button id="right" class="right">${json.results[0].correct_answer}</button>
  <button class="wrong">${json.results[0].incorrect_answers[0]}</button>
  <button class="wrong">${json.results[0].incorrect_answers[1]}</button>
  <button class="wrong">${json.results[0].incorrect_answers[2]}</button>
  </div>
  `);

  $(".btns").shuffleChildren();

  removeClick("clicked");
  removeClick("x");
  removeClick("square");

  rightAnswer();
  wrongAnswer();
};

//Gets questions to display
const getTrivia1 = function () { 
  $.getJSON("https://opentdb.com/api.php?amount=1&category=12&difficulty=easy&type=multiple", function(json) {
  showTrivia(json);
});
}

const getTrivia2 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const getTrivia3 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const getTrivia4 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const getTrivia5 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=14&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const getTrivia6 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const getTrivia7 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=10&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const getTrivia8 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=26&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const getTrivia9 = function () { 
  
  $.getJSON("https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=multiple", function(json) {
    showTrivia(json);
});
}

const rightAnswer = function () {
  $("#right").on("click", function () {

    clearInterval(count);
    timeleft = 15;

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
    timeleft = 15;

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

    controls.prepend("<p>Time's Up</p> <hr>");

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


$("#reload").on("click", function() {
  location.reload();
});


//Checks possible winning combos
const checkWin = function (mark, player, num1, num2, num3) {

  const nameWin = `<p>${player} wins!</p>`;

  if ( $(num1).hasClass(mark) && $(num2).hasClass(mark) && $(num3).hasClass(mark) ) {
    game.win = true;
    sound("./sounds/win.wav");
    clearControls();
    controls.append(nameWin);
    controls.append(`<hr><button><a href="https://gabtorre.github.io/Tic-Tac-Trivia/">Play Again</a></button>`)
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
