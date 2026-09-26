import {CreateMLCEngine} from "@mlc-ai/web-llm";
let engine = null;
window.nyxAIReady = false;

function showAiworksyn(text) {
    const note = document.getElementById("aicheck");
    note.textContent = text;
    note.classList.remove("hidden");
    setTimeout(function() {
        note.classList.add("hidden");
    }, 5000);
}










async function loadEngine() {
    if(!navigator.gpu) {
        console.log("webgpu not supported for this thing please use chrome maybe");
        showAiworksyn("The browser currently running doesnt let the Ai upload or be in use Please use chrome as it will mostly workk");
        return;
    }
    try {
    engine = await CreateMLCEngine("Qwen2.5-1.5B-Instruct-q4f16_1-MLC", {
        initProgressCallback: function(progress) {
            console.log("loadingggg:", progress.text);
        }
    });
    window.nyxAIReady = true;
    console.log("The Nyx AI is hererererere");
    }
    catch (error) {
        console.log("Ai didnt loadddd", error);
        showAiworksyn("Ai isnt loading try again or use basic replies hardcoded oness")

    }
}    

loadEngine();

async function asknyx(userMessage) {
    const response = await engine.chat.completions.create({
        messages: [
            {role: "system", content: "You are Nyx, A helpful Ai assitant and helper. You are Not made by Anthropic or Claude You are made by Shrirang- He has built you, you are not him you Are an Ai he is an human. Answer Naturally and sound Ancient for the theme"},
            {role: "user", content: userMessage}
    ],
    temperature: 0.3,
    max_tokens: 200,
    top_p: 0.9
    });
    return response.choices[0].message.content;
}

window.asknyx = asknyx