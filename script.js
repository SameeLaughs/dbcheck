let readSpeed = 250;
let questionBank = [];
let questionParts = [];
let showBoni = true;
let buzz = false;

// DOM Elements
const buzzButton = document.getElementById("buzzButton");
const nextButton = document.getElementById("nextButton");
const answerInput = document.getElementById("answerInput");
const questionDisplay = document.getElementById("question");
const questionLog = document.getElementById("questionLog");
const answerDisplay = document.getElementById("answerDisplay");

// Utility Functions
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Print Question
async function printQuestion() {
    nextButton.innerHTML = "Skip";
    await sleep(readSpeed); // Ensures first print instance stops before starting the next one
    nextButton.disabled = false;
    buzz = false;
    questionDisplay.innerHTML = "";

    const questionText = questionBank[0][questionParts[0]].split(" ");
    
    for (let word of questionText) {
        if (!buzz) {
            questionDisplay.append(word + " ");
            await sleep(readSpeed);
        } else {
            return;
        }
    }
}

// End Question
function endQuestion() {
    buzz = true;
    buzzButton.disabled = true;
    answerInput.style.visibility = "visible";
    answerInput.focus();
    nextButton.innerHTML = "Next";
}

// Display Answer
function displayAnswer() {
    questionDisplay.innerHTML = questionBank[0][questionParts[0]];
    answerDisplay.innerHTML = questionBank[0][questionParts[0] + "Answer"];
    answerDisplay.style.visibility = "visible";
}

// Next Question
function nextQuestion() {
    buzz = true;
    buzzButton.disabled = false;
    nextButton.disabled = true;
    answerInput.style.visibility = "hidden";
    answerInput.value = "";
    answerDisplay.style.visibility = "hidden";

    if (questionDisplay.innerHTML !== "") {
        logLastQuestion(questionParts.shift());
        if (showBoni && questionParts.length === 0) {
            questionBank.shift(); // Remove first question
            getQuestionParts(questionBank[0]);
        } else if (!showBoni) {
            questionBank.shift();
            getQuestionParts(questionBank[0]);
        }
    } else if (nextButton.innerHTML === "Start") {
        getQuestionParts(questionBank[0]);
    }

    if (questionBank.length === 0) {
        buzzButton.innerHTML = "Start";
        buzzButton.disabled = true;
        nextButton.disabled = true;
        questionDisplay.innerHTML = "";
    } else {
        printQuestion();
    }
}

// Extract Question Parts
function getQuestionParts(question) {
    questionParts = [];
    for (let key in question) {
        if (!key.includes("Answer")) {
            questionParts.push(key);
        }
    }
}

// Log Last Question
function logLastQuestion(part) {
    const lastQuestion = questionBank[0];
    let logBody;

    if (part === "tossup") {
        const newDiv = document.createElement("div");

        // Collapsible Button
        const newLogHead = document.createElement("button");
        newLogHead.appendChild(document.createTextNode("Custom question"));
        newLogHead.classList.add("collapsible");
        newDiv.appendChild(newLogHead);

        // Log Body
        logBody = document.createElement("div");
        logBody.classList.add("content");

        const questionLabel = document.createElement("p");
        questionLabel.textContent = "TOSSUP";
        questionLabel.style.fontWeight = "bold";

        const text = document.createElement("p");
        text.textContent = lastQuestion.tossup;
        text.classList.add("question");

        const answer = document.createElement("p");
        answer.textContent = lastQuestion.tossupAnswer;
        answer.classList.add("answer");

        logBody.append(questionLabel, text, answer);
        newDiv.appendChild(logBody);
        questionLog.insertBefore(newDiv, questionLog.firstChild);

        initializeCollapsible(newLogHead);
    } else {
        logBody = questionLog.firstChild.lastChild;

        const line = document.createElement("hr");
        line.style.color = "#eeeeee";

        const questionLabel = document.createElement("p");
        questionLabel.textContent = part.replace("bonus", "BONUS ");
        questionLabel.style.fontWeight = "bold";

        const text = document.createElement("p");
        text.textContent = lastQuestion[part];
        text.classList.add("question");

        const answer = document.createElement("p");
        answer.textContent = lastQuestion[part + "Answer"];
        answer.classList.add("answer");

        logBody.append(line, questionLabel, text, answer);
    }

    if (!showBoni) {
        questionParts.forEach(part => {
            const line = document.createElement("hr");
            line.style.color = "#eeeeee";

            const questionLabel = document.createElement("p");
            questionLabel.textContent = part.replace("bonus", "BONUS ");
            questionLabel.style.fontWeight = "bold";

            const text = document.createElement("p");
            text.textContent = lastQuestion[part];
            text.classList.add("question");

            const answer = document.createElement("p");
            answer.textContent = lastQuestion[part + "Answer"];
            answer.classList.add("answer");

            logBody.append(line, questionLabel, text, answer);
        });
    }

    if (logBody.style.maxHeight) {
        logBody.style.maxHeight = logBody.scrollHeight + 20 + "px";
    }
}

// Enable Start Button
function enableStart() {
    if (questionBank.length > 0) {
        buzzButton.disabled = false;
    }
}

// Start Function
function start() {
    if (buzzButton.innerHTML === "Start") {
        buzzButton.innerHTML = "Buzz";
        nextQuestion();
    } else {
        endQuestion();
    }
}

// Initialize Collapsible
function initializeCollapsible(button) {
    button.addEventListener("click", function () {
        const content = button.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            button.style.borderRadius = "4px";
        } else {
            content.style.maxHeight = content.scrollHeight + 20 + "px";
            button.style.borderRadius = "4px 4px 0px 0px";
        }
    });
}

// Update Status Box
function updateStatus(type, message) {
    const statusBox = document.getElementById("statusBox");
    statusBox.className = type;
    statusBox.firstChild.innerHTML = message;
    statusBox.style.display = "block";

    sleep(2000).then(() => {
        statusBox.style.display = "none";
        statusBox.firstChild.innerHTML = "";
    });
}

// Hotkey Support
let buzzKey = " ";
let nextKey = "Enter";

document.addEventListener('keydown', function (event) {
    if (!event.target.matches("textarea") && event.target.type !== "text") {
        if (event.key === buzzKey && !buzzButton.disabled) {
            event.preventDefault();
            start();
        } else if (event.key === nextKey && !nextButton.disabled) {
            event.preventDefault();
            nextQuestion();
        }
    }
});
