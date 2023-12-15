const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:5173", "https://file-sharing123.netlify.app"],
        methods: ["GET", "POST"]
    }
});

let nameList = [];
let isDualName = false;


io.on("connection", socket => {
    let myName;


    socket.on("receiverConnect", name => {

        checkIfNameAlredyExist(name);

    });

    socket.on("disconnect", () => {
        if (myName != undefined) {
            console.log(myName + " disconnected");
            removeNameFromList(myName);
            console.log(nameList);
        }
    });




    function checkIfNameAlredyExist(name) {
        nameList.forEach(list => {
            if (name == list) {
                socket.emit("nameError");
                console.log("name err");
            } else {
                addNameToList(name);
                myName = name;
                console.log(nameList);
            }
        });

        if (nameList[0] == undefined) {
            addNameToList(name);
            myName = name;
            console.log(nameList);

        }
    }

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




function removeNameFromList(name) {
    let newArray = [...nameList];
    const index = newArray.findIndex((element) => element == name);
    if (index != -1) {
        newArray.splice(index, 1);
        nameList = [...newArray];
    }
}