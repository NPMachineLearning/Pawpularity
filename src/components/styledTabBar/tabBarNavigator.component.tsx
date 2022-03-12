import {
  BottomTabBar,
  BottomTabBarProps,
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import React from "react";
import { BGView, PhoneXLine, TabBarView } from "./tabBarNavigator.styled";

type StyledTabBarProps = BottomTabBarProps & {
  bgHeight?: number;
  bgColor?: string;
  phoneXLineColor?: string;
  phoneXLineHeight?: number;
};
const StyledTabBar = (props: StyledTabBarProps) => {
  const {
    bgHeight = 70,
    bgColor = "#f43",
    phoneXLineColor = "#fff",
    phoneXLineHeight = 30,
    ...rest
  } = props;
  return (
    <TabBarView>
      <BGView bgHeight={bgHeight} bgColor={bgColor} />
      <PhoneXLine lineHeight={phoneXLineHeight} lineColor={phoneXLineColor} />
      <BottomTabBar {...rest} />
    </TabBarView>
  );
};

const Tab = createBottomTabNavigator();

type TabNavigatorProps = Omit<typeof Tab.Navigator, "screenOptions">;
type TabBarNavigatorProps = React.ComponentProps<typeof Tab.Navigator> & {
  tabBarColor?: string;
  tabBarBgColor?: string;
  screenOptions?: (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }) => BottomTabNavigationOptions;
};

/**
 * Wrap around BottomTabNavigator
 * @param props
 * @returns
 */
export const TabBarNavigator = (props: TabBarNavigatorProps) => {
  const {
    children,
    tabBarColor = "#fff",
    tabBarBgColor = "#f32",
    screenOptions,
    ...rest
  } = props;

  const getScreenOptions: (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
  }) => BottomTabNavigationOptions = (props) => {
    const options = screenOptions ? { ...screenOptions(props) } : {};

    return {
      ...options,
      tabBarItemStyle: { backgroundColor: tabBarColor },
      tabBarStyle: {
        backgroundColor: "transparent",
      },
    };
  };

  return (
    <Tab.Navigator
      screenOptions={getScreenOptions}
      tabBar={(props) => (
        <StyledTabBar
          bgColor={tabBarBgColor}
          phoneXLineColor={tabBarColor}
          {...props}
        />
      )}
      {...rest}
    >
      {children}
    </Tab.Navigator>
  );
};
