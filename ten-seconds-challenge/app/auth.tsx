import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";

import { Colors, Spacing, Fonts, FontSize } from "@/constants/theme";
import Header from "@/components/HomeScreen/Header";
import LoginForm from "@/components/AuthScreen/LoginForm";
import RegisterForm from "@/components/AuthScreen/RegisterForm";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setIsLogin(true)}
        >
          <Text style={[styles.tabText, isLogin && styles.activeText]}>Giriş</Text>
          {isLogin && <View style={styles.underline} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setIsLogin(false)}
        >
          <Text style={[styles.tabText, !isLogin && styles.activeText]}>Kayıt</Text>
          {!isLogin && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {isLogin ? <LoginForm  /> : <RegisterForm />}
      </ScrollView>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    paddingVertical: Spacing.lg,
    alignItems: "center",
    backgroundColor: Colors.background,
    zIndex: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 300,
    marginBottom: Spacing.lg,
    marginHorizontal: Spacing.md,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.large,
    color: Colors.text,
  },
  activeText: {
    fontWeight: "bold",
  },
  underline: {
    marginTop: 4,
    height: 3,
    width: 160,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  scrollContainer: {
    paddingHorizontal: Spacing.lg,
    minHeight: SCREEN_HEIGHT,
  },
});
