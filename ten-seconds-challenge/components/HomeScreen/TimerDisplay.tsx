import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { Colors, Fonts, Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";

const TimerDisplay = ({ time }: { time: number }) => {
  const { scaleWidth, scaleHeight } = useResponsive();

  return (
    <View
      style={[
        styles.container,
        {
          paddingVertical: scaleHeight(16),
          paddingHorizontal: scaleWidth(24),
          borderRadius: scaleWidth(12),
          borderWidth: scaleWidth(2),
        },
      ]}
    >
      <Text style={[styles.timer, { fontSize: scaleWidth(70) }]}>{time.toFixed(2)}s</Text>
    </View>
  );
};

export default TimerDisplay;

const styles = StyleSheet.create({
  container: {
    
    borderColor: Colors.text,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:  Colors.background,
    elevation: 10,
    position: "relative", 
  },
  timer: {
    fontWeight: "bold",
    color: Colors.text,
    fontFamily: Fonts.bold,
    paddingHorizontal: Spacing.lg,
  },
});
