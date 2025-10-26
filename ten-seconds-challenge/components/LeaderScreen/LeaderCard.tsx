import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, Fonts, Spacing, FontSize } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";

const avatarMap: { [key: string]: any } = {
  'avatar1.png': require('@/assets/avatars/avatar1.png'),
  'avatar2.png': require('@/assets/avatars/avatar2.png'),
  'avatar3.png': require('@/assets/avatars/avatar3.png'),
  'avatar4.png': require('@/assets/avatars/avatar4.png'),
  'avatar5.png': require('@/assets/avatars/avatar5.png'),
  'avatar6.png': require('@/assets/avatars/avatar6.png'),
  'default.png': require('@/assets/avatars/default.png'),
};

interface Props {
  index: number;
  name: string;
  time: number;
  avatarUrl?: string | null;
}

const LeaderCard = ({ index, name, time, avatarUrl }: Props) => {
  const { scaleWidth } = useResponsive();

  let icon = "";
  if (index === 0) icon = "🏆";
  else if (index === 1) icon = "🥈";
  else if (index === 2) icon = "🥉";

  const bgColor =
    index === 0 ? "#F8C1D2" : index === 1 ? Colors.background : index === 2 ?  Colors.background:  Colors.background;

  const isTop3 = index < 3;

  const getAvatarSource = () => {
    
    if (avatarUrl && avatarMap[avatarUrl]) {
      return avatarMap[avatarUrl];
    }
    return avatarMap['default.png'];
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: bgColor,
          borderRadius: scaleWidth(12),
          paddingVertical: scaleWidth(20),
          paddingHorizontal: scaleWidth(12),
          flexDirection: isTop3 ? "column" : "row",
          justifyContent: isTop3 ? "center" : "space-between",
          alignItems: "center",
          width: isTop3 ? "auto" : "100%",
          borderWidth: 1,
          borderColor: Colors.primary,
        },
      ]}
    >
      <Text style={[styles.index, { fontSize: scaleWidth(FontSize.medium) }]}>
        {index + 1}. {icon}
      </Text>

      {/* Avatar */}
      <View>
        <Image
          source={getAvatarSource()}
          style={{
            width: scaleWidth(isTop3 ? 50 : 40),
            height: scaleWidth(isTop3 ? 50 : 40),
            borderRadius: scaleWidth(isTop3 ? 30 : 20),
            borderWidth: 2,
            borderColor: Colors.primary,
            marginTop: isTop3 ? scaleWidth(8) : 0,
            marginHorizontal: isTop3 ? 0 : scaleWidth(8),
          }}
          resizeMode="cover"
        />
   
      </View>

      <Text
        style={[
          styles.name,
          {
            fontSize: scaleWidth(FontSize.medium),
            flex: isTop3 ? undefined : 1,
            textAlign: isTop3 ? "center" : "left",
          },
        ]}
        numberOfLines={1}
      >
        {name}
      </Text>

      <Text style={[styles.time, { fontSize: scaleWidth(FontSize.small) }]}>
        {time.toFixed(2)}s
      </Text>
    </View>
  );
};

export default LeaderCard;

const styles = StyleSheet.create({
  card: {
    elevation: 8,
    marginBottom: Spacing.sm,
    
  },
  index: {
    fontFamily: Fonts.bold,
    fontWeight: "bold",
    color: Colors.text,
  },
  name: {
    fontFamily: Fonts.bold,
    color: Colors.text,
    marginVertical: 2,
    fontWeight: "bold",
  },
  time: {
    fontFamily: Fonts.bold,
    color: Colors.background,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.lg,
    paddingHorizontal: Spacing.sm,
  },
});