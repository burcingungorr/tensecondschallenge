import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { Colors } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFound() {
  const { scaleWidth, scaleHeight } = useResponsive();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.box, { width: scaleWidth(250), height: scaleHeight(250) }]}>
        <LottieView
          source={require("@/assets/animations/error.json")}
          autoPlay
          loop={false} 
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
  },
});
