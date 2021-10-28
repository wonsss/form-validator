const msgEl = document.getElementById('msg');
const randomNum = getRandomNumber();

console.log(randomNum);

let recognition = new webkitSpeechRecognition() || new SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(msg);
}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);
