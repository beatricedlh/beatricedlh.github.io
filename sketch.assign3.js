// Inspo: https://www.youtube.com/watch?v=3pI3SQjfVyA&ab_channel=TechHeadOnline
// Inspo: https://editor.p5js.org/lalogongum/sketches/onQPxgfu5

// Note: I initially tried using a normal p5js canvas but my questions were stacking instead of clearing when the "next" 
// button was clicked, so my brother recommended using html container instead.

var questions = [                                              // Defines questions for the quiz
    "Which colour describes how you're feeling in this moment?",
    "You find yourself in an empty city at night. Where do you go?",
    "Which type of weather makes you feel the most alive?",
    "What’s your ideal way to start the day?",
    "You’re in charge of planning the perfect day. What’s on the agenda?"
];

var answers = [                                                // Defines the answers for each question
    ["Royal mauve", "Soft beige", "Deep burgundy", "Forest green", "Neon pink"],
    ["A vintage record shop", "A quiet park bench", "A rooftop club", "A neon-lit lounge", "An abandoned building"],
    ["Soft rain", "Crisp autumn air", "A warm summer night", "A heavy thunderstorm storm", "A starry night"],
    ["A roadtrip with good music", "A gym session with a hype playlist", "A spontaneous adventure", "A cup of tea and journaling", "A long morning walk"],
    ["A night out", "A creative session", "A quiet cafe", "A road trip with no destination", "A cozy dinner party"]
];

var categories = ["lofi", "indie", "rnb", "pop", "hiphop"];
var scores = { lofi: 0, indie: 0, rnb: 0, pop: 0, hiphop: 0 };

var categoryMap = [                                            // Assigns each answer to their category
    ["rnb", "lofi", "hiphop", "indie", "pop"], 
    ["indie", "lofi", "pop", "rnb", "hiphop"], 
    ["lofi", "indie", "rnb", "hiphop", "pop"], 
    ["rnb", "pop", "hiphop", "lofi", "indie"], 
    ["pop", "hiphop", "lofi", "indie", "rnb"]
];

var currentQuestion = 0;                                        // Keeps track of current question #
var quizContainer;
var playlistName;

function setup() {
    noCanvas();
    quizContainer = select('#quiz-container');
    showQuestion();                                             // Shows 1st question
}

function showQuestion() {
    quizContainer.html('');                                     // Clears previous content
    // Source: https://p5js.org/reference/p5/createP/
    createP(questions[currentQuestion]).parent(quizContainer);  // Creates a paragraph for the 1st question
    // Source: https://p5js.org/reference/p5/createRadio/
    var radio = createRadio().parent(quizContainer);            // Creates radio button
    
    answers[currentQuestion].forEach((option, i) => {
        radio.option(categoryMap[currentQuestion][i], option);
    });

    var nextButton = createButton('Next').parent(quizContainer);// Creates "next" button
    nextButton.mousePressed(() => {
        var selectedCategory = radio.value();
        if (selectedCategory) {
            scores[selectedCategory] += 1;                      // Simple +1 scoring for the selected category
            currentQuestion++;                                  // Shows the next question
            if (currentQuestion < questions.length) {
                showQuestion();                                 // Shows the next question until no questions are left
            } else {
                showPlaylist();                                 // Moves to the playlist screen (since there arent any questions left)
            }
        }
    });
}

function showPlaylist() {
    quizContainer.html('');                                     // Clears previous content
    createP("Please Name Your Playlist:").parent(quizContainer);
    // Source: https://p5js.org/reference/p5/createInput/
    playlistName = createInput().parent(quizContainer);         // Creates input field for the playlist name
    
    var submitButton = createButton('Get My Playlist!').parent(quizContainer); // Creates "get my playlist" button
    submitButton.mousePressed(showResult);                      // Moves to the result screen
}

function showResult() {
    var highestCategory = categories[0];                        // Defaults to lofi in case there's a tie in highest score

    for (var i = 1; i < categories.length; i++) {               // Loops through categories to find the highest score
        if (scores[categories[i]] > scores[highestCategory]) {
            highestCategory = categories[i];                    // Updates to the actual highest category score
        }
    }

    var playlists = {                                           // Links each category to their QR codes
        lofi: "images/lofi_qr.png",
        indie: "images/indie_qr.png",
        rnb: "images/rnb_qr.png",
        pop: "images/pop_qr.png",
        hiphop: "images/hiphop_qr.png"
    };

    // Shows inputed playlist name + final QR code for the category with the highest score
    // Source: https://p5js.org/reference/p5/createInput/
    quizContainer.html(`
        <h2>${playlistName.value()}</h2>
        <img src="${playlists[highestCategory]}" alt="Playlist QR Code" style="width: 200px">
    `);
}
