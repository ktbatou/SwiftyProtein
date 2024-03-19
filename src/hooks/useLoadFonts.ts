import { useFonts } from "expo-font";

const SORTS_MILL_FONT = "../../assets/fonts/sorts";

export default function useLoadFonts() {
  return useFonts({
    "sorts-italic": require(`${SORTS_MILL_FONT}/italic.ttf`),
    "sorts-regular": require(`${SORTS_MILL_FONT}/regular.ttf`),
  });
}
