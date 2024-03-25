import Svg, { Path, SvgProps } from "react-native-svg";

function VisibileEye(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10 3.333c-4.545 0-8.427 2.828-10 6.819 1.573 3.99 5.455 6.818 10 6.818 4.546 0 8.427-2.828 10-6.818-1.573-3.991-5.454-6.819-10-6.819zm0 11.364a4.547 4.547 0 01-4.545-4.545A4.547 4.547 0 0110 5.606a4.547 4.547 0 014.546 4.546A4.547 4.547 0 0110 14.697zm0-7.273a2.724 2.724 0 00-2.727 2.728A2.724 2.724 0 0010 12.879a2.724 2.724 0 002.727-2.727A2.724 2.724 0 0010 7.424z"
        fill="#4D4D4D"
      />
    </Svg>
  );
}

export default VisibileEye;
