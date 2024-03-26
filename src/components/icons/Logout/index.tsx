import Svg, { Path, SvgProps } from "react-native-svg";

function Logout(props: SvgProps) {
  return (
    <Svg width={17} height={20} viewBox="0 0 17 20" fill="none" {...props}>
      <Path
        d="M1.854 19.875c-.51 0-.946-.216-1.31-.648-.363-.433-.544-.953-.544-1.56V2.208c0-.607.181-1.127.544-1.56C.908.216 1.344 0 1.854 0h6.49v2.208h-6.49v15.459h6.49v2.208h-6.49zm10.198-4.417l-1.275-1.6 2.364-2.816H5.562V8.833h7.58l-2.365-2.815 1.275-1.601 4.636 5.52-4.636 5.521z"
        fill="#DF8F8F"
      />
    </Svg>
  );
}

export default Logout;
