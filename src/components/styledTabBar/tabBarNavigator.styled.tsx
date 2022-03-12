import { View } from "react-native";
import styled from "styled-components/native";

export const TabBarView = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.22;
  shadow-radius: 12px;
`;

export const BGView = styled(View)<{ bgHeight: number; bgColor: string }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${(props) => props.bgHeight}px;
  background-color: ${(props) => props.bgColor};
`;

export const PhoneXLine = styled(View)<{
  lineHeight: number;
  lineColor: string;
}>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${(props) => props.lineHeight}px;
  background-color: ${(props) => props.lineColor};
`;
