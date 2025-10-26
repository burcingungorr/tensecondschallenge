import Header from "@/components/HomeScreen/Header";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";

const Splash = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.push("/auth"); 
    }, 2000);

    return () => clearTimeout(timer);
  },);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.headerWrapper, { opacity: fadeAnim }]}>
        <Header />
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  paddingBottom:'70%'
  },
  headerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
