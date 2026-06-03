const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const statusBar = document.getElementById("statusBar");
let userName = localStorage.getItem("userName") || "";


button.addEventListener("click", function () {

    const message = input.value;

    

    chatBox.innerHTML += '<div class="message userMessage">You: ' + message + '</div>';

    const nyxReplies = [

        "I am still learning",

        " intresting....",

        "Let me thing about that",

        "I am still evolving",

        "circuits are still wiring up",

        "processing...failed sucessfullyyyyyy",

        "Nyx doesnt know the answer yet",
    ];

    let reply = 
    nyxReplies[
        Math.floor(
            Math.random() * nyxReplies.length
        )
    ];
    let mood = "normal";
   
    if(message.toLowerCase() === "hi"){
        reply = "Hello, I am Nyx";
        mood = "friendly";
    }  
    if(message.toLowerCase() === "who are you") {
        reply = "I am your AI Assistant.";

    }
    if(message.toLowerCase() === "help") {
        reply = 
    `Available commands

    date
    time
    day

    my name is...

    what is my name

    remember ...

    show memories ...

    search memory ... (currently encountring a bug will be fixed)
    
    help`;       
    
    mood = "helper"
    }
    if(message.toLowerCase() === "hello") {
        reply = "Hello There.";
         mood = "friendly";
    }
    if(message.toLowerCase() === "creator") {
        reply = "Secret Buddy (AKA. Shrirang)";
    }
    if(message.toLowerCase() === "version") {
    reply = "Nyx Version 0.6";
    }
    if(message.toLowerCase() === "ping") {
    reply = "pong";
     mood = "friendly";
    }

    if(message.toLowerCase().startsWith("my name is")) {
        userName = message.substring(11);
        localStorage.setItem("userName", userName)
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

        mood = "system";
    }

    if(message.toLowerCase() ===  "date") {

        const now = new Date();

        reply = now.toDateString();

        mood = "system";
    }
    if(message.toLowerCase() === "day?") {
        
        const now = new Date();

        reply = now.toLocaleDateString('en-US',{
            weekday: 'long'
        });

        mood = "system";
    }
    document.body.classList.remove(
        "normalMood",
        "memoryMood",
        "helperMood",
        "friendlyMood"

    );
    document.body.classList.add(
        mood + "Mood"
    );
    console.log("Nyx mood:", mood);
    statusBar.innerHTML =
    "🌙 Online | 🧠 Memory Active | ✨ Mood: " + mood;
    if(message.toLowerCase().includes("remember")) {
        let memories =
            JSON.parse(localStorage.getItem("memories")) || [];

            memories.push(message);

            localStorage.setItem(
                "memories",
                JSON.stringify(memories)
            );

            reply = "Okay, I will remember that.";

            mood = "memory";

    }

    if(message.toLowerCase().includes("show memories")) {

        let memories =
            JSON.parse(localStorage.getItem("memories")) || [];

            if(memories.length === 0) {
                reply = "i dont remember anything yet";
            }
            else {
                reply = memories.join(" | ");
            }

            mood = "memory";
    }
    if(message.toLowerCase().startsWith("search memory")) {
        const keyword = message.substring(14).toLowerCase();

        let memories = 
        JSON.parse(localStorage.getItem("memories")) || [];

        const results = memories.filter(function(memory){

            return memory.toLowerCase().includes(keyword);

        });

        if(results.length == 0){
            reply = "no memories found";

        }
        else{

            reply = results.join("|");

        }

        mood = "memory";
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