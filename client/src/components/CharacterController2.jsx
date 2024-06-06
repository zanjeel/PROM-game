import * as THREE from 'three';
import { Avatar2 } from "./Avatar2";
import { charactersAtom} from "./SocketManager";
import {useAtom} from "jotai"



function CharacterControls() {
  const [characters]= useAtom(charactersAtom)
	// console.log("characters", characters)
   // Following camera to character

	return (
		<>
	
		{characters.map((character) => (	
			
            <Avatar2
            id= {character.id}
            key= {character.id}
            position = {new THREE.Vector3(
                character.position[0], 
                character.position[1],
                character.position[2])}
            rigidposition = {character.rigidposition}
            />
	  ))}
	</>
	);
}

export default CharacterControls;
