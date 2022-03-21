import { View } from "react-native";
import { Card } from "react-native-paper";
import styled from "styled-components/native";

export const HomeWrapper = styled(View)`
  background-color: lightgrey;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2%;
`;

export const CardWrapper = styled(View)<{ height?: string }>`
  margin-bottom: 1%;
  height: ${(props) => (props.height ? props.height : "50%")};
`;

export const CardRoot = styled(Card).attrs({ elevation: 3 })`
  height: 100%;
`;

export const CardCover = styled(Card.Cover)`
  height: 100%;
`;

export const ButtonWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
