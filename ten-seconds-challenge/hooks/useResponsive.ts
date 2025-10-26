import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const useResponsive = () => {
  const scaleWidth = (size: number) => (width / 375) * size;  
  const scaleHeight = (size: number) => (height / 812) * size;

  return { scaleWidth, scaleHeight, width, height };
};
