import {useEffect} from "react"
import {io} from "socket.io-client"
import {useAtom, atom} from "jotai"

export const socket= io("http://localhost:3000");
export const charactersAtom = atom([]);
export const mapAtom = atom(null);
export const userAtom = atom(null);

export const SocketManager = () => {

 const [_characters, setCharacters]= useAtom(charactersAtom)
 const [_map, setMap] = useAtom(mapAtom);
 const [_user, setUser] = useAtom(userAtom);

 useEffect(()=> {
 function onConnect(){
     console.log("woo connected");
  }

 function onDisconnect() {
   console.log("woo disconnected");
 }

 function onHello(value) {
  // setMap(value.map);
  setUser(value.id);
  setCharacters(value.characters);
}


 function onCharacters(value){
 console.log("woo characters are", value)
 setCharacters(value);
 }

 function onMapUpdate(value) {
  // setMap(value.map);
  setCharacters(value.characters);
}
 
 socket.on("connect", onConnect);
 socket.on("disconnect", onDisconnect);
 socket.on("hello", onHello);
 socket.on("characters", onCharacters)
 socket.on("mapUpdate", onMapUpdate);
 return () =>{
 socket.off("connect", onConnect);
 socket.off("disconnect", onDisconnect);
 socket.off("hello", onHello);
 socket.off("characters", onCharacters);
 socket.off("mapUpdate", onMapUpdate);
 };
}, []);
};