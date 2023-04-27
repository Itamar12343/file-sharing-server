const io = require("socket.io")(3000, {
    cors: {
        origin: "*"
    }
});

io.on("connection", ws => {
    ws.emit("h", "tre");
});