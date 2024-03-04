import { useEffect, useState, useRef } from "react";
import * as THREE from 'three'

import { Environment, MeshPortalMaterial, CameraControls, RoundedBox, useTexture, useCursor, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

import { Charmander } from "./Charmander";
import { Bulbasaur } from "./Bulbasaur";
import { Squirtle } from "./Squirtle";
export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  useCursor(hovered);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />

      <PokemonStage
        name="Charmander"
        color="#F76806"
        texture={
          "textures/fire_realm.jpg"
        }
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Charmander scale={1.6} position-y={-1} hovered={hovered === "Charmander"} />
      </PokemonStage>

      <PokemonStage
        texture={"textures/grass_realm.jpg"}
        name="Bulbasaur"
        color={"#739d3c"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Bulbasaur
          scale={1.5}
          position-y={-1}
          hovered={hovered === "Bulbasaur"}
        />
      </PokemonStage>
      <PokemonStage
        name="Squirtle"
        color="#e0ffff"
        texture={"textures/water_realm.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Squirtle scale={2} position-y={-1} hovered={hovered === "Squirtle"} />
      </PokemonStage>


    </>
  );
};


const PokemonStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture);
  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="fonts/Pokemon.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onClick={() => setActive(active === name ? null : name)}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};