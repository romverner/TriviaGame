$(document).ready(function(){
    game.buttonMaker('Start', 'start');
    $("#start").on("click", game.run);
});

var intervalId;

var game = {

    timeRemain: 30,
    answered: false,
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
        question: "",
        options: [],
        correctAnswer: 0
    }],

    run: function() {
        clearInterval(intervalId);
        game.hideStart();
        game.timerDisplay();
        game.questionFill();
        game.answerFill();
        
        if (game.answered === true) {
            game.questionCount++;
            game.answered = false;
        }

        intervalId = setInterval(game.play, 1000);
    },

    play: function() {
        game.timeRemain--;
        game.timerDisplay();
        game.timeOut();
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
        if (localValue == game.questionsAnswers[game.questionCount].correctAnswer && game.answered === false) {
            game.correct++;
            console.log("Correct");
            game.answered = true;
        }
        else if (localValue != game.questionsAnswers[game.questionCount].correctAnswer && game.answered === false) {
            game.incorrect++;
            console.log("Incorrect");
            game.answered = true;
        };
        game.questionCount = game.correct + game.incorrect;
    },
    
    timerDisplay: function() {
        $("#sp-1").html("<h5>Time remaining: " + game.timeRemain + " seconds</h5>");
    },

    buttonMaker: function(desiredText, desiredId, desiredClass, numberValue) {
        var buttonMade = $('<button>');
        buttonMade.text(desiredText);
        buttonMade.attr('value', numberValue);
        buttonMade.attr('id', desiredId);

        // Fix addition of classes
        buttonMade.attr('class', ('btn btn-primary rounded mt-1', desiredClass));
        $("#sp-3").append(buttonMade);
        $("#sp-3").append("<br>");
    },

    questionFill: function() {
        $("#sp-2").html("<h5>" + game.questionsAnswers[game.questionCount].question + "</h5><br>");
    },

    answerFill: function() {
        for (i = 0; i < 4; i++) {
            game.buttonMaker(game.questionsAnswers[game.questionCount].options[i], 'answers', 'answers', i);
        };
    },

    hideStart: function() {
        $("#start").hide();
    },

    timeOut: function() {
        if (game.timeRemain === 0) {
            game.stop();
        };
    }
};

