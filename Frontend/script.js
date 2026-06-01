const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");

button.addEventListener("click", function () {

    const message = input.value;

    chatBox.innerHTML += '<div class="message userMessage">You: ' + message + '</div>';

    let reply = "i am still learning.";
    if(message.toLowerCase() === "hi"){
        reply = "Hello, I am Nyx";
    }  
    if(message.toLowerCase() === "who are you") {
        reply = "I am your AI Assistant.";
    }
    if(message.toLowerCase() === "help") {
        reply = "I can help you with files,coding ,sorting & projects.";
    }
    if(message.toLowerCase() === "hello") {
        reply = "Hello There.";
    }
    if(message.toLowerCase() === "creator") {
        reply = "Secret Buddy (AKA. Shrirang)";
    }

    const nyxBubble = document.createElement("div");
    nyxBubble.className = "message nyxMessage";
    chatBox.appendChild(nyxBubble);

    let i = 0;

    const typingEffect = setInterval(function () {

        nyxBubble.innerHTML = 
            "Nyx: " + reply.substring(0,i);

        i++;
        
        if(i > reply.length){

            clearInterval(typingEffect);

        }
    }, 50);
    input.value = "";

});

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        button.click();

    }

});