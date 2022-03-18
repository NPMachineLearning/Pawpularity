import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app.navigator";
import HomeNavigator from "./home.navigator";

const AppNavigation = () => {
  return (
    <NavigationContainer>
      {/* <AppNavigator /> */}
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
