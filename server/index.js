import {Server} from "socket.io"

const io= new Server({
    cors:{
        origin: "http://localhost:5173",
    },
});

io.listen(3000);

const characters=[];

const generateRandomPosition = () => {

    // return [Math.random() * 3, 0.1, Math.random() * 3]
    return [0, 0.1, 0];
    // return [0, Math.random() * 3,0]
}

// Function to generate random positions within a specified range
// const generateRandomPosition = () => {
//     const minX = -5; // Define the minimum X coordinate
//     const maxX = 5; // Define the maximum X coordinate
//     const minZ = -5; // Define the minimum Z coordinate
//     const maxZ = 5; // Define the maximum Z coordinate

//     const randomX = Math.random() * (maxX - minX) + minX;
//     const randomZ = Math.random() * (maxZ - minZ) + minZ;
//     const randomY = 0.1; // Constant Y coordinate

//     return [randomX, randomY, randomZ];
// };

io.on("connection", (socket) => {
    console.log("user connected");
   
    const position = generateRandomPosition();

   
    const rigidposition = [...position];
    rigidposition[1] += 1.1;

    characters.push({
        id: socket.id,
        position: position,
        rigidposition: rigidposition
    });


    console.log(characters)
 
    socket.emit("hello",{
        characters,
        id: socket.id,
    });
    io.emit("characters", characters);

    // socket.on("move", (position)=>{
    //     const character= characters.find((character)=> character.id===socket.id)
    //     character.position=position
    //     io.emit("characters", characters)
    // })

 

    // Inside the connection event handler


    // socket.on("move", (data) => {
    //     const character = characters.find((character) => character.id === socket.id);
    //     character.position = data.position;
    //     // Emit the move event only to the socket that initiated the movement
    //     io.emit("playerMove", character);
    //     // Broadcast the updated characters array to all clients except the one that initiated the movement
    //     socket.broadcast.emit("characters", characters);
    // });
    

    // socket.on("move", (data) => {
    //     const { id, position } = data;
    //     const character = characters.find((char) => char.id === id);
    //     if (character) {
    //         character.position = position;
    //         io.emit("characters", characters);
    //     }
    // });

    socket.on("disconnect", () => {
      console.log("user disconnected");

      characters.splice(
        characters.findIndex((character)=> character.id===socket.id), 1
    )
    io.emit("characters", characters)
    });
});