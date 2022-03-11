import { DefaultTheme as theme } from "react-native-paper";
const { contrastColor } = require("contrast-color");

/**
 * Find contrast color
 * @param color target color, hex color "#fff" or name "red"
 * @param threshold  0 ~ 255
 * @returns contrast color
 */
const FindContrastColor = (color: string, threshold: number = 128) => {
  return contrastColor({ bgColor: color, threshold: threshold });
};

declare global {
  namespace ReactNativePaper {
    interface Theme {
      spacing: {
        none: number;
        small: number;
        regular: number;
        medium: number;
        large: number;
      };
      size: {
        small: number;
        regular: number;
        medium: number;
        large: number;
      };
      utils: {
        FindContrastColor: typeof FindContrastColor;
      };
    }
  }
}

export const DefaultTheme = {
  ...theme,
  spacing: {
    none: 0,
    small: 4,
    regular: 8,
    medium: 16,
    large: 32,
  },
  size: {
    small: 4,
    regular: 8,
    medium: 16,
    large: 32,
  },
  utils: {
    FindContrastColor: FindContrastColor,
  },
};
