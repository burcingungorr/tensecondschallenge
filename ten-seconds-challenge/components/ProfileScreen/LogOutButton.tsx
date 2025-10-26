import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {  Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";
import { MaterialIcons as Icon } from '@expo/vector-icons';

interface Props {
  onPress?: () => void; 
}

const LogOutButton = ({ onPress }: Props) => {
  const { scaleWidth } = useResponsive();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="logout" size={scaleWidth(28)} color="black" />
    </TouchableOpacity>
  );
};

export default LogOutButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Spacing.sm,
    right: Spacing.sm,
    padding: Spacing.sm,
    zIndex: 100,
  },
});
