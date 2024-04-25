/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 src/assets/models/Demon.glb --transform --meta 
Files: src/assets/models/Demon.glb [485.52KB] > /Users/federicomartin/Desktop/Programación/risidio-3d-assessment/Demon-transformed.glb [181.28KB] (63%)
*/
// import modelURL from "../../public/assets/3d/Demon-transformed.glb"
//import modelURL from "../../assets/3d/Demon-transformed.glb";
import useAppStore from "../store/store";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function Demon() {
	const group = useRef();

	const { nodes, materials, animations } = useGLTF('/assets/3d/Demon-transformed.glb');
	
	const { actions } = useAnimations(animations, group);

	const characterState = useAppStore((state) => state.characterState);

	useEffect(() => {
		actions[characterState].reset().fadeIn(0.2).play();
		return () => {
			actions[characterState].fadeOut(0.2);
		};
	}, [characterState, actions]);

	return (
		<group
			ref={group}
			dispose={null}
			scale={0.3}
			rotation={[0, Math.PI, 0]}
		>
			<group name="Root_Scene">
				<primitive object={nodes.Root} />
				<group
					name="Demon"
					rotation={[-Math.PI / 2, 0, 0]}
					scale={100}
					userData={{ name: "Demon" }}
				>
					<skinnedMesh
						name="Demon_1"
						geometry={nodes.Demon_1.geometry}
						material={materials.Demon_Main}
						skeleton={nodes.Demon_1.skeleton}
					/>
					<skinnedMesh
						name="Demon_2"
						geometry={nodes.Demon_2.geometry}
						material={materials.Black}
						skeleton={nodes.Demon_2.skeleton}
					/>
					<skinnedMesh
						name="Demon_3"
						geometry={nodes.Demon_3.geometry}
						material={materials.Eye_White}
						skeleton={nodes.Demon_3.skeleton}
					/>
					<skinnedMesh
						name="Demon_4"
						geometry={nodes.Demon_4.geometry}
						material={materials.Eye_Black}
						skeleton={nodes.Demon_4.skeleton}
					/>
				</group>
				<skinnedMesh
					name="Trident"
					geometry={nodes.Trident.geometry}
					material={materials.Black}
					skeleton={nodes.Trident.skeleton}
					position={[1.895, 1.734, -0.17]}
					scale={75.326}
					userData={{ name: "Trident" }}
				/>
			</group>
		</group>
	);
}

// useGLTF.preload(modelURL);