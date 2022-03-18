import React from "react";
import { HomeScreen } from "../../features/home/screens/home.screen";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
  CameraScreen: undefined;
};

const HomeNavigator = () => {
  const getScreenOptions: () => NativeStackNavigationOptions = () => ({
    // headerShown: false,
  });
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={getScreenOptions}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
