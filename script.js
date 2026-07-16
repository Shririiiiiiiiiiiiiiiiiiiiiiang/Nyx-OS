const input = document.getElementById("userInput");
const button = document.getElementById("sendBtn");
const chatBox = document.getElementById("chatBox");
const statusBar = document.getElementById("statusBar");
const saveButton = document.getElementById("savethem");
const noteInput = document.getElementById("noteInput")
const noteTitle = document.getElementById("noteTitle");
const notesList = document.getElementById("noteslist");
const notesButton = document.getElementById("notes");
const notesPage = document.getElementById("notespage");
const closeNotes = document.getElementById("closenotes");
const searchnotes = document.getElementById("searchnotes");
const notehead = document.getElementById("notehead");
function renderNotes(){
    
    notesList.innerHTML = "";
    notehead.textContent = "Notes (" + notes.length + ")";
    const searchTerm = searchnotes.value.toLowerCase();
    
    notes.forEach(function(note, index){
        if(!note.title.toLowerCase().includes(searchTerm)
        ){return;
    }
        const noteCard = document.createElement("div");
        noteCard.className = "noteCard";
        noteCard.textContent = note.title;
        
        const deletebutton = document.createElement("button");
        deletebutton.textContent = "❌";
        deletebutton.className = "deleteNote";
        
        noteCard.addEventListener("click", function() {
            noteTitle.value = note.title;
            noteInput.value = note.content;       
        
        });

        deletebutton.addEventListener("click", function(event){
            event.stopPropagation();
            notes.splice(index, 1)
            localStorage.setItem(
                "notes", JSON.stringify(notes)
            );
            renderNotes();
        });
        noteCard.appendChild(deletebutton);
        notesList.appendChild(noteCard);

    });
}
searchnotes.addEventListener("input", function() {
    renderNotes();
});
notesButton.addEventListener(
    "click", () => {notesPage.style.display = "block";}
    );
    closeNotes.addEventListener(
        "click", () => {notesPage.style.display = "none";}
    );
let userName = localStorage.getItem("userName") || "";

let notes = JSON.parse(localStorage.getItem("notes")) || [];


button.addEventListener("click", function () {

    const message = input.value.trim();
    if(message === ""){
        return
    }

    

    chatBox.innerHTML += '<div class="message userMessage">You: ' + message + '</div>';

    const nyxReplies = [

        "I am still learning",

        "interesting....",

        "Let me think about that",

        "I am still evolving",

        "circuits are still wiring up",

        "processing...failed successfullyyyyyy",

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
        mood = "friendly";

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
        userName = message.substring(10).trim();
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
                reply = "I already know that";                
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

        reply = "I currently remember " + memories.length + " things. " ;
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
            mood = "memory";
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

            reply = results.join("\n");

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
    console.log("Status line test: 🌙 🧠 ✨");
    statusBar.innerHTML =
    
    "🌙 Online | 🧠 Memory Active | ✨ Mood: " + mood;

    const Connect = document.getElementById("Connect");
    const PCStatus = document.getElementById("PC-Status");
    let connected = false;

    Connect.addEventListener("click",
        () => { connected = !connected;
            if(connected) {
                PCStatus.textContent = "Status: Connected!!!!!"
                Connect.textContent = "Disconnected";

            }
            else {
                PCStatus.textContent = "Status: not connected";
                Connect.textContent = "connect"
            }

    })




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
            "Nyx: " + reply.substring(0, i).replace(/\n/g,"<br>");

        i++;
        
        if(i > reply.length) {
    clearInterval(typingEffect);
    chatBox.scrollTop = chatBox.scrollHeight;
}
    }, 50);
    }, 1500);
    input.value = "";

});

input.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        event.preventDefault();

        button.click();

    }

});
saveButton.addEventListener("click", function(){
    const title = noteTitle.value.trim();
    const content = noteInput.value.trim();
    if(title === "" || content === "") {
        return;
    }
    const existingNote = notes.find(
        note => note.title === title
    );
    if(existingNote){
        existingNote.content = content;

    }
    else{
        notes.push({
            title: title,
            content: content
        });
    }
    localStorage.setItem(
        "notes", JSON.stringify(notes)
    );
    renderNotes();
    
    noteTitle.value = "";
    noteInput.value = "";
}
);

renderNotes();

