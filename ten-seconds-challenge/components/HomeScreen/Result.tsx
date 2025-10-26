import React from "react";
import { Text, StyleSheet } from "react-native";
import { Colors, Fonts, FontSize } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";

interface Props {
  time: number;
  target?: number;
}

const TARGET_TIME = 10.0;

const Result = ({ time, target = TARGET_TIME }: Props) => {
  const { scaleWidth } = useResponsive();
  const diff = time - target;

  const diffValue = diff.toFixed(2);
  const diffText = diff >= 0 ? `+${diffValue}` : diffValue;

  const colorStyle = diff > 0 ? styles.diffPositive : styles.diffNegative;

  return (
    <Text style={[styles.diff, colorStyle, { fontSize: scaleWidth(FontSize.medium) }]}>
       {diffText}s
    </Text>
  );
};

export default Result;

const styles = StyleSheet.create({
  diff: {
    fontWeight: "700",
    fontFamily: Fonts.bold,
    position: "absolute",
    bottom: -50, 
  },
  diffPositive: {
    color: Colors.primary,
  },
  diffNegative: {
    color: Colors.danger,
  },
});
