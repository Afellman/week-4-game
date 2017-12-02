$(document).ready(function () {
  //GLOBAL VARIABLES

  // var to store chosen player and enemy
  var player;
  var enemy;

  //var to store player attack points
  var playerAp;

  //toggle to listen for character choice
  var charIsChosen = 0;
  var enemyIsChosen = 0;

  var charLeft = 3;
  //object storing the character data
  var charObj = {
    stan: {
      "name": "Stan", 
      "ap" : 15,
      "hp": 115
    },

    kyle: {
      "name": "Kyle",
      "ap" : 12,
      "hp" : 120
    },

    kenny: {
      "name" : "Kenny",
      "ap" : 20,
      "hp" : 75
    },

    cartmen: {
      "name" : "Cartmen",
      "ap": 10,
      "hp": 150
    },
  }
  //--------------------------------------------------------------

  //function to print characters 1 by 1.
  var showText = function (target, message, index, interval) {   
    if (index < message.length) {
      $(target).append(message[index++]);
      setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
  }
  //function to start the game, resetting the page and redrawing the characters.
  function newGame (){
    $(".char-row").empty();
    $(".fight-row").empty();
    $(".text-row").empty();
    player = "";
    enemy = "";
    
    charIsChosen = 0;
    enemyIsChosen = 0;
    
    charObj = {
      stan: {
        "name": "Stan", 
        "ap" : 15,
        "hp": 115
      },
      
      kyle: {
        "name": "Kyle",
        "ap" : 10,
        "hp" : 150
      },
      
      kenny: {
        "name" : "Kenny",
        "ap" : 7,
        "hp" : 75
      },
      cartmen: {
        "name" : "Cartmen",
        "ap": 25,
        "hp": 100
        
      },
    }
    $(function () {
      showText(".text-row", 'Choose Your Character!', 0, 40 )
    });
    //draws the characters to the DOM
    for (var key in charObj) {
      console.log(charObj[key])
      console.log(key);
      var divInsert = '<div id="' + key + '" class="chars char-select rounded center bg-dark text-white">' + key + '<p class="stats">HP: ' + charObj[key]["hp"] + " AP: " +charObj[key]["ap"] + '</div>'
      $(".char-row").append(divInsert)
    };
    clicks();
  };
  //--------------------------------------------------------------

  //function to listen for and react to clicks
  function clicks() {
    //listens for a click on a character
    $(".chars").on("click", function () {
      console.log("onclick")
      //sets first click to player and flips player toggle so it can't be chosen again. 
      if (charIsChosen == 0){
        $(".fight-row").append(this);
        charIsChosen = 1;
        $(this).attr("class", function () { return $(this).attr("class") + " player"});
        $(this).children("p").attr("class", function () { return $(this).attr("class") + " player-stats"});
        player = $(".player").attr("id");
        playerAp = charObj[player]['ap'];
        $(function () {
          $('.text-row').empty();
          showText(".text-row", 'Choose Your Enemy!', 0, 40 )
        });
      }
      //sets next click(s) to enemy and flips toggle.
      else if (enemyIsChosen == 0 ){
        $(this).remove();
        $(".fight-row").append("<button class='attack btn btn-primary'>Attack");
        $(".fight-row").append(this);
        enemyIsChosen = 1;
        $(this).attr("class", function () { return $(this).attr("class") + " bg-danger enemy"});
        $(this).children("p").attr("class", function () { return $(this).attr("class") + " enemy-stats"});
        enemy = $(".enemy").attr("id");
        $(".enemy").removeClass("bg-light")
        roundStart();
      }
    });
  };
  //--------------------------------------------------------------

    //function to start each round. addes
   function roundStart() {
    $(function () {
      $('.text-row').empty();
      showText(".text-row", 'FIGHT!', 0, 40 )
    });
    $(".player").removeClass("char-select");
    $(".enemy").removeClass("char-select");
    $(".attack").on("click", function(){
      charObj[player]["hp"] -= charObj[enemy]["ap"];
      charObj[enemy]["hp"] -= charObj[player]["ap"];
      charObj[player]["ap"] += playerAp; 
      $(".player-stats").text('HP: ' + charObj[player]["hp"] + " AP: " +charObj[player]["ap"]);
      $(".enemy-stats").text('HP: ' + charObj[enemy]["hp"] + " AP: " +charObj[enemy]["ap"]);
      if (charObj[enemy]["hp"] <= 0) {
        console.log(enemy);
        $(".enemy").remove();
        $(".attack").remove();
        enemyIsChosen = 0;
        $(function () {
          $('.text-row').empty();
          showText(".text-row", 'Owned!', 0, 40 );
        });
        charLeft -= 1;
        console.log(charLeft);
        if (charLeft == 0) {
          console.log("wingame");
          setTimeout(function() { 
            winGame()}
          , 800);
          
        }
        else {
          setTimeout(function() { 
            $(function () {
              $('.text-row').empty();
              showText(".text-row", 'Choose Your Next Enemy!', 0, 40 );
            });}
          , 800);
        clicks();
        };
 
        
      }
      else if (charObj[player]["hp"] <= 0){
        loseGame();
      }
      
    });
  };
  //--------------------------------------------------------------

  //function for tell the user that they lost and ask if they want to play again
  function loseGame(){
    $(".text-row").html('<h1>You Lose...</h1>');
    setTimeout(function() {
      $(".text-row").empty();
      $(".text-row").append("<button class='play-again btn btn-primary p-3'>Play Again");
      $(".play-again").on('click', newGame);
    },800
    );
  }

  //--------------------------------------------------------------

  //function to tell the user they won and ask if they want to play again
  function winGame() {
    $(".text-row").html('<h1>You Win!!!!!!!!</h1>');
    setTimeout(function() {
      $(".text-row").empty();
      $(".text-row").append("<button class='play-again btn btn-primary p-3'>Play Again");
      $(".play-again").on('click', newGame);
    },800
    );
    

  }
  newGame();
});