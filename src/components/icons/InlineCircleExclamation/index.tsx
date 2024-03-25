import Svg, { Path, SvgProps } from "react-native-svg"

function InlineCircleExclamation(props: SvgProps) {
  return (
    <Svg
      width={59}
      height={59}
      viewBox="0 0 59 59"
      fill="none"
      {...props}
    >
      <Path
        d="M29.5 0C13.228 0 0 13.228 0 29.5S13.228 59 29.5 59 59 45.772 59 29.5 45.772 0 29.5 0zm-3.23 13.477c.808-.932 1.988-1.428 3.23-1.428 2.36 0 4.347 1.925 4.347 4.347v.559l-2.236 18.01c-.683-.186-1.366-.31-2.111-.31-.683 0-1.366.062-2.05.248l-2.297-18.01c-.125-1.18.31-2.422 1.117-3.416zm3.23 33.475c-2.422 0-4.347-1.988-4.347-4.41a4.32 4.32 0 014.347-4.347c2.422 0 4.41 1.925 4.41 4.347-.063 2.422-1.988 4.41-4.41 4.41z"
        fill="#FD5961"
      />
    </Svg>
  )
}

export default InlineCircleExclamation
