import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Environment } from "@react-three/drei";

export const Ambience = () => {
	return (
		<>
			
			<ambientLight color={"yellow"} intensity={0.5} />
			<EffectComposer> 
				<Bloom
					intensity={0.7}
					luminanceThreshold={1.9}
					luminanceSmoothing={0.0025}
					mipmapBlur
				/>
			</EffectComposer>
		</>
	);
}

