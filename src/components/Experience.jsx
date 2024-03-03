import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from 'three'
import { Charmander} from "./Charmander";
import { Bulbasaur } from "./Bulbasaur";
export const Experience = () => {
  const map = useTexture("textures/grass_realm.jpg");
  return (
    <>
    <Environment preset="sunset" />
  
      <OrbitControls />

      <RoundedBox args={[2,3,0.1]}>
 
      <planeGeometry args={[2,3]}/>
      <MeshPortalMaterial side={THREE.DoubleSide}>
     

        <ambientLight intensity={0.5}/>
        <Environment preset="sunset"/>

        <Charmander scale = {1.5} position-y = {-1.2}/>

        <mesh>
        <sphereGeometry args={[5,32,32]}/>
        <meshStandardMaterial map={map} side={THREE.BackSide}/>
        </mesh>̵
      
      </MeshPortalMaterial>
      </RoundedBox>̵
    </>
  );
};
