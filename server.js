const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// const CryptoJS = require("crypto-js");
// var key = "networkComputing";            // encryption key

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Serve static files from the current directory
app.use(express.static(__dirname));

const users = {};                           // store connected users
var results = {};                           // store game results
var scoreboard = '';                        // store the scoreboard as a string

const game_words = ["exam", "finals", "program", "computer", "network", "cable", "compiler"];
var gameStatus = false;
var word = '';
var encoded = '';

io.on('connection', socket => {             // handle a new socket connection

    try {
        socket.on('new-user', name => {     // when a new user joins
            users[socket.id] = name;        // add the user to the `users` object
            results[socket.id] = 0;         // initialize their score
            console.log('#C | ' + name);    // log the join event
            socket.broadcast.emit('user-connected', name); // notify others that a new user joined
        });
    } catch (e) {
        console.log("ERROR with broadcasting connected user!");
    }

    socket.on('send-chat-message', message => {  // handle a new chat message
        // var decrypted = CryptoJS.AES.decrypt(message, key);
        // var message = decrypted.toString(CryptoJS.enc.Utf8);
        // console.log('Decrypted: ' + message);
        try {
            console.log(`#M | ${message}, client = ${users[socket.id]}`);
            socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] }); // broadcast the message
        } catch (e) {
            console.log("ERROR with sending message!");
        }

        try {
            if (message == '#GAMESTART') {    // if the user starts the game
                gameStatus = true;
                io.emit('game-start-message', users[socket.id]); // notify users the game has started

                word = new_word();                      // generate a new word
                encoded = '';                           // reset the encoded word
                for (let i = 0; i < word.length; i++) { // encode the word
                    if (i % 2 == 0)
                        encoded += word[i];
                    else
                        encoded += '_';
                }
            }
            else if (message == '#GAMESTOP') {                  // if the user stops the game
                gameStatus = false;
                io.emit('game-end-message', users[socket.id]);  // notify users the game has ended

                for (let index in results) {                    // generate the scoreboard
                    if (users[index] != null)
                        scoreboard += users[index] + ': ' + results[index] + '\n';
                }
                io.emit('scoreboard', scoreboard);  // send the scoreboard to all users

                scoreboard = '';             // reset the scoreboard
                encoded = '';                // reset the encoded word
                word = '';                   // reset the word
            }
        } catch (e) {
            console.log("ERROR with starting/stoping the game!");
        }

        if (gameStatus) { // if the game is active
            if (message == word) {              // if the user guesses the word
                io.emit('correct-answer', { word: word, user: users[socket.id] }); // notify all users of the correct answer
                results[socket.id]++;           // increment the user's score

                for (let index in results) {    // generate the updated scoreboard
                    if (users[index] != null)
                        scoreboard += users[index] + ': ' + results[index] + '\n';
                }
                io.emit('scoreboard', scoreboard);      // send the updated scoreboard
                scoreboard = '';                        // reset the scoreboard string

                word = new_word();                      // generate a new word
                encoded = '';                           // reset the encoded word
                for (let i = 0; i < word.length; i++) { // encode the new word
                    if (i % 2 == 0)
                        encoded += word[i];
                    else
                        encoded += '_';
                }
                io.emit('encoded-word', encoded); // send the encoded word
            } else {
                if (message != '#GAMESTART' && message != '#GAMESTOP')      // if the message is not a game command
                    io.emit('incorrect-answer', { answer: message });       // notify all users of an incorrect answer
                io.emit('encoded-word', encoded);                           // re-send the current encoded word
            }
        }
    });

    function new_word() {
        var index = Math.floor((Math.random() * 6) + 1);    // generate a random index for the word
        word = game_words[index];                           // select the word at the generated index
        return word;
    }

    socket.on('disconnect', () => {                                     // handle a user disconnecting
        console.log('#D | ' + users[socket.id]);
        socket.broadcast.emit('user-disconnected', users[socket.id]);   // notify others that the user disconnected
        delete users[socket.id];                                        // remove the user from the `users` object
    });
});

server.listen(3000, () => {
    console.log("Running on port 3000");
});
