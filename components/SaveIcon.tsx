import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SaveIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M18 5a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V5Zm-9 7h14a1 1 0 0 0 1-1V0H8v11a1 1 0 0 0 1 1ZM28 0h-2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V0H4a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z"
    />
  </Svg>
);
export default SaveIcon;
