import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
} from "three";
import { IAtom } from "src/utils/ligandParser";
import Options from "@components/Options";
import { useAppContext } from "src/lib/AppContext";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import {
  GestureEvent,
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from "react-native-gesture-handler";

interface ILigandPreviewProps {
  ligand: string;
}

export default function LigandPreview(props: ILigandPreviewProps) {
  const { ligand } = props;
  const {
    activeColor,
    activeModelisation,
    orientation,
    cpkColors,
    ligandData,
    viewShotRef,
  } = useAppContext();
  const [rerenderState, setRerenderState] = useState(false);
  let renderer: Renderer;
  let scene: Scene;
  let camera: PerspectiveCamera;

  if (!ligandData) {
    return <></>;
  }
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
    if (!scene) {
      scene = new Scene();
    }
    if (!camera) {
      camera = new PerspectiveCamera(
        orientation === "PORTRAIT" ? 45 : 20,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.z = orientation === "PORTRAIT" ? 50 : 25;
    }

    if (!renderer) {
      renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
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
      mesh.name = JSON.stringify({ ...color, color: color[activeColor] });
      mesh.userData.isAtom = true;

      scene.add(mesh);
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
    scene.add(cylinder);
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
      scene.rotateX(0.01);
      scene.rotateZ(0.01);
      scene.rotateY(0.01);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  const captureSaveAndShare = async () => {
    if (viewShotRef.current) {
      try {
        const uri: string = await viewShotRef.current.capture();
        const fileName = `${ligand}.jpg`;
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        await FileSystem.copyAsync({
          from: uri,
          to: fileUri,
        });

        const fileExists = await FileSystem.getInfoAsync(uri);
        if (fileExists.exists) {
          await Sharing.shareAsync(fileUri, {
            mimeType: "image/jpeg", // Android requires mimeType to be set for sharing
            dialogTitle: `Share ${ligand}`,
            UTI: "public.jpeg", // iOS requires UTI (Uniform Type Identifier) for sharing
          });
        } else {
          alert("File does not exist");
          console.error("File does not exist");
        }
      } catch (error) {
        alert("Capture, Save, or Share failed");
        console.error("Capture, Save, or Share failed", error);
      }
    }
  };

  const zoomIn = () => {
    camera.fov = Math.max(10, camera.fov - 5);
    camera.updateProjectionMatrix();
  };

  const zoomOut = () => {
    camera.fov = Math.min(100, camera.fov + 5);
    camera.updateProjectionMatrix();
  };

  const [scale, setScale] = useState(1);

  // const onPinchEvent = (
  //   event: GestureEvent<PinchGestureHandlerEventPayload>
  // ) => {
  //   const { scale } = event.nativeEvent;
  //   setScale(scale);
  //   // You can directly manipulate the camera here or store the scale in state
  //   // For example, adjust the camera's FOV based on the scale
  //   camera.fov = 75 / scale; // Adjust this formula as needed
  //   camera.updateProjectionMatrix();
  // };

  // const onPinchStateChange = (
  //   event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>
  // ) => {
  //   if (event.nativeEvent.oldState === State.ACTIVE) {
  //     // Gesture ended
  //     // Finalize the zoom effect based on the last known scale
  //     // Here you can adjust the camera's FOV or position to finalize the zoom effect
  //     camera.fov = Math.max(10, Math.min(100, 75 / scale)); // Example adjustment
  //     camera.updateProjectionMatrix();

  //     // Reset the scale for the next gesture, if you're keeping track of it
  //     setScale(1);
  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: "#A4AAEE" }}>
      <TouchableOpacity onPress={captureSaveAndShare}>
        <Text>Capture View</Text>
      </TouchableOpacity>
      <Options />

      <ViewShot
        ref={viewShotRef}
        options={{ format: "jpg", quality: 0.9 }}
        style={{ flex: 1 }}
      >
        <GLView
          key={String(rerenderState)}
          onContextCreate={onContextCreate}
          style={{ flex: 1 }}
        />
      </ViewShot>
    </View>
  );
}
