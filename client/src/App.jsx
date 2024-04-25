import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useMemo, useRef } from "react";
import { Physics } from "@react-three/rapier";
import { Environment, OrbitControls, CameraControls } from "@react-three/drei";
import { Modal } from "./ui/modal";
import { ToolsBar } from "./ui/tools-bar";
import { Logo } from "./ui/logo";
import { Bloom } from "@react-three/postprocessing";
import { Loader } from "@react-three/drei";
import { KeyboardControls } from "@react-three/drei";
import { Scene } from "./components/scene";
import { Ambience } from "./components/Ambience";
function App() {
  const [loading, setLoading] = useState(true);
  const controls= useRef()
  const handleLoaded = () => {
    setLoading(false);
  };

  const map = useMemo(
		() => [
			{ name: "forward", keys: ["ArrowUp", "KeyW"] },
			{ name: "back", keys: ["ArrowDown", "KeyS"] },
			{ name: "left", keys: ["ArrowLeft", "KeyA"] },
			{ name: "right", keys: ["ArrowRight", "KeyD"] },
			{ name: "jump", keys: ["Space"] },
		],
		[]
	);
 
  return (
    <>
    
      {loading && <Loader />}
      <Logo />
      <Modal />
      <ToolsBar />

      <KeyboardControls map={map}>

      <Canvas className="canvas-scene">
        <Ambience/>
        <Suspense fallback={null}>
          <Physics debug>
          
            <OrbitControls enableZoom={false} enablePan={false}></OrbitControls>
            <Scene onLoaded={handleLoaded} />
          </Physics>
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>

      </KeyboardControls>

    </>
  );
}

export default App;
