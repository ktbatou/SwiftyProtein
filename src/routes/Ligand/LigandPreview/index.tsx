import React, { useEffect, useRef, useState } from "react";
import { Dimensions, GestureResponderEvent, View } from "react-native";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import {
  AmbientLight,
  SphereGeometry,
  PerspectiveCamera,
  Mesh,
  CylinderGeometry,
  Vector3,
  BoxGeometry,
  MeshMatcapMaterial,
  DirectionalLight,
  Vector2,
  Material,
  Texture,
  Scene,
} from "three";
import { IAtom } from "src/utils/ligandParser";
import SwitchersPanel from "@routes/Ligand/SwitchersPanel";
import { useAppContext } from "src/lib/AppContext";
import ViewShot from "react-native-view-shot";
import ControlsPanel from "@routes/Ligand/ControlsPanel";
import Popin from "@routes/Ligand/AtomPopin";

import styles from "./style";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

interface IAtomData {
  name: string;
  element: string;
  phase: string;
  discoveredBy: string;
}

export default function LigandPreview() {
  const {
    activeColor,
    activeModelisation,
    orientation,
    cpkColors,
    ligandData,
    viewShotRef,
    moleculeGroup,
    objects,
    raycaster,
    scene,
  } = useAppContext();
  const [visible, setVisible] = useState(false);
  const [atomData, setAtomData] = useState<IAtomData>();
  const [rerenderState, setRerenderState] = useState(false);
  const camera = useRef<PerspectiveCamera | null>(null);
  const renderer = useRef<Renderer>();

  if (!ligandData) {
    return <></>;
  }

  useEffect(() => {
    function cleanupScene(scene: Scene): void {
      scene.traverse((object) => {
        if ((object as Mesh).isMesh) {
          const mesh = object as Mesh;
          mesh.geometry?.dispose();

          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          materials.forEach((material: Material) => {
            disposeMaterial(material);
          });
        }
      });

      function disposeMaterial(material: Material): void {
        Object.keys(material).forEach((prop) => {
          const value = material[prop as keyof Material];
          if (value && (value as Texture).dispose) {
            (value as Texture).dispose();
          }
        });
        material.dispose();
      }

      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    }

    cleanupScene(scene);
  }, []);

  useEffect(() => {
    setRerenderState((prev) => !prev);
  }, [activeColor, activeModelisation, orientation]);

  const onContextCreate = (gl: ExpoWebGLRenderingContext) => {
    initializeScene(gl);
    createElements(ligandData.atoms);
    createBonds(ligandData.connects);
    setupLighting();
    startRendering(gl);
  };

  const initializeScene = (gl: ExpoWebGLRenderingContext) => {
    scene.add(moleculeGroup);
    camera.current = new PerspectiveCamera(
      orientation === "PORTRAIT" ? 45 : 20,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.current.position.z = orientation === "PORTRAIT" ? 50 : 25;

    renderer.current = new Renderer({ gl });
    renderer.current.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  };

  const createElements = (atoms: IAtom[]) => {
    atoms.forEach((atom) => {
      const elementSymbol =
        atom.element.length > 1
          ? `${atom.element[0]}${atom.element[1].toLowerCase()}`
          : atom.element[0];
      const color = cpkColors[elementSymbol];

      const geometry =
        activeModelisation === "CUBE"
          ? new BoxGeometry(0.6, 0.6, 0.6)
          : new SphereGeometry(0.5);
      const material = new MeshMatcapMaterial({
        color: color[activeColor],
      });

      const mesh = new Mesh(geometry, material);
      mesh.position.set(atom.x, atom.y, atom.z);
      mesh.name = JSON.stringify({
        ...color,
        element: atom.element,
      });
      mesh.userData.isAtom = true;

      moleculeGroup.add(mesh);
      objects.push(mesh);
    });
  };

  const createBonds = (connectData: string[][]) => {
    connectData.forEach((bond) => {
      bond.reduce(
        (startPoint, atomId) => {
          const atomCoords = ligandData.serials[atomId as any];
          const endPoint = new Vector3(
            atomCoords.x,
            atomCoords.y,
            atomCoords.z
          );
          if (startPoint) {
            createChemicalBond(startPoint, endPoint);
          }
          return endPoint;
        },
        null as Vector3 | null
      );
    });
  };

  const createChemicalBond = (startPoint: Vector3, endPoint: Vector3) => {
    const cylLength = startPoint.distanceTo(endPoint);
    const geometry = new CylinderGeometry(0.2, 0.2, cylLength, 8);
    geometry.translate(0, cylLength / 2, 0);
    geometry.rotateX(Math.PI / 2);
    const material = new MeshMatcapMaterial({ color: 0xffffff });
    const cylinder = new Mesh(geometry, material);
    cylinder.position.copy(startPoint);
    cylinder.lookAt(endPoint);
    moleculeGroup.add(cylinder);
  };

  const setupLighting = () => {
    const ambientLight = new AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    scene.add(directionalLight);
  };

  const startRendering = (gl: ExpoWebGLRenderingContext) => {
    const render = () => {
      requestAnimationFrame(render);
      if (renderer.current && camera.current && scene) {
        renderer.current.render(scene, camera.current);
      }
      gl.endFrameEXP();
    };
    render();
  };

  function intersect(event: GestureResponderEvent) {
    if (!camera.current || !raycaster) {
      console.error("Camera or raycaster is not initialized");
      return;
    }
    const { pageX, pageY } = event.nativeEvent;

    const mouse2D = new Vector2(
      (pageX / screenWidth) * 2 - 1,
      -(pageY / screenHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse2D, camera.current);
    const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      setAtomData(JSON.parse(intersects[0].object.name));
      setVisible(true);
    }
  }

  const onZoomIn = () => {
    if (camera.current) {
      camera.current.fov = Math.max(10, camera.current.fov - 5);
      camera.current.updateProjectionMatrix();
    }
  };

  const onZoomOut = () => {
    if (camera.current) {
      camera.current.fov = Math.min(100, camera.current.fov + 5);
      camera.current.updateProjectionMatrix();
    }
  };

  const onMoveUp = () => {
    moleculeGroup.rotateX(0.1);
  };

  const onMoveDown = () => {
    moleculeGroup.rotateX(-0.1);
  };

  const onMoveLeft = () => {
    moleculeGroup.rotateY(-0.1);
  };

  const onMoveRight = () => {
    moleculeGroup.rotateY(0.1);
  };

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1}>
        <ViewShot
          ref={viewShotRef}
          options={{ format: "jpg", quality: 0.9 }}
          style={styles.flex1}
        >
          <GLView
            key={String(rerenderState)}
            onContextCreate={onContextCreate}
            style={styles.flex1}
            onTouchEnd={intersect}
          />
        </ViewShot>
        <ControlsPanel
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onMoveUp={onMoveUp}
          onMoveDown={onMoveDown}
          onMoveLeft={onMoveLeft}
          onMoveRight={onMoveRight}
        />
      </View>

      {atomData && (
        <Popin
          atom={atomData}
          onClose={() => setVisible(false)}
          visible={visible}
        />
      )}
      <SwitchersPanel />
    </View>
  );
}
