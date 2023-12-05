const io = require("socket.io")(3000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

let nameList = [];
let isDualName = false;


io.on("connection", socket => {
    let myName;


    socket.on("receiverConnect", name => {


        if (checkIfNameAlredyExist(name) == "true") {
            addNameToList(name);
            myName = name;
            console.log(nameList);
        } else {
            console.log(false);
        }
    });

    socket.on("disconnect", () => {
        if (myName != undefined) {
            console.log(myName + " disconnected");
            removeNameFromList(myName);
            console.log(nameList);
        }
    });

});



function addNameToList(name) {

    nameList.forEach(list => {
        if (name != list) {
            nameList.push(name);
        }

    });

    if (nameList[0] == undefined) {
        nameList.push(name);
    }

}

function checkIfNameAlredyExist(name) {
    nameList.forEach(list => {
        if (name != list) {
            return "true";
        } else {
            return "false";
        }
    });

    if (nameList[0] == undefined) {
        return "true";
    }
}



function removeNameFromList(name) {
    let newArray = [...nameList];
    const index = newArray.findIndex((element) => element == name);
    if (index != -1) {
        newArray.splice(index, 1);
        nameList = [...newArray];
    }
}