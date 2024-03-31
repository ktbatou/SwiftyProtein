import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M13.25 15.887a1.25 1.25 0 010-1.774l5.737-5.725a1.248 1.248 0 000-1.775 1.25 1.25 0 00-1.762 0l-5.738 5.737a3.75 3.75 0 000 5.3l5.738 5.738a1.25 1.25 0 001.762-1.776l-5.737-5.724z"
        fill="#DF8F8F"
      />
    </Svg>
  );
}

export default SvgComponent;
