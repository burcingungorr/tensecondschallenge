import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { Colors, Fonts, FontSize, Spacing } from "@/constants/theme";


const Header = () => {
  const { scaleWidth, scaleHeight } = useResponsive();

  return (
  <View style={[styles.titleContainer, { marginBottom: scaleHeight(Spacing.lg) }]}>
        <Text style={[styles.titleLineOne, { fontSize: scaleWidth(FontSize.xlarge) }]}>
          10.00s
        </Text>
        <Text style={[styles.titleLineTwo, { fontSize: scaleWidth(FontSize.large) }]}>
          CHALLENGE
        </Text>
      </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {},
 titleContainer: {
  position:'absolute',
  top:80,
  alignItems: 'center',
  },
  titleLineOne: { 
    fontWeight: "700",
    color: Colors.danger,
    fontFamily: Fonts.bold,
    textAlign: "center",
  },
  titleLineTwo: { 
    fontWeight: "600",
    color: Colors.danger,
    fontFamily: Fonts.bold,
    textAlign: "center",
    marginTop: -8, 
  },
});
