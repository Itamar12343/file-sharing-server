const io = require("socket.io")(3000, {
    cors: {
        origin: "*"
    }
});

let nameList = [];
let isDualName = false;


io.on("connection", socket => {

    socket.on("receiverConnect", name => {
        let myName;

        if (checkIfNameAlredyExist(name) == "true") {
            addNameToList(name);
            myName = name;
        } else {
            console.log(false);
        }
    });

    socket.on("disconnect", () => {
        console.log("hi");
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