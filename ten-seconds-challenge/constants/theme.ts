import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

export const Colors = {
  primary: "#2d3894",      
  background: "white",
  text: "#1E272E",
  muted: "#808E9B",
  danger: "#ec6292",
  success: "#34C759",
};

export const Fonts = {
  regular: Platform.select({
    android: "Roboto",
  }),
  bold: Platform.select({
    android: "Roboto-Bold",
  }),
};

export const Screen = {
  width,
  height,
  isSmall: width < 360,
  isTablet: width > 768,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 35,
};

export const FontSize = {
  xsmall: 10,
  small: 14,
  medium: 16,
  large: 20,
  xlarge: 40,
};
