import { View } from "react-native";
import styled from "styled-components/native";

export const HomeWrapper = styled(View)`
  background-color: lightgrey;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2%;
`;

export const CardWrapper = styled(View)`
  margin-bottom: 1%;
`;

export const ButtonWrapper = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
