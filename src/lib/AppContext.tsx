import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { Dimensions } from "react-native";
import cpkColors from "@utils/CPKColors.json";
import { ILigandParserResult } from "@utils/ligandParser";
import { Group, Mesh, Raycaster, Scene } from "three";

export type TModelisation = "SPHERE" | "CUBE";
export type TColor = "rasmol" | "jmol";
export type TORIENTATION = "PORTRAIT" | "LANDSCAPE";

interface ContextState {
  activeModelisation: TModelisation;
  setActiveModelisation: (modelisation: TModelisation) => void;
  activeColor: TColor;
  setActiveColor: (modelisation: TColor) => void;
  orientation: TORIENTATION;
  cpkColors: any; // Add Type
  ligandData: ILigandParserResult | undefined;
  setLigandData: (data: ILigandParserResult) => void;
  viewShotRef: any;
  raycaster: Raycaster;
  scene: Scene;
  moleculeGroup: Group;
  objects: Mesh[];
}

const defaultState: ContextState = {
  activeModelisation: "SPHERE",
  setActiveModelisation: () => {},
  activeColor: "rasmol",
  setActiveColor: () => {},
  orientation: "PORTRAIT",
  cpkColors,
  ligandData: undefined,
  setLigandData: () => {},
  viewShotRef: undefined,
  moleculeGroup: new Group(),
  objects: [],
  raycaster: new Raycaster(),
  scene: new Scene(),
};

const AppContext = createContext<ContextState>(defaultState);

interface AppProviderProps {
  children: ReactNode;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeModelisation, setActiveModelisation] =
    useState<TModelisation>("SPHERE");
  const [activeColor, setActiveColor] = useState<TColor>("rasmol");
  const [orientation, setOrientation] = useState<TORIENTATION>(
    windowWidth < windowHeight ? "PORTRAIT" : "LANDSCAPE"
  );
  const [ligandData, setLigandData] = useState<ILigandParserResult>();
  const viewShotRef = useRef(null);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      const currentOrientation = width > height ? "LANDSCAPE" : "PORTRAIT";
      setOrientation(currentOrientation);
    };

    const subscription = Dimensions.addEventListener(
      "change",
      updateOrientation
    );

    updateOrientation();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeModelisation,
        setActiveModelisation,
        activeColor,
        setActiveColor,
        orientation,
        cpkColors,
        ligandData,
        setLigandData,
        viewShotRef,
        moleculeGroup: new Group(),
        objects: [],
        raycaster: new Raycaster(),
        scene: new Scene(),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
