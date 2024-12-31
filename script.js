const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

var key = "networkComputing";
var encrypted;
var decrypted;

const name = prompt('Enter your name:');
appendMessage(`${name} joined!`);
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
    appendMessage(`${name} joined!`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} left!`);
});

socket.on('game-start-message', name => {
    appendMessage(`${name} started word guessing game!`);
});

socket.on('game-end-message', name => {
    appendMessage(`${name} ended word guessing game!`);
});

socket.on('encoded-word', encoded => {
    appendMessage(`Encoded word: ${encoded}`);
});

socket.on('correct-answer', data => {
    appendMessage(`${data.user} correctly guessed '${data.word}'`);
});

socket.on('incorrect-answer', data => {
    appendMessage(`${data.answer} is not the correct word!`);
});

socket.on('scoreboard', string => {
    appendMessage('Scoreboard: \n' + string);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;

    appendMessage(`${name}: ${message}`);

    // encrypted = CryptoJS.AES.encrypt(message, key);
    // console.log('Encrypted: ' + encrypted);

    socket.emit('send-chat-message', message);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
