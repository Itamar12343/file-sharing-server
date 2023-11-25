const io = require("socket.io")(3000, {
    cors: {
        origin: "*"
    }
});

let nameList = [];


io.on("connection", socket => {

    socket.on("receiverConnect", name => {
        addNameToList(name);
        console.log(nameList);
    });

});


function addNameToList(name) {

    if (nameList[0] == undefined) {
        nameList.push(name);
    }

    nameList.forEach(list => {
        if (name != list) {
            nameList.push(name);
        } else {
            nameList.push(name + " 1");
        }
    });

}



function removeNameFromList(name) {
    let newArray = [...nameList];
    const index = newArray.findIndex((element) => element == name);
    if (index != -1) {
        newArray.splice(index, 1);
        nameList = [...newArray];
    }
}