import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import LeaderCard from "./LeaderCard";
import { Colors, Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";

interface Leader {
  name: string;
  time: number;
  avatarUrl?: string | null;
  errorMs: number; 
}

interface Props {
  data: Leader[];
}

const Leaders = ({ data }: Props) => {
  const { scaleHeight } = useResponsive();
  const screenWidth = Dimensions.get("window").width;

  const top3 = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <View style={styles.container}>
      <View style={styles.podiumContainer}>
        {top3[1] && (
          <View style={[styles.sideCard, { bottom: scaleHeight(20) }]}>
            <LeaderCard 
              index={1} 
              name={top3[1].name} 
              time={top3[1].time}
              avatarUrl={top3[1].avatarUrl}
            />
          </View>
        )}
        {top3[0] && (
          <View style={[styles.centerCard, { bottom: scaleHeight(40) }]}>
            <LeaderCard 
              index={0} 
              name={top3[0].name} 
              time={top3[0].time}
              avatarUrl={top3[0].avatarUrl}
            />
          </View>
        )}
        {top3[2] && (
          <View style={[styles.sideCard, { bottom: scaleHeight(10) }]}>
            <LeaderCard 
              index={2} 
              name={top3[2].name} 
              time={top3[2].time}
              avatarUrl={top3[2].avatarUrl}
            />
          </View>
        )}
      </View>

      <FlatList
        data={others}
        keyExtractor={(_, index) => `other-${index}`}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={[styles.fullWidthCard, { width: screenWidth * 0.9 }]}>
            <LeaderCard 
              index={index + 3} 
              name={item.name} 
              time={item.time}
              avatarUrl={item.avatarUrl}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Leaders;

const styles = StyleSheet.create({
  container: { 
    alignItems: "center" 
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    width: "100%",
    backgroundColor: Colors.primary,
    height: '40%',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
    marginBottom: Spacing.xl,
    paddingTop:80,
  },
  sideCard: { 
    width: "28%" 
  },
  centerCard: { 
    width: "32%", 
    transform: [{ translateY: -20 }] },
  list: { 
    alignItems: "center" 
  },
  fullWidthCard: { 
    marginBottom: Spacing.sm 
  },
});