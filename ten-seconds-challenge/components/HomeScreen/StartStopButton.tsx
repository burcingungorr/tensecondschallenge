import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors, Fonts, FontSize, Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";

interface Props {
  running: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  showResult: boolean;
}

const StartStopButton = ({ running, onStart, onStop, onReset, showResult }: Props) => {
  const { scaleWidth, scaleHeight } = useResponsive();

  let buttonText = "Başlat";
  if (running) {
    buttonText = "Durdur";
  } else if (showResult) {
    buttonText = "Tekrar Dene";
  }

  return (
    <View style={[styles.container, { bottom: scaleHeight(25) }]}>
      <TouchableOpacity
        style={[
          styles.button,
          running ? styles.stopButton : styles.startButton,
          { width: scaleWidth(180), paddingVertical: scaleHeight(16), borderRadius: scaleWidth(20) },
        ]}
        onPress={running ? onStop : (showResult ? onReset : onStart)}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, { fontSize: scaleWidth(FontSize.medium) }]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartStopButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginBottom: Spacing.sm,
  },
  startButton: {
    backgroundColor: Colors.primary,
  },
  stopButton: {
    backgroundColor: Colors.danger,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: Fonts.bold,
    letterSpacing: 0.5,
  },
});
