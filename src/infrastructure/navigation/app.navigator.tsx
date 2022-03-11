import React from "react";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import { SafeArea } from "../../components/utilities/safe-area.component";
import { Ionicons } from "@expo/vector-icons";
import { Button, useTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const theme = useTheme();
  return (
    <SafeArea>
      <Text>Main screen</Text>
      <Button mode="contained">A button</Button>
    </SafeArea>
  );
};
const getScreenOptions: () => BottomTabNavigationOptions = () => ({
  headerShown: false,
  tabBarIcon: () => <Ionicons name="camera" size={34} />,
});

const AppNavigator = () => {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="MainScreen" component={MainScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
