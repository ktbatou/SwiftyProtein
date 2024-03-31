import Svg, { Path, SvgProps } from "react-native-svg";

function Minus(props: SvgProps) {
  return (
    <Svg width={11} height={4} viewBox="0 0 11 4" fill="none" {...props}>
      <Path d="M10.454.773v2.5H.274v-2.5h10.181z" fill="#4B4B4B" />
    </Svg>
  );
}

export default Minus;
