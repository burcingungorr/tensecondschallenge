import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, FontSize, Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";

interface Props {
  title?: string;
}

const Header = ({ title  }: Props) => {
  const { scaleWidth, scaleHeight } = useResponsive();

  return (
    <View style={[styles.container, { paddingVertical: scaleHeight(16) }]}>
      <Text style={[styles.title, { fontSize: scaleWidth(FontSize.large) }]}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  title: {
    fontFamily: Fonts.bold,
    color: Colors.background,
    fontWeight: "700",
  },
});
