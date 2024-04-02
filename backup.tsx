import React, { useEffect, useReducer, useRef, useState } from "react";
import { GestureResponderEvent, View } from "react-native";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import {
  AmbientLight,
  SphereGeometry,
  PerspectiveCamera,
  Scene,
  Mesh,
  CylinderGeometry,
  Vector3,
  BoxGeometry,
  MeshMatcapMaterial,
  DirectionalLight,
  Group,
  Raycaster,
  Vector2,
} from "three";
import { IAtom } from "src/utils/ligandParser";
import SwitchersPanel from "@routes/Ligand/SwitchersPanel";
import { useAppContext } from "src/lib/AppContext";
import ViewShot from "react-native-view-shot";
import ControlsPanel from "@routes/Ligand/ControlsPanel";
// import OrbitControlsView from "../OrbitControlsView";

export default function LigandPreview() {
  const {
    activeColor,
    activeModelisation,
    orientation,
    cpkColors,
    ligandData,
    viewShotRef,
  } = useAppContext();
  const [rerenderState, setRerenderState] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  // let renderer: Renderer;
  // let scene: Scene;
  // let camera: PerspectiveCamera;
  const raycaster = useRef<Raycaster | null>(null);
  const camera = useRef<PerspectiveCamera | null>(null);
  const renderer = useRef<Renderer>();
  const scene = useRef<Scene>();
  // const moleculeGroup = useRef<Group>(new Group());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  //   const [objects, setObjects] = useState<Mesh[]>([]);
  const objects = useRef<Mesh[]>([]);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });

  if (!ligandData) {
    return <></>;
  }
  useEffect(() => {
    setRerenderState((prev) => !prev);
  }, [activeColor, activeModelisation, orientation]);

  const onContextCreate = (gl: ExpoWebGLRenderingContext) => {
    setDimensions({
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    });
    initializeScene(gl);
    createElements(ligandData.atoms);
    createBonds(ligandData.connects);
    setupLighting();
    startRendering(gl);
  };

  const initializeScene = (gl: ExpoWebGLRenderingContext) => {
    // if (!scene) {
    scene.current = new Scene();
    // scene.current.add(moleculeGroup.current);
    // }
    // if (!camera) {
    camera.current = new PerspectiveCamera(
      orientation === "PORTRAIT" ? 45 : 20,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.current.position.z = orientation === "PORTRAIT" ? 50 : 25;
    // }

    // if (!renderer) {
    renderer.current = new Renderer({ gl });
    renderer.current.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // }
    raycaster.current = new Raycaster();
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
        color: color[activeColor],
        element: atom.element,
        discoverdBy: color.discoverd_by,
        phase: color.phase,
      });
      mesh.userData.isAtom = true;

      // moleculeGroup.current.add(mesh);
      scene.current.add(mesh);
      objects.current.push(mesh);
      //   setObjects((prev) => [...prev, mesh]);
    });
  };

  const createBonds = (connectData: string[][]) => {
    connectData.forEach((bond) => {
      bond.reduce(
        (startPoint, atomId) => {
          const atomCoords = ligandData.serials[atomId];
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
    // moleculeGroup.current.add(cylinder);
    scene.current.add(cylinder);
  };

  const setupLighting = () => {
    const ambientLight = new AmbientLight(0x404040, 0.5);
    scene.current.add(ambientLight);
    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    scene.current.add(directionalLight);
  };

  const startRendering = (gl: ExpoWebGLRenderingContext) => {
    const render = () => {
      requestAnimationFrame(render);
      if (isAutoRotating) {
        // moleculeGroup.current.rotateX(0.01);
        // moleculeGroup.current.rotateY(0.01);
        // moleculeGroup.current.rotateZ(0.01);
      }
      // scene.rotateX(0.01);
      // scene.rotateZ(0.01);
      // scene.rotateY(0.01);
      if (renderer.current && camera.current && scene.current) {
        renderer.current.render(scene.current, camera.current);
      }
      gl.endFrameEXP();
    };
    render();
  };

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

  function intersect(event: GestureResponderEvent) {
    if (!camera.current || !raycaster.current) {
      console.error("Camera or raycaster is not initialized");
      return;
    }
    const { locationX: x, locationY: y } = event.nativeEvent;

    const mouse2D = new Vector2(
      (x / dimensions.width) * 2 - 1,
      -(y / dimensions.height) * 2 + 1
    );
    console.log("==========>", mouse2D);
    raycaster.current.setFromCamera(mouse2D, camera.current);
    console.log();

    const intersects = raycaster.current.intersectObjects(objects.current);
    console.log("========>", intersects);

    if (intersects.length > 0) {
      console.log(intersects[0].object.name);

      // setAtomData(JSON.parse(intersects[0].object.name));
      // setVisible(true);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* <OrbitControlsView camera={camera}> */}
        <ViewShot
          ref={viewShotRef}
          options={{ format: "jpg", quality: 0.9 }}
          style={{ flex: 1 }}
        >
          <GLView
            key={String(rerenderState)}
            onContextCreate={onContextCreate}
            style={{ flex: 1 }}
            onLayout={(event) => {
              setDimensions({
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              });
            }}
            onTouchStart={(event) => {
              const { locationX: x, locationY: y } = event.nativeEvent;
              setStartPoint({ x, y });
            }}
            onTouchEnd={(event) => {
              const { locationX: x, locationY: y } = event.nativeEvent;
              console.log(x, y);
              console.log(startPoint.x, startPoint.y);

              // if (x == startPoint.x && y == startPoint.y)
              intersect(event);
            }}
          />
        </ViewShot>
        {/* </OrbitControlsView> */}
        <ControlsPanel
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onMoveUp={() => {
            // moleculeGroup.current.rotateX(0.1);
            scene.current.rotateX(0.1);
            setIsAutoRotating(false);
          }}
          onMoveDown={() => {
            // moleculeGroup.current.rotateX(-0.1);
            scene.current.rotateX(-0.1);
            setIsAutoRotating(false);
          }}
          onMoveLeft={() => {
            // moleculeGroup.current.rotateY(-0.1);
            scene.current.rotateY(-0.1);
            setIsAutoRotating(false);
          }}
          onMoveRight={() => {
            // moleculeGroup.current.rotateY(0.1);
            scene.current.rotateY(0.1);
            setIsAutoRotating(false);
          }}
        />
      </View>
      <SwitchersPanel />
    </View>
  );
}
