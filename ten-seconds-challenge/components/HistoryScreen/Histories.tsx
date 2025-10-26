import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Spacing } from "@/constants/theme";
import { HistoryCard } from "./HistoryCard";

interface HistoryItem {
  time: number;
  diff: number;
  date: string;
}

interface Props {
  data: HistoryItem[];
  onDelete: (index: number) => void; 
}

const Histories = ({ data, onDelete }: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item, index }) => (
        <HistoryCard
          time={item.time}
          diff={item.diff}
          index={index}
          date={item.date}
          onDelete={() => onDelete(index)}
        />
      )}
    />
  );
};

export default Histories;

const styles = StyleSheet.create({
  list: {
    paddingVertical: Spacing.xl,
    gap:Spacing.xs,
    
  },
});
