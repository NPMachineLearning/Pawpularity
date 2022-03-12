import React from "react";
import { GestureResponderEvent } from "react-native";
import {
  AuxiliaryButton,
  AuxiliaryTabBg,
  AuxiliaryWrapper,
} from "./auxiliaryButton.styled";

type TabBarAuxiliaryButtonProps = {
  children?: React.ReactNode;
  width?: number | string;
  bgColor?: string;
  btnOffsetTop?: number;
  btnWidth?: number;
  btnHeight?: number;
  btnBorderRadius?: number;
  btnColor?: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};
export const TabBarAuxiliaryButton = (props: TabBarAuxiliaryButtonProps) => {
  const {
    children,
    width = 75,
    bgColor = "#fff",
    btnOffsetTop = -22.5,
    btnWidth = 50,
    btnHeight = 50,
    btnBorderRadius = 27,
    btnColor = "#E94F37",
    onPress = undefined,
  } = props;
  return (
    <AuxiliaryWrapper width={width}>
      <AuxiliaryTabBg color={bgColor} width={width} />
      <AuxiliaryButton
        offsetTop={btnOffsetTop}
        width={btnWidth}
        height={btnHeight}
        borderRadius={btnBorderRadius}
        color={btnColor}
        onPress={onPress}
      >
        {children}
      </AuxiliaryButton>
    </AuxiliaryWrapper>
  );
};
