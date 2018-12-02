$(document).ready(function(){
    game.hide();
    $("#start").on("click", game.run);
});

var intervalId;

var game = {

    timeRemain: 25,
    answered: false,
    questionCount: 0,
    correct: 0,
    incorrect: 0,
    unAnswered: 0,

    q: ["What was the frozen yogurt from season one actually made of?",
        "For this actor/actress, 'The Good Place' is their first role in a series or film.",
        "",
        "",

    ],

    a: [['Mashed Potatoes','Batter','Ice Cream','It really was frozen yogurt.', 0],
        ['Kristen Bell','William Harper','Jameela Jamil', "D'Arcy Carden", 2],
        ['','','',''],
        ['','','',''],
        ['','','',''],
        ['','','',''],
        ['','','',''],
        ['','','','']],

    question: function() {
        $("#sp-1").html("<h4 class='text-right'>Time Remaining: </h4>");
        $("#sp-1-1").html("<h4>" + game.timeRemain + "</h4>");
        $("#start").hide();
        $("#sp-2").html("<h5>" + game.q[game.questionCount] + "</h5>");
        game.show();
        $("#button-3").html(game.a[game.questionCount][0]);
        $("#button-3").attr("value", 0);
        $("#button-4").html(game.a[game.questionCount][1]);
        $("#button-4").attr("value", 1);
        $("#button-5").html(game.a[game.questionCount][2]);
        $("#button-5").attr("value", 2);
        $("#button-6").html(game.a[game.questionCount][3]);
        $("#button-6").attr("value", 3);
    },

    run: function() {
        clearInterval(intervalId);
        game.show();
        game.question();
        intervalId = setInterval(game.play, 1000);
    },

    conditions: function() {
        game.answered = true;
        var localValue = $(this).attr("value");

        if (game.a[game.questionCount][4] == localValue && game.answered == true) {
            game.stop();
            game.correct++;
            game.questionCount++;
            console.log(game.questionCount)
            game.hide();
            game.postAnswer("Correct!");
            game.answered = false;
        }
        else if (game.a[game.questionCount][4] != localValue && game.answered == true) {
            game.stop();
            game.incorrect++;
            game.questionCount++;
            game.hide();
            game.postAnswer("Incorrect!");
            game.answered = false;
        };
    },

    play: function() {
        game.timeRemain--;
        $("#sp-1-1").html("<h4>" + game.timeRemain + "</h4>");

        if (game.timeRemain === 0) {
            game.stop();
            game.listenFalse();
            $("#sp-1-1").html("<h4>" + game.timeRemain + "</h4>");
            game.unAnswered++;
            game.questionCount++;
        };

        $(".button").on("click", game.conditions);
        console.log(game.answered);
    },

    hide: function() {
        $("#sp-2").hide();
        $("#button-3").hide();
        $("#button-4").hide();
        $("#button-5").hide();
        $("#button-6").hide();
    },

    show: function() {
        $("#sp-2").show();
        $("#button-3").show();
        $("#button-4").show();
        $("#button-5").show();
        $("#button-6").show();
    },

    listenTrue: function() {
        game.answered = true;
    },

    listenFalse: function() {
        game.answered = false;
    },

    postAnswer: function(text) {
        $("#sp-2").html("<h5>" + text + "</h5>");
        $("#sp-2").addClass("text-center");
        $("#sp-2").show();
        $("#sp-3").addClass("text-center");
        $("#sp-3").text("Next question in 5 seconds.");
        setTimeout(function() {
            $("#sp-3").text("");
            game.question();
        }, 5000);
        console.log(game.correct);
    },

    stop: function() {
        clearInterval(intervalId);
    }
};