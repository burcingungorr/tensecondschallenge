import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Colors, Fonts, Spacing, FontSize } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";

interface Props {
  time: number;
  diff: number;
  index: number;
  date: string; 
  onDelete: () => void; 
}

export const HistoryCard = ({ time, diff, index, date, onDelete }: Props) => {
  const { scaleWidth, scaleHeight } = useResponsive();
  const diffText = diff >= 0 ? `+${diff.toFixed(2)}s` : `${diff.toFixed(2)}s`;
  const diffColor = diff >= 0 ? Colors.primary : Colors.danger;

  const handleDelete = () => {
    Alert.alert(
      "Silme Onayı",
      "Bu kaydı silmek istediğinizden emin misiniz?",
      [
        { text: "Hayır", style: "cancel" },
        { text: "Evet", style: "destructive", onPress: onDelete },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        {
          paddingVertical: scaleHeight(16),
          paddingHorizontal: scaleWidth(16),
          borderRadius: scaleWidth(12),
          
        },
      ]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={handleDelete}>
        <Text style={[styles.closeText, { fontSize: scaleWidth(16) }]}>×</Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={[styles.time, { fontSize: scaleWidth(FontSize.medium)}]}>
            {time.toFixed(2)}s
          </Text>
        </View>
        <Text style={[styles.date, { fontSize: scaleWidth(FontSize.xsmall), marginTop: 2 }]}>
          {date}
        </Text>
      </View>

      <Text style={[styles.diff, { color: diffColor, fontSize: scaleWidth(FontSize.small) }]}>
        {diffText}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    borderWidth:1,
    borderColor:Colors.primary,
    
  },
  closeButton: {
    position: "absolute",
    top: -5,
    right: 6,
    zIndex: 10,
    padding: 4,
  },
  closeText: {
    color: Colors.primary,
    fontWeight: "700",
  },
  info: {
    flexDirection: "column", 
  },
  index: {
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  time: {
    fontFamily: Fonts.bold,
    color: Colors.text,
  },
  date: {
    fontFamily: Fonts.regular,
    color: Colors.muted,
  },
  diff: {
    fontFamily: Fonts.bold,
  },
});
