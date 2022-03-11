import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import AppNavigation from "./src/infrastructure/navigation";
import { Provider as ThemeProvider } from "react-native-paper";
import { DefaultTheme } from "./src/infrastructure/theme/default.theme";

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
