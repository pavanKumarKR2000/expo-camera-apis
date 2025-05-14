import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const CameraFlipIcon = (props: SvgProps) => (
  <Svg fill="#fff" stroke="#fff" viewBox="0 0 30 30" {...props}>
    <Path
      stroke="none"
      d="M5 5c-1.108 0-2 .892-2 2v16c0 1.108.892 2 2 2h20c1.108 0 2-.892 2-2V7c0-1.108-.892-2-2-2H5zm10 3.629c3.51 0 6.371 2.861 6.371 6.371H23.5l-2.834 3.541L17.834 15h2.121a4.945 4.945 0 0 0-6.615-4.666l-1.078-1.076A6.317 6.317 0 0 1 15 8.628zm-5.666 2.83L12.166 15h-2.121a4.945 4.945 0 0 0 6.615 4.666l1.078 1.076a6.317 6.317 0 0 1-2.738.63c-3.51 0-6.371-2.862-6.371-6.372H6.5l2.834-3.541z"
      fill="#fff"
      fillOpacity={1}
      strokeWidth={0.5}
      strokeMiterlimit={4}
      strokeDasharray="none"
      strokeOpacity={1}
    />
  </Svg>
);
export default CameraFlipIcon;
