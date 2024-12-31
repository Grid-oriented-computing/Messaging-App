# Online Chat Application with Word Guessing Game

This is a web-based real-time chat application built using **Node.js** and **Socket.IO**. Alongside its core chat functionality, it also includes an interactive word-guessing game feature. This app allows multiple users to connect, chat, and compete in a fun guessing game.

---

## Features

### 1. Real-Time Chat
- **Interactive UI:** Users can send and receive messages in real time.
- **User Join/Leave Notifications:** Automatically alerts when a user joins or leaves the chat.

### 2. Word Guessing Game
- **Start/Stop Commands:** Users can start the game using `#GAMESTART` and end it with `#GAMESTOP`.
- **Encoded Word Hints:** The game provides encoded words where alternate characters are replaced with underscores (`_`).
- **Correct/Incorrect Guesses:** Real-time feedback on whether a guessed word is correct.
- **Scoreboard:** Tracks and displays scores of all users.

---

## How It Works

1. **Chat Functionality:**
   - Users join the chat by entering their names.
   - Messages are broadcasted to all users in the chat.

2. **Word Guessing Game:**
   - A random word is selected from a predefined list.
   - The word is encoded (e.g., "n_t_o_k") and displayed to users.
   - Users guess the word by typing it into the chat.
   - Correct guesses increase the user's score, and the game continues with a new word.
   - The scoreboard is displayed at the end of the game.

---

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - Socket.IO (client-side)
- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO (server-side)

---

## Installation and Usage

### Prerequisites
Ensure you have the following installed:
- Node.js

### Steps to Run
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open a web browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Commands

### Chat Commands
- Type a message and press **Send** to broadcast it to all users.

### Game Commands
- **Start Game:** `#GAMESTART`
- **Stop Game:** `#GAMESTOP`
- **Guess Word:** Type the guessed word and press **Send**.

---

## Example Screenshot

![Chat App Screenshot](https://via.placeholder.com/800x600?text=Chat+Application+Screenshot)

---

## File Overview

### 1. `index.html`
The main HTML file for the chat application's frontend. It contains:
- Message container for displaying chat messages.
- Input form for typing and sending messages.

### 2. `style.css`
Handles the styling of the application, ensuring a clean and user-friendly interface.

### 3. `script.js`
Contains the client-side JavaScript logic for:
- Handling user interactions.
- Sending and receiving messages via Socket.IO.
- Managing game logic on the client side.

### 4. `server.js`
The Node.js server that:
- Manages Socket.IO connections.
- Handles real-time chat and game-related events.
- Implements the word-guessing game logic.


