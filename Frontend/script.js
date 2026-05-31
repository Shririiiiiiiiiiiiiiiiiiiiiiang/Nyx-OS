const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

button.addEventListener("click", function () {

    const message = input.value;

    chatBox.innerHTML += "<p>You: " + message + "</p>";

    chatBox.innerHTML += "<p>Nyx; I am Online. </p>";

    input.value = "";

});

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        button.click();

    }

});