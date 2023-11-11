const io = require("socket.io")(3000, {
    cors: {
        origin: "*"
    }
});

let nameList = [];


io.on("connection", socket => {
    socket.on("add-name-to-list", name => {
        nameList.push(name);
        console.log(nameList);
    });
});