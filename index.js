const { Socket } = require("socket.io");

const io = require("socket.io")(3000, {
    cors: {
        origin: "*"
    }
});

io.on("connection", ws => {

});