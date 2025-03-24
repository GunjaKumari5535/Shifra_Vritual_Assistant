let btn=document.querySelector("#btn");
let content=document.querySelector("#content");
let listening =false; 
//added
function speak(text){
    if (!window.speechSynthesis) {
        alert("Speech synthesis is not supported in this browser.");
        return;
    }
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    let text_speak=new SpeechSynthesisUtterance(text);
    text_speak.rate= 1;
    text_speak.pitch= 1;
    text_speak.volume= 1;
    text_speak.lang= "en-US"
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day=new Date();
    let hours=day.getHours();
    if(hours>0 && hours<12){
        speak("Good Morning Sir");
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon sir");
    }
    else{
        speak("Good evening sir");
    }
}
window.addEventListener('load',()=>{
    setTimeout(wishMe, 1000);
});
let speechRecognition= window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
} else {
let recognition =new speechRecognition();
recognition.onresult=(event)=> {
    
    let currentIndex=event.resultIndex;
    let transcript=event.results[currentIndex][0].transcript;
    content.innerText=transcript;
    takeCommand(transcript.toLowerCase());
};
recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
    alert("Speech recognition error: " + event.error);
};
recognition.onend = () =>{
    listening = false;
    btn.innerText = "Click here to talk to me";
};
btn.addEventListener("click",()=>{
    if(!listening){
        recognition.start();
        listening = true;
        btn.innerText = "Listening..."; //added
    }else{
        recognition.stop();
        
    }
});
function takeCommand(message){
    if(message.includes("hello")||message.includes("hey")){
        speak("Hello sir,what can I help you with?");
    }
    else if(message.includes("who are you")){
        speak("i am Shifra,your virtual assistant,created by Gunja madam");
    }else if(message.includes("open youtube")){
        speak("opening youtube...");
        window.open("https://www.youtube.com/","_blank");
}
else if(message.includes("open google")){
    speak("opening google...");
    window.open("https://google.com/","_blank");
}
else if(message.includes("open chatgpt")){
    speak("opening chatgpt...");
    window.open("https://chatgpt.com/","_blank");
}
else if(message.includes("open facebook")){
    speak("opening facebook...");
    window.open("https://www.facebook.com/","_blank");
}
else if (message.includes("what time is it")|| message.includes("time")){
    let time =new Date().toLocaleTimeString();
    speak(`The current time is ${time}`);
}
else if (message.includes("tell me a joke") || message.includes("joke")) {
    tellJoke();
} 
else if (message.includes("tell me a quote") || message.includes("motivate me")) {
    tellQuote();
} 
else if (message.includes("weather")) {
    speak("Opening weather updates...");
    window.open("https://www.weather.com/", "_blank");
} 
else if (message.includes("news")) {
    speak("Opening latest news...");
    window.open("https://news.google.com/", "_blank");
} 
else if (message.includes("search wikipedia for")) {
    let query = message.replace("search wikipedia for", "").trim();
    speak(`Searching Wikipedia for ${query}`);
    window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
}

else if (message.includes("open course") || message.includes("learn something")) {
    speak("Opening an online course for you...");
    window.open("https://www.coursera.org/", "_blank"); // Opens Coursera
}

else if (message.includes("play song")) {
    speak("Playing a song for you...");
    window.open("https://open.spotify.com/", "_blank"); // Opens Spotify
}
else{
    speak("Sorry, I didn't understand that. Can you please reapeat?");
}
}
function tellJoke() {
    let jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the computer go to the doctor? Because it had a virus!",
        "Why was the math book sad? Because it had too many problems!"
    ];
    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    speak(randomJoke);
}

function tellQuote() {
    let quotes = [
        "Believe in yourself and all that you are.",
        "Success is not final, failure is not fatal. It is the courage to continue that counts.",
        "Do what you can, with what you have, where you are."
    ];
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    speak(randomQuote);
}
}