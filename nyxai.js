import {CreateMLCEngine} from "@mlc-ai/web-llm";
let engine = null;

async function loadEngine() {
    engine = await CreateMLCEngine("SmolLM2-360M-Instruct-q4f16_1-MLC", {
        initProgressCallback: function(progress) {
            console.log("loadingggg:", progress.text);
        }
    });
    console.log("The Nyx AI is hererererere");
}

loadEngine();

async function asknyx(userMessage) {
    const response = await engine.chat.completions.create({
        messages: [
            {role: "user", content: userMessage}
    ]
    });
    return response.choices[0].message.content;
}

window.asknyx = asknyx