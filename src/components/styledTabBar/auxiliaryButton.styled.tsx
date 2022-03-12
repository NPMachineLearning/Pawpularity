import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { getCssUnit } from "../../utils/utils";

export const AuxiliaryWrapper = styled(View)<{ width: number | string }>`
  position: relative;
  width: ${(props) => props.width}${(props) => getCssUnit(props.width)};
  align-items: center;
`;

type Props = SvgProps & {
  color?: string;
  width?: number | string;
};

export const TabBg: React.FC<Props> = ({
  color = "#fff",
  width = 75,
  ...props
}) => {
  return (
    <Svg width={width} height={61} viewBox="0 0 75 61" {...props}>
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  );
};

export const AuxiliaryTabBg = styled(TabBg)`
  position: absolute;
  top: 0;
`;

export const AuxiliaryButton = styled(TouchableOpacity)<{
  offsetTop: number;
  width: number;
  height: number;
  borderRadius: number;
  color: string;
}>`
  top: ${(props) => props.offsetTop}px;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.borderRadius}px;
  background-color: ${(props) => props.color};
`;
