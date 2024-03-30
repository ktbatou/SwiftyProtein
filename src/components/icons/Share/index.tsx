import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function Share(props: SvgProps) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#DF8F8F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M10 14l11 -11" />
      <Path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
    </Svg>
  );
}

export default Share;
