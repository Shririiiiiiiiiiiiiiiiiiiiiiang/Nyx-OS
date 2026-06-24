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

    search memory ... 

    memory count
    
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
    if(message.toLowerCase() === "day") {
        
        const now = new Date();

        reply = now.toLocaleDateString('en-US',{
            weekday: 'long'
        });

        mood = "system";
    }
   
    if(message.toLowerCase().startsWith("remember")) {
        let memoryText = message.substring(8).trim();

        let memories =
            JSON.parse(localStorage.getItem("memories")) || [];

            if (memoryText === "") {
                reply = "Tell me what to remember";
            }
            else if (memories.includes(memoryText)){
                reply = "I aldready know that";                
            }
            else {
                memories.push(memoryText);
            

            localStorage.setItem(
                "memories",
                JSON.stringify(memories)
            );

            reply = "Okay, I will remember that.";
        }

            mood = "memory";

    }

    if (message.toLowerCase() === "memory count") {
        let memories = 
        JSON.parse(localStorage.getItem("memories")) || [];

        reply = "I currently remember " + memories.length + "things. " ;
        mood = "memory";
    }

    if(message.toLowerCase().includes("show memories")) {

        let memories =
            JSON.parse(localStorage.getItem("memories")) || [];

            if(memories.length === 0) {
                reply = "i dont remember anything yet";
            }
            else {
                reply = memories
                    .map(function(memory, index){
                        return(index + 1) + ". " + memory;
                    })
                    .join("\n")
                } 
            
            mood = "memory";
    }

    if(message.toLowerCase().startsWith("delete memory")) {

        const memoryNumber = 
        parseInt(message.substring(14));

        let memories = 
        JSON.parse(localStorage.getItem("memories")) || [];

        if(isNaN(memoryNumber)) {
            reply = "Tell me which memory to delete";
        }
        else if (memoryNumber < 1 || memoryNumber > memories.length) {
                reply = "That memory number doesnt exist";
        }
        else{
            const deletedMemory = 
            memories.splice(memoryNumber - 1, 1);

            localStorage.setItem(
                "memories",
                JSON.stringify(memories)
            );

            reply = "Deleted memory " + memoryNumber + " : " + deletedMemory[0];
        }
    }
    if(message.toLowerCase().startsWith("search memory")) {
        const keyword = message.substring(14).toLowerCase().trim();

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

    if(message.toLowerCase() === "clear all memories") {
        localStorage.removeItem("memories");
        reply = "All memories cleared.";
        mood = "memory";
    }

     document.body.classList.remove(
        "normalMood",
        "memoryMood",
        "helperMood",
        "friendlyMood",
        "systemMood"

    );
    document.body.classList.add(
        mood + "Mood"
    );
    console.log(document.body.className);
    console.log("Nyx mood:", mood);
    statusBar.innerHTML =
    "🌙 Online | 🧠 Memory Active | ✨ Mood: " + mood;


    const nyxBubble = document.createElement("div");
    nyxBubble.className = "message nyxMessage";
    chatBox.appendChild(nyxBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    const moonPhases = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌔", "🌓", "🌒"];

    let moonIndex = 0;
    nyxBubble.innerHTML = "Nyx: " + moonPhases[moonIndex];

    const moonAnimation = setInterval(function() {
        moonIndex++;

        if(moonIndex >= moonPhases.length) {
            moonIndex = 0;
        }

        nyxBubble.innerHTML = "Nyx: " + moonPhases[moonIndex]; 
    }, 300);
        

    setTimeout(function () {

        clearInterval(moonAnimation);

        let i = 0;

        const typingEffect = setInterval(function (){
    

    

        nyxBubble.innerHTML = 
            "Nyx: " + reply.substring(0, i);

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