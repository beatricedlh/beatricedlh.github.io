let inputBox;
let askButton;
let responses = ["Yes.", "No.", "Maybe.", "Ask again later.", "Definitely!", "Not a chance.", "It is certain.", "Very doubtful."];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background("white");

    inputBox = createInput("");
    inputBox.position(width / 2 - 100, height / 2 - 40);

    askButton = createButton("Ask Magic 8 Ball");
    askButton.position(width / 2 - 100, height / 2);
    askButton.mousePressed(giveResponse);

    answerDiv = createDiv("");
    answerDiv.position(width / 2 - 100, height / 2 + 40);
    answerDiv.hide();
}

// I used .html to change the text inside the div
// https://p5js.org/reference/p5.Element/html/

function giveResponse() {
    if (inputBox.value() !== "") {
        answerDiv.html(random(responses));
        answerDiv.show();
        askButton.html("Reset").mousePressed(reset);
    }
}

function reset() {
    inputBox.value("");
    answerDiv.hide();
    askButton.html("Ask Magic 8 Ball").mousePressed(giveResponse);
}
