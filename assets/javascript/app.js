$(document).ready(function(){
    $("#start").on("click", game.run);
});

var intervalId;

var game = {

    timeRemain: 25,
    questionCount: 0,


    q: ["What was the frozen yogurt from season one actually made of?",
        "",
        "",
        "",

    ],
    a: [['Mashed Potatoes','Batter','Ice Cream','It really was frozen yogurt.', 0],
        ['','','',''],
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
        $("#button-3").html(game.a[game.questionCount][0]);
        $("#button-4").html(game.a[game.questionCount][1]);
        $("#button-5").html(game.a[game.questionCount][2]);
        $("#button-6").html(game.a[game.questionCount][3]);
        game.questionCount++;
    },

    run: function() {
        clearInterval(intervalId);
        game.question();
        intervalId = setInterval(game.decrement, 1000);
    },

    decrement: function() {
        game.timeRemain--;
        $("#sp-1-1").html("<h4>" + game.timeRemain + "</h4>");

        if (game.timeRemain === 0) {
            game.stop();
            $("#sp-1-1").html("<h4>" + game.timeRemain + "</h4>");
        };
    },

    stop: function() {
        clearInterval(intervalId);
    }
};