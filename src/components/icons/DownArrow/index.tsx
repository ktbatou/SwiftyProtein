import Svg, { Path, SvgProps } from "react-native-svg";

function DownArrow(props: SvgProps) {
  return (
    <Svg width={31} height={31} viewBox="0 0 31 31" fill="none" {...props}>
      <Path
        d="M16.414 17.192a1.249 1.249 0 01-1.774.057l-5.905-5.552a1.249 1.249 0 00-1.774.057 1.25 1.25 0 00.056 1.761l5.918 5.552a3.75 3.75 0 005.297-.17l5.551-5.917a1.25 1.25 0 00-1.83-1.705l-5.539 5.917z"
        fill="#4B4B4B"
      />
    </Svg>
  );
}

export default DownArrow;
