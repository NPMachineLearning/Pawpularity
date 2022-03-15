import React from "react";
import { Button } from "react-native-paper";
import { SafeArea } from "../../../components/utilities/safe-area.component";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../../../infrastructure/navigation/app.navigator";

type Props = BottomTabScreenProps<RootParamList, "HomeScreen">;

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeArea>
      <Button mode="contained">take photo</Button>
    </SafeArea>
  );
};
