import React from "react";
import {
  BottomTabBarButtonProps,
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { Paragraph, useTheme } from "react-native-paper";
import { SafeArea } from "../../components/utilities/safe-area.component";
import { TabBarNavigator } from "../../components/styledTabBar/tabBarNavigator.component";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { TabBarAuxiliaryButton } from "../../components/styledTabBar/auxiliaryButton.component";

type Props = SvgProps & {
  color?: string;
};

export const TabBg: React.FC<Props> = ({ color = "#fff", ...props }) => {
  return (
    <Svg width={75} height={61} viewBox="0 0 75 61" {...props}>
      <Path
        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
        fill={color}
      />
    </Svg>
  );
};

export type RootParamList = {
  DummyScreenLeft: undefined;
  HomeScreen: undefined;
  DummyScreenRight: undefined;
};

const Tab = createBottomTabNavigator();

const DummyScreen = () => null;

const AppNavigator = () => {
  const theme = useTheme();

  const tabBarColor = theme.colors.notification;
  const tabBarBgColor = theme.colors.error;

  const getScreenOptions: () => BottomTabNavigationOptions = () => ({
    headerShown: false,
  });

  return (
    <TabBarNavigator
      tabBarColor={tabBarColor}
      tabBarBgColor={tabBarBgColor}
      screenOptions={getScreenOptions}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="DummyScreenLeft"
        component={DummyScreen}
        options={{ tabBarLabel: () => null, tabBarIcon: () => null }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TabBarAuxiliaryButton
              bgColor={tabBarColor}
              btnColor="#003f"
              onPress={props.onPress}
            >
              <Ionicons name="person" size={24} color="#fff" />
            </TabBarAuxiliaryButton>
          ),
        }}
      />
      <Tab.Screen
        name="DummyScreenRight"
        component={DummyScreen}
        options={{ tabBarLabel: () => null, tabBarIcon: () => null }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
          },
        }}
      />
    </TabBarNavigator>
  );
};

export default AppNavigator;
