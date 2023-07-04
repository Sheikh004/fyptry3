import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.id === userId) &&
    users.push({ id: userId, socketId: socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.id === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected");

  //connect
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send message
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    io.to(user.socketId).emit("getMessage", data);
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  // Join a room
  socket.on("joinRoom", (room) => {
    socket.join(room);
    // Emit a message to all members of the room
    io.to(room).emit("message", "A new user has joined the room");
  });

  // Handle chat messages
  socket.on("chatMessage", (data) => {
    io.to(data.room).emit("message", data.message);
  });

  // Leave a room
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    // Emit a message to all members of the room
    io.to(room).emit("message", "A user has left the room");
  });
});

const port = 9590;
io.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
