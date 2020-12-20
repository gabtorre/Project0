// Coint toss, Assigns mark x or o to player name
const game = {
  x: "",
  o: "",
  win: null,
  timeleft: 16,
};



//Keeps track of rounds and whos turn it is
let round = 0;



//Game controls section
let controls = $("#game-controls");



// Clears the game controls section
const clearControls = function () {
  controls.empty();
};



//timer function
function counter() {
  count = setInterval(timer, 1000);

  function timer() {
    if (game.timeleft <= 0) {
      timeUp();
      clearInterval(count);
      game.timeleft = 16;
      return;
    }

    game.timeleft = game.timeleft - 1;
    const timerdiv = $("#timer");
    //console.log(timeleft)
    timerdiv.html(`Time ${game.timeleft}`); //
  }
}



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

  $(".nav p:eq(0)").append(game.x);
  $(".nav p:eq(1)").append(game.o);

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
    $("#timer").empty();
    $(".nav p:nth-of-type(1)").addClass("green-border");
    controls.append(`
    <p class="x">X</p>
    <p>${game.x} goes first</p>
    <p class="small">Select a Category</p>
    `);
  }
};



const removeClick = function (mark) {
  for (let index = 1; index < 10; index++) {
    const beenClicked = $(`#${index}`).hasClass(mark);
    if (beenClicked || game.win) {
      $(`#${index}`).off("click");
    }
  }
};



// updates UI to show who's turn it is based on round
const showTurn = function () {
  if (round % 2 == 0 && game.win == null) {
    clearControls();
    $(".nav p:nth-of-type(1)").addClass("green-border");
    $(".nav p:nth-of-type(2)").removeClass("purple-border");
    controls.append(`
      <p><span class="x">X</span> ${game.x}'s turn</p>
      <p class="small">Select a Category</p>
      `);
  } else if (round % 2 !== 0 && game.win == null) {
    clearControls();
    $(".nav p:nth-of-type(1)").removeClass("green-border");
    $(".nav p:nth-of-type(2)").addClass("purple-border");
    controls.append(`
    <p><span class="o">O</span> ${game.o}'s turn</p>
      <p class="small">Select a Category</p>
      `);
  }
};



//adds click listeners to buttons
const addListeners = function () {
  $(".listen").each(function (index) {
    $(this).on("click", eval("getTrivia" + (index + 1)));
    $(this).on("click", handler);
    $(this).on("click", counter);
  });
};



// Adds class to mark which square triggered the trivia
function handler(event) {
  $(event.target).addClass("clicked");
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



//Shows trivia questions and choices
const showTrivia = function (json) {

  sound("./sounds/click.wav");

  clearControls();

  controls.append(`

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
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=12&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia2 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia3 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia4 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia5 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=14&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia6 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia7 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=10&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia8 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=26&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};

const getTrivia9 = function () {
  $.getJSON(
    "https://opentdb.com/api.php?amount=1&category=15&difficulty=easy&type=multiple",
    function (json) {
      showTrivia(json);
    }
  );
};



//Checks if answer is right and shows result 
const rightAnswer = function () {
  $("#right").on("click", function () {
    clearInterval(count);
    game.timeleft = 16;

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

    checkTie();

    removeClick("x");
    removeClick("o");

    clearControls();

    setTimeout(function () {
      showTurn();
    }, 1000);

    const correctAr = [
      "You got it!",
      "Right you are!",
      "Correct!",
      "Right!",
      "That's it!",
      "Yes!",
    ];

    controls.prepend(
      `<p>${correctAr[Math.floor(Math.random() * 6)]}</p> `
    );
  });
};



//Checks if answer is wrong and shows result 
const wrongAnswer = function () {
  $(".wrong").on("click", function () {
    clearInterval(count);
    game.timeleft = 16;

    let clicked = $(".clicked");

    clicked.removeClass("clicked");

    sound("./sounds/wrong.wav");

    addListeners();

    round++;

    winCombos("o", game.o);
    winCombos("x", game.x);

    checkTie();

    removeClick("x");
    removeClick("o");

    clearControls();

    setTimeout(function () {
      showTurn();
    }, 1000);

    const wrongAr = ["No", "Oh no!", "Wrong!", "Nope!"];

    controls.prepend(`<p>${wrongAr[Math.floor(Math.random() * 4)]}</p>`);
  });
};



//Ends round if time is up
const timeUp = function () {
  let clicked = $(".clicked");

  clicked.removeClass("clicked");

  sound("./sounds/wrong.wav");

  addListeners();

  round++;

  winCombos("o", game.o);
  winCombos("x", game.x);

  checkTie();

  removeClick("x");
  removeClick("o");

  showTurn();

  controls.prepend("<p>Time's Up</p> <hr>");
};



//Checks possible winning combos
const winCombos = function (who, name) {
  checkWin(who, name, "#1", "#2", "#3");
  checkWin(who, name, "#4", "#5", "#6");
  checkWin(who, name, "#7", "#8", "#9");
  checkWin(who, name, "#1", "#4", "#7");
  checkWin(who, name, "#2", "#5", "#8");
  checkWin(who, name, "#3", "#6", "#9");
  checkWin(who, name, "#1", "#5", "#9");
  checkWin(who, name, "#3", "#5", "#7");
};

//Checks possible winning combos
const checkWin = function (mark, player, num1, num2, num3) {
  const nameWin = `<p>${player} wins!</p>`;

  if (
    $(num1).hasClass(mark) &&
    $(num2).hasClass(mark) &&
    $(num3).hasClass(mark)
  ) {
    game.win = true;
    sound("./sounds/win.wav");
    clearControls();
    setTimeout(function () {
      controls.append(nameWin);
      controls.append(`<hr>
    <button><a href="https://gabtorre.github.io/Tic-Tac-Trivia/">Play Again</a></button>`);
    }, 800);

    $(num1).addClass("win");
    $(num2).addClass("win");
    $(num3).addClass("win");
  }
};



const checkTie = function (){
  // tied condition
  if ( game.win === null ){
    if ( $("#game-board .x").length > 4 || $("#game-board .o").length > 4 ) {
      game.win = "tie";
      clearControls();
      setTimeout(function () {
        controls.append(`<hr><p>Tie</p><hr><button><a href="https://gabtorre.github.io/Tic-Tac-Trivia/">Play Again</a></button>`);
      }, 800);
    }
  }
}