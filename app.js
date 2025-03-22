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
const express = require("express")
const { socket } = require("node:dgram");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { send } = require("node:process");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json());
app.use(express.static("./public"));
let players = [];
let turn = 0;
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public/login.html"));
});

//let players = [];
//let turn = 0; // Tracks the current player's turn
let gameStarted = false;
let hasRolled = {}; // Tracks whether each player has rolled
let firstTurnRolls = {}; // Tracks the first turn dice rolls
 // Tracks the current player's turn

io.on("connection", (socket) => {

  socket.on("assignName",(name)=>{
    if(name.length <=4 && players.length + name.length<=4){
      name.forEach((name,index) => {
        players.push({id:`${socket.id}-${index}`,name});
      });
      console.log("players array",players)
    console.log(`New Player joined :${name} (ID:${socket.id})`);
    io.emit("playersUpdate", players);
    }else{
      socket.emit("errorMessage","Player Limit reached")
    }
  });
  socket.on("disconnect",()=>{
    players = players.filter((player)=>player.id !== socket.id);
    console.log(`Player disconnected:${socket.id}`);
    io.emit("playersUpdate")
  })
 let roundCompleted = false; // To track if the first round of rolls is completed

socket.on("rolldice", () => {
  if (gameStarted) {
    socket.emit("errorMessage", "The game has already started!");
    return;
  }
  console.log("players array inside rolldice",players)
  // Check if the player has already rolled in this turn
  if (hasRolled[socket.id]) {
    socket.emit("errorMessage", "You have already rolled this turn!");
    return;
  }

  // Track that this player has rolled
  hasRolled[socket.id] = true;

  const diceValue = Math.floor(Math.random() * 6) + 1;
  console.log(`Players.name ${socket.id}  rolled: ${diceValue}`);
  io.emit("specialAction",`Players.name ${socket.id}  rolled: ${diceValue}`);
   console.log("player name console ",players)
  // Track the first turn rolls for each player
  if (firstTurnRolls[socket.id] == null) {
    firstTurnRolls[socket.id] = diceValue;
  }

  // If the dice value is 6, give the player another chance to roll
  if (diceValue === 6) {
    // Find player index
    const playerIndex = players.findIndex((players) => players.id === socket.id);
    if (playerIndex !== -1) {
      const playerName = players[playersIndex].name; // Get the player's name

      // Emit special action message with player in the format "name(ID:socketId)"
       io.emit("specialAction", `Player ${playerName}(ID:${socket.id}) rolled a 6 and gets another chance!`);
       console.log(`Emitting specialAction with message: Player ${playerName}(ID:${socket.id}) rolled a 6 and gets another chance!`);
    }

    // Start the game if it's the first player to roll a 6
    if (!gameStarted) {
      gameStarted = true;
      io.emit("gameStarted", "The game has started!");
    }
    return;
  }

  // Update the turn counter if dice is not 6
  turn = (turn + 1) % players.length;

  // If all players have rolled, reset roll tracking for the next round
  if (Object.keys(hasRolled).length === players.length) {
    // All players have rolled, first round is completed
    roundCompleted = true; // Mark that the round is done

    // Reset all players' roll status for the next round
    hasRolled = {};
  }

  // If round is completed and no one rolled a 6, you can start the game or prompt players
  if (roundCompleted && !gameStarted) {
    // If no one rolled a 6, you can start the game manually here, for example:
    gameStarted = true;
    io.emit("gameStarted", "Game has started after the first round of rolls!");
  }
});
})
    
// io.on("connection", (socket) => {
//   if (players.length < 4) {
//     players.push({ id: socket.id, position: 0 });
//     console.log("Players after join:", players);

//     // Emit the current list of players to all clients
//     io.emit("playersJoin", players);

//     // Initialize their roll status for the first turn
//     firstTurnRolls[socket.id] = null; // Null until they roll the dice

//     // If 4 players have joined, emit a ready message
//     if (players.length === 4) {
//       io.emit(
//         "gameReady",
//         "Game is ready to start! Each player must roll the dice."
//       );
//     }
//   }

//   socket.on("rollDice", () => {
//     // Ensure the game is not started yet
//     if (gameStarted) {
//       socket.emit("errorMessage", "The game has already started!");
//       return;
//     }

//     // Ensure it's the player's turn
//     if (players[turn].id !== socket.id) {
//       socket.emit("errorMessage", "It's not your turn!");
//       return;
//     }

//     // Roll the dice
//     const diceValue = Math.floor(Math.random() * 6) + 1;

//     // Update first turn rolls
//     if (firstTurnRolls[socket.id] === null) {
//       firstTurnRolls[socket.id] = diceValue;
//     }

//     console.log(`Player ${socket.id} rolled ${diceValue}`);

//     // If the player rolls a 6, allow them to roll again
//     if (diceValue === 6) {
//       io.emit(
//         "specialAction",
//         `Player ${socket.id} rolled a 6 and gets to roll again!`
//       );
//       return; // Do not advance the turn
//     }

//     // Move to the next player's turn
//     turn = (turn + 1) % players.length;

//     // Emit the dice roll result to all clients
//     io.emit("updatePosition", {
//       id: socket.id,
//       position: players.find((p) => p.id === socket.id).position,
//       diceValue,
//     });

//     // Check if all players have rolled in the first turn
//     if (Object.values(firstTurnRolls).every((roll) => roll !== null)) {
//       if (Object.values(firstTurnRolls).some((roll) => roll === 6)) {
//         gameStarted = true;
//         io.emit("gameStart", "Game has started! Let the competition begin!");
//       } else {
//         io.emit(
//           "gameNotStarted",
//           "No player rolled a 6. The game cannot start."
//         );
//       }
//     }
//   });

//   socket.on("disconnect", () => {
//     players = players.filter((player) => player.id !== socket.id);
//     console.log(`Player ${socket.id} disconnected. Players left:`, players);
//   });
// });

app.get("/login", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/login.html">Login</a>');
});

app.post("/", (req, res) => {
  let userid = "john@gmail.com";
  let userpwd = "john123";
  const { username, userpassword } = req.body;
  if (username === userid && userpassword === userpwd) {
    res.status(200).sendFile(join(__dirname, "public/index.html"));
  } else {
    const msg = "username or password is incorrect ";
    res.json({ msg });
  }
});
app.get("/adminvalidation", (req, res) => {
  res.sendFile(join(__dirname, "public/adminlogin.html"));
});
app.post("/adminLogin", (req, res) => {
  let adminusrnm = "admin@gmail.com";
  let password = "admin123";
  const { adminUsername, adminpswd } = req.body;
  if (adminusrnm === adminUsername && password === adminpswd) {
    //res.send("success")
    res.status(200).sendFile(join(__dirname, "public/admin.html"));
  } else {
    const errmsg = "please enter correct username or password";
    res.json(errmsg);
  }
});
app.get("/matches", (req, res) => {
  res.sendFile(join(__dirname, "public/matches.html"));
});
app.get("/notifications", (req, res) => {
  res.sendFile(join(__dirname, "public/notifications.html"));
});
app.get("/accounts", (req, res) => {
  res.sendFile(join(__dirname, "public/accounts.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(join(__dirname, "public/admin.html"));
});
app.get("/Logout", (req, res) => {
  res.sendFile(join(__dirname, "public/adminlogin.html"));
});
app.get("/gameboard", (req, res) => {
  res.send(join(__dirname, "public/gameboard.html"));
});
server.listen(5000, (req, res) => {
  console.log("server listening at port 5000");
});
