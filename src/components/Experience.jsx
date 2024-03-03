import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from 'three'
import { Charmander} from "./Charmander";
import { Bulbasaur } from "./Bulbasaur";
export const Experience = () => {
  const map = useTexture("textures/grass_realm.jpg");
  return (
    <>
    <Environment preset="sunset" />
      <ambientLight intensity={0.5}/>
      <OrbitControls />
      <Bulbasaur/>
      <Charmander/>
      <mesh>
        <sphereGeometry args={[5,32,32]}/>
        <meshStandardMaterial map={map} side={THREE.BackSide}/>
      </mesh>
  
    </>
  );
};
