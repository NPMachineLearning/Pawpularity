import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import AppNavigation from "./src/infrastructure/navigation";

export default function App() {
  return (
    <React.Fragment>
      <AppNavigation />
      <ExpoStatusBar style="auto" />
    </React.Fragment>
  );
}
