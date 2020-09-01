// Coint toss, Assigns mark x or o to player name
const game = {
    x: "",
    o: "",
}
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
  showRound();
});
//////////////////////////////////////////////////////////


//Removes event listener so square can't be clicked twice
const removeClick = function () {

  for (let index = 1; index < 10; index++) {
      
    const beenClicked = $(`#${index}`).hasClass("x");

    if (beenClicked) {
      $(`#${index}`).off("click");
    }
  }

  for (let index = 1; index < 10; index++) {

    const beenClicked = $(`#${index}`).hasClass("o");

    if (beenClicked) {
      $(`#${index}`).off("click");
    }
  }
};


//Keeps track of rounds and whos turn it is
let round = 0;

const addMark = function (event) {
  if (round % 2 == 0) {
    $(event.target).text("x").addClass("x");
  } else {
    $(event.target).text("o").addClass("o");
  }

  round++;
  console.log(event.target);
  console.log(round);
  checkWin("x", game.x);
  checkWin("o", game.o);

  removeClick();

};


//After names are entered, clears form and shows who goes first
const showRound = function () {
    $("#game-controls").empty();
    if (round == 0) {
    $("#game-controls").append(`<p>${game.x} goes first</p>`)
    }

    //Makes the squares clickable
    $("#1").on("click", addMark);
    $("#2").on("click", addMark);
    $("#3").on("click", addMark);
    $("#4").on("click", addMark);
    $("#5").on("click", addMark);
    $("#6").on("click", addMark);
    $("#7").on("click", addMark);
    $("#8").on("click", addMark);
    $("#9").on("click", addMark);
}


// const handleClick = function(event){
//     const beenClicked = $(event.target).hasClass("red blue"); // returns true or false
 
//     if(beenPoked){
//       $(event.target)
//     }
//   }


//Checks possible winning
const checkWin = function (mark, player) {

    if ( $("#1").hasClass(mark) && $("#2").hasClass(mark) && $("#3").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);
    } else if ( $("#4").hasClass(mark) && $("#5").hasClass(mark) && $("#6").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    } else if ( $("#7").hasClass(mark) && $("#8").hasClass(mark) && $("#9").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    } else if ( $("#1").hasClass(mark) && $("#4").hasClass(mark) && $("#7").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    } else if ( $("#2").hasClass(mark) && $("#5").hasClass(mark) && $("#8").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    } else if ( $("#3").hasClass(mark) && $("#6").hasClass(mark) && $("#9").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    } else if ( $("#3").hasClass(mark) && $("#6").hasClass(mark) && $("#9").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    } else if ( $("#1").hasClass(mark) && $("#5").hasClass(mark) && $("#9").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    } else if ( $("#3").hasClass(mark) && $("#5").hasClass(mark) && $("#7").hasClass(mark) ) {
        $("#game-controls").empty();
    $("#game-controls").append(`<p>${player} ${mark} wins</p>`);;
    }
}


