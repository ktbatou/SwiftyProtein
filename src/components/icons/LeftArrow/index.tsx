import Svg, { Path, SvgProps } from "react-native-svg";

function LeftArrow(props: SvgProps) {
  return (
    <Svg
      width={31}
      height={31}
      viewBox="0 0 31 31"
      fill="none"
      style={{ transform: [{ rotate: "180deg" }] }}
      {...props}
    >
      <Path
        d="M16.89 14.245a1.25 1.25 0 01.018 1.774l-5.68 5.783a1.25 1.25 0 00.018 1.774 1.25 1.25 0 001.763-.017l5.68-5.795a3.75 3.75 0 00-.053-5.3l-5.795-5.68a1.25 1.25 0 00-1.745 1.793l5.795 5.668z"
        fill="#4B4B4B"
      />
    </Svg>
  );
}

export default LeftArrow;
