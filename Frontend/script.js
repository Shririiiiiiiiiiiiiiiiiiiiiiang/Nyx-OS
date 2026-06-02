const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
let userName = "";


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
    if(message.toLowerCase() === "version") {
    reply = "Nyx Version 0.6";
    }
    if(message.toLowerCase() === "ping") {
    reply = "pong";
    }

    if(message.toLowerCase().startsWith("my name is")) {
        userName = message.substring(11);
        reply = "Nice to meet you, " + userName;
    }

    if(message.toLowerCase() === "what is my name") {

        if(userName === ""){

            reply = "I don't know your name yet"
        }
        else{

            reply = "Your name is "  +  userName
        }
    }
    
        if(message.toLowerCase() === "time") {

        const now = new Date();

        reply = now.toLocaleTimeString();
    }

    if(message.toLowerCase() ===  "date") {

        const now = new Date();

        reply = now.toDateString();
    }
    if(message.toLowerCase() === "day?") {
        
        const now = new Date();

        reply = now.toLocaleDateString('en-US',{
            weekday: 'long'
        });
    } 
    const nyxBubble = document.createElement("div");
    nyxBubble.className = "message nyxMessage";
    chatBox.appendChild(nyxBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    nyxBubble.innerHTML = "Nyx is typing.";
    
    let dots = 1;

    const dotsAnimation = setInterval(function () {

        dots++;

        if (dots > 3){
            dots = 1;
        }

        nyxBubble.innerHTML = 
            "Nyx is typing" + ".".repeat(dots);

    }, 500);

    setTimeout(function () {

        clearInterval(dotsAnimation);

        let i = 0;

        const typingEffect = setInterval(function (){
    

    

        nyxBubble.innerHTML = 
            "Nyx: " + reply.substring(0,i);

        i++;
        
        if(i > reply.length){

            clearInterval(typingEffect);

        }
    }, 50);
    }, 3000);
    input.value = "";

});

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        button.click();

    }

});