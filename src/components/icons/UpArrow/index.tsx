import Svg, { Path, SvgProps } from "react-native-svg";

function UpArrow(props: SvgProps) {
  return (
    <Svg width={31} height={31} viewBox="0 0 31 31" fill="none" {...props}>
      <Path
        d="M14.44 13.644a1.25 1.25 0 011.775-.044l5.867 5.592a1.252 1.252 0 001.775-.045 1.25 1.25 0 00-.045-1.762l-5.88-5.591a3.75 3.75 0 00-5.298.133l-5.591 5.88a1.25 1.25 0 001.818 1.717l5.58-5.88z"
        fill="#4B4B4B"
      />
    </Svg>
  );
}

export default UpArrow;
