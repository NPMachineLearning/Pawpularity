import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import AppNavigation from "./src/infrastructure/navigation";
import { Provider as ThemeProvider } from "react-native-paper";
import { DefaultTheme } from "./src/infrastructure/theme/default.theme";
// import { ThemeProvider } from "styled-components/native";

export default function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={DefaultTheme}>
        <AppNavigation />
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </React.Fragment>
  );
}
