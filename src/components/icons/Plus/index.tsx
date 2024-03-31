import Svg, { Path, SvgProps } from "react-native-svg";

function Plus(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M6.273 15.41v-15h2.545v15H6.273zM.045 9.181V6.636h15v2.546h-15z"
        fill="#4B4B4B"
      />
    </Svg>
  );
}

export default Plus;
