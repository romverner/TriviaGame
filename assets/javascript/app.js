$(document).ready(function(){
    game.buttonMaker('Start', 'start', 'btn btn-primary');
    $("#start").on("click", game.run);
    $(".next").on("click", game.nextQuestion);
});

var intervalId;

var game = {

    timeRemain: 5,
    answered: false,
    nextSwitch: false,
    questionCount: 0,
    correct: 0,
    incorrect: 0,
    unAnswered: 0,

    questionsAnswers: [{
        question: "What was the frozen yogurt from season one actually made of?",
        options: ['Mashed Potatoes','Batter','Ice Cream','It really was frozen yogurt.'],
        correctAnswer: 0
    }, {
        question: "For this actor/actress, 'The Good Place' is their first role in a series or film.",
        options: ['Kristen Bell','William Harper','Jameela Jamil', "D'Arcy Carden"],
        correctAnswer: 2
    }, {
        question: "Tahani's first name is of Arabic origin, what does the name mean?",
        options: ['congratulations', 'beautiful', 'eclipse', 'best wishes'],
        correctAnswer: 1
    }, {
        question: "The pilot episode attracted how many viewers?",
        options: ['1.8 million', '12.11 million', '4.7 million', '8.04 million'],
        correctAnswer: 3
    }, {
        question: "Who was originally considered for the role of Shawn?",
        options: ['Nick Offerman', 'Hugo Weaving', 'Brendan Fraser', 'Woody Harrelson'],
        correctAnswer: 0
    }],

    run: function() {
        clearInterval(intervalId);
        if (game.questionCount === 0) {
            game.timerDisplay();
            game.hideStart();
            game.questionFill();
            game.answerFill();
            intervalId = setInterval(game.play, 1000);
        };
        if (game.nextSwitch === true) {
            game.buttonMaker('Next', 'next', 'next btn btn-primary');
            game.nextSwitch = false;
        };
        $(".next").on("click", game.nextQuestion);
    },

    continueRun: function() {
        clearInterval(intervalId);
        intervalId = setInterval(game.play, 1000);
    },

    play: function() {
        game.timeRemain--;
        game.timerDisplay();
        
        if (game.timeRemain === 0) {
            game.timeOut();
        };

        if (game.questionCount === 5) {
            game.gameOver();
            game.stop();
        };

        $(".answers").on("click", game.answerCheck);
    },

    stop: function() {
        clearInterval(intervalId);
    },

    // All functions besides run/play/stop will be below here

    answerCheck: function() {
        game.stop();
        var localValue = $(this).attr('value');
        console.log(localValue);

        if (game.questionCount == 5) {
            game.gameOver();
            game.stop();
        };

        if (localValue == game.questionsAnswers[game.questionCount].correctAnswer && game.answered === false) {
            game.correct++;
            game.questionCount++;
            console.log("Correct");
            game.answered = true;
            game.correctMessage();
        }
        else if (localValue !== game.questionsAnswers[game.questionCount].correctAnswer && game.answered === false) {
            game.incorrectMessage();
            game.incorrect++;
            game.questionCount++;
            console.log("Incorrect");
            game.answered = true;
        };
        game.nextSwitch = true;
        game.run();
    },

    correctMessage: function() {
        $("#sp-1, #sp-2, #sp-3").empty();
        $("#sp-1").html("<h5>Correct!</h5>");
    },

    incorrectMessage: function() {
        $("#sp-1, #sp-2, #sp-3").empty();
        $("#sp-1").html("<h5>Incorrect!</h5>");
        $("#sp-2").html("<h5>The correct answer was:</h5>");
        $("#sp-3").html("<h5>" + game.questionsAnswers[game.questionCount].options[game.questionsAnswers[game.questionCount].correctAnswer] + "</h5>");
    },
    
    timerDisplay: function() {
        $("#sp-1").html("<h5>Time remaining: " + game.timeRemain + " seconds</h5>");
    },

    buttonMaker: function(desiredText, desiredId, desiredClass, numberValue) {
        var buttonMade = $('<button>');
        buttonMade.text(desiredText);
        buttonMade.attr('value', numberValue);
        buttonMade.attr('id', desiredId);
        buttonMade.attr('class', desiredClass);
        $("#sp-3").append(buttonMade);
    },

    questionFill: function() {
        $("#sp-2").empty();
        $("#sp-2").html("<h5>" + game.questionsAnswers[game.questionCount].question + "</h5><br>");
    },

    answerFill: function() {
        $("#sp-3").empty();
        for (i = 0; i < 4; i++) {
            game.buttonMaker(game.questionsAnswers[game.questionCount].options[i], 'answers', 'btn btn-primary answers', i);
        };
    },

    nextQuestion: function() {
        game.timeRemain = 30;
        game.answered = false;
        game.nextSwitch = false;
        game.questionFill();
        game.answerFill();
        game.continueRun();
    },

    hideStart: function() {
        $("#start").hide();
    },

    timeOut: function() {
        game.stop();
        $("#sp-2, #sp-3").empty();
        $("#sp-2").html("<h5>Timed out. The correct answer was:</h5>");
        $("#sp-3").html("<h5>" + game.questionsAnswers[game.questionCount].options[game.questionsAnswers[game.questionCount].correctAnswer] + "</h5>");
        game.questionCount++;
        game.unAnswered++;
        game.nextSwitch = true;
        game.run();
    },

    gameOver: function() {
        $("#sp-1, #sp-2, #sp-3").empty();
        $("#sp-1").text("Game over! Here are your results!");
        $("#sp-2").text("Here are your results!");
        $("#sp-3").html("<p></p>");

        var correctResult = "Correct: " + game.correct + "<br>";
        var incorrectResult = "Incorrect: " + game.incorrect + "<br>";
        var missedResult = "Unanswered: " + game.unAnswered;
        $("#sp-3").append(correctResult + incorrectResult + missedResult);
        $("#sp-3").append("<br>Try again?<br>");
        
        var restartButton = game.buttonMaker('Restart', 'restart', 'restart btn btn-primary');
        $("#sp-3").append(restartButton);
    }
};

