// const express = require("express");
// const { createServer } = require("node:http");
// const { join } = require("node:path");
// const { Server } = require("socket.io");

// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// let players = [];
// let turn = 0; // Keep track of the current player's turn

// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "index.html"));
// });

// // io.on("connection", (socket) => {
// //   // Add new player to the game
// //   if (players.length < 4) {
// //     players.push({ id: socket.id, position: 0 });
// //     console.log("Players after a new join:", players);
// //     io.emit("playerJoin", { id: socket.id, position: 0 });
// //   }

// //   // When a player rolls the dice
// //   socket.on("rollDice", () => {
// //     // Ensure only the current player can roll the dice
// //     if (players[turn].id === socket.id) {
// //       const diceValue = Math.floor(Math.random() * 6) + 1;
// //       players[turn].position += diceValue;

// //       console.log(
// //         `Player ${socket.id} rolled a ${diceValue}, new position: ${players[turn].position}`
// //       );

// //       io.emit("updateBoard", {
// //         player: players[turn],
// //         diceValue,
// //         currentPlayer: players[turn],
// //       });

// //       // If the dice value is less than 6, disconnect the current player
// //       // and pass the turn to the next player
// //       if (diceValue < 6) {
// //         console.log(
// //           `Player ${socket.id} rolled less than 6, disconnecting player.`
// //         );
// //           // Disconnect the current player
// //         socket.emit();
// //         // Remove the disconnected player from the list
// //         players = players.filter((player) => player.id !== socket.id);
// //         console.log("Players after disconnect:", players);

// //         // If there are players left, move the turn to the next player
// //         if (players.length > 0) {
// //           turn = turn % players.length; // Ensure the turn is within bounds
// //           io.emit("updateTurn", { currentPlayer: players[turn] });
// //         }
// //       } else {
// //         // If the dice value is 6, the player gets another turn (they continue rolling)
// //         // No change in turn if dice value is 6
// //         io.emit("updateTurn", { currentPlayer: players[turn] });
// //       }
// //     }
// //   });

// //   // When a player disconnects
// //   socket.on("disconnect", () => {
// //     // Remove the player from the list when they disconnect
// //     players = players.filter((player) => player.id !== socket.id);
// //     console.log("Players after disconnect:", players);
// //     io.emit("playerLeave", { id: socket.id });

// //     // If the disconnected player was the current one, move the turn to the next player
// //     if (players.length > 0 && players[turn].id === socket.id) {
// //       turn = turn % players.length; // Ensure we don't go out of bounds if there's only 1 player
// //       io.emit("updateTurn", { currentPlayer: players[turn] });
// //     }
// //   });
// // });

// // server.listen(5000, () => {
// //   console.log("Server is listening at port 5000");
// // });
// io.on("connection", (socket) => {
//   // Add new player to the game
//   if (players.length < 4) {
//     players.push({ id: socket.id, position: 0, hasStarted: false }); // Track if the player has started
//     console.log("Players after a new join:", players);
//     io.emit("playerJoin", { id: socket.id, position: 0 });
//   }

//   // When a player rolls the dice
//   socket.on("rollDice", () => {
//     // Ensure only the current player can roll the dice
//     if (players[turn].id === socket.id) {
//       const diceValue = Math.floor(Math.random() * 6) + 1;
//       console.log(`Player ${socket.id} rolled a ${diceValue}`);

//       if (!players[turn].hasStarted) {
//         if (diceValue === 6) {
//           players[turn].hasStarted = true; // Mark player as started
//           console.log(`Player ${socket.id} has started the game!`);
//         } else {
//           console.log(`Player ${socket.id} must roll a 6 to start.`);
//           turn = (turn + 1) % players.length; // Move to the next player
//           io.emit("updateTurn", { currentPlayer: players[turn] });
//           return;
//         }
//       }

//       // Update the player's position if they've started
//       players[turn].position += diceValue;

//       io.emit("updateBoard", {
//         player: players[turn],
//         diceValue,
//         currentPlayer: players[turn],
//       });

//       // If the dice value is less than 6, pass the turn to the next player
//       if (diceValue < 6) {
//         turn = (turn + 1) % players.length; // Move to the next player
//       }
//       io.emit("updateTurn", { currentPlayer: players[turn] });
//     }
//   });

//   // Handle player disconnection
//   socket.on("disconnect", () => {
//     players = players.filter((player) => player.id !== socket.id);
//     console.log("Players after disconnect:", players);
//     io.emit("playerLeave", { id: socket.id });

//     // Adjust turn if the disconnected player was the current one
//     if (players.length > 0 && players[turn]?.id === socket.id) {
//       turn = turn % players.length;
//       io.emit("updateTurn", { currentPlayer: players[turn] });
//     }
//   });

// });
//   server.listen(5000, () => {
//     console.log("Server is listening at port 5000");
//   });
const express = require('express');
const { socket } = require('node:dgram');
const {createServer}= require('node:http');
const {join} = require('node:path');
const { send } = require('node:process');
const {Server} = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.static("./public"));
let players =[];
let turn = 0;
 app.use(express.urlencoded({ extended: true }));
 app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "public/login.html"));
 });
 //when a new players joins a game
io.on('connection',(socket)=>{
  if(players.length <= 4){
    players.push({ id: socket.id , position: 0});
    console.log("players after join",players);
    for(let i = 0;i<players.length;i++){
        io.emit("playersJoin", players);
    }
    
  }
  socket.on("rollDice", () => {
    if (players[turn.id] === socket.id);
    const diceValue = Math.floor(Math.random() * 6) + 1;
    players[turn].position += diceValue;

    console.log(
      `Player ${socket.id} and rolled ${diceValue} and new position ${players[turn].position}`
    );
    socket.emit("updatePosition", {
      id: socket.id,
      position: players[turn].position,
    });
  });
  socket.on("updatePosition", ({ Id: playerId, position }) => {
    const player = players.find((p) => p.id === playerId);
    if (player) {
      player.position = position;
      // Emit the updated players array to all clients
      io.emit("playersUpdate", players); // Send updated player positions to all clients
    }
  });
})
//This function is for when a player rolls a dice 


app.get("/login",(req,res)=>{
  res.send('<h1>Home Page</h1><a href="/login.html">Login</a>')
})
 
app.post("/",(req,res)=>{
  let userid="john@gmail.com"
  let userpwd ="john123"
  const {username,userpassword} = req.body;
  if(username === userid && userpassword === userpwd){
    res.status(200).sendFile(join(__dirname, "public/index.html"));
  }
  else{
    const msg = "username or password is incorrect "
    res.json({msg})
  }
});
app.get("/adminvalidation", (req, res) => {
  res.sendFile(join(__dirname, "public/adminlogin.html"));
});
app.post("/adminLogin",(req,res)=>{
  let adminusrnm ="admin@gmail.com"
  let password ="admin123"
  const {adminUsername ,adminpswd } = req.body;
  if(adminusrnm===adminUsername && password ===adminpswd){
    //res.send("success")
    res.status(200).sendFile(join(__dirname,"public/admin.html"))
  }else{
    const errmsg = "please enter correct username or password"
    res.json(errmsg)
  }
})
app.get('/matches',(req,res)=>{
  res.sendFile(join(__dirname, "public/matches.html"));
})
app.get('/notifications',(req,res)=>{
  res.sendFile(join(__dirname,"public/notifications.html"));
})
app.get('/accounts',(req,res)=>{
  res.sendFile(join(__dirname,"public/accounts.html"));
})
app.get('/admin',(req,res)=>{
    res.sendFile(join(__dirname,"public/admin.html"));
})
app.get('/Logout',(req,res)=>{
  res.sendFile(join(__dirname, "public/adminlogin.html"));
}) 
server.listen(5000,(req,res)=>{
  console.log("server listening at port 5000");
})
