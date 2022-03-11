import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { SafeArea } from "../../components/utilities/safe-area.component";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <SafeArea>
      <Text>Main screen</Text>
    </SafeArea>
  );
};
const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ header: () => null }}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
