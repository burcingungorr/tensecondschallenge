import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import Histories from "@/components/HistoryScreen/Histories";
import { Colors, Spacing, Fonts, FontSize } from "@/constants/theme";
import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import Loading from "../loading";
import { SafeAreaView } from "react-native-safe-area-context";

interface HistoryItem {
  id: string; 
  time: number;
  diff: number;
  date: string;
  durationMs: number;
  errorMs: number;
  createdAt: any;
}

export default function History() {
  const currentUser = useSelector((state: RootState) => state.user);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser.uid) {
      setLoading(false);
      return;
    }

    const attemptsRef = collection(firestore, "attempts");
    const attemptsQuery = query(attemptsRef, where("uid", "==", currentUser.uid));

    const unsubscribe = onSnapshot(
      attemptsQuery,
      (snapshot) => {
        const attempts: HistoryItem[] = [];

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          
          let formattedDate = "Tarih yok";
          if (data.createdAt) {
            const date = data.createdAt.toDate();
            formattedDate = date.toLocaleString("tr-TR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });
          }

          const time = data.durationMs ? data.durationMs / 1000 : 0;
          const diff = data.errorMs ? data.errorMs / 1000 : 0;

          attempts.push({
            id: docSnap.id,
            time,
            diff,
            date: formattedDate,
            durationMs: data.durationMs || 0,
            errorMs: data.errorMs || 0,
            createdAt: data.createdAt,
          });
        });

        setHistoryData(attempts);
        setLoading(false);
      },
      (error) => {
        console.error("Geçmiş denemeler yüklenirken hata:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser.uid]);

  const sortedHistoryData = [...historyData].sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return 0;
    return b.createdAt.seconds - a.createdAt.seconds;
  });

  const handleDelete = async (index: number) => {
    try {
      const itemToDelete = historyData[index];
      if (itemToDelete && itemToDelete.id) {
        await deleteDoc(doc(firestore, "attempts", itemToDelete.id));
        const newData = [...historyData];
        newData.splice(index, 1);
        setHistoryData(newData);
      }
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="GEÇMİŞ DENEMELER" />
      <View style={styles.listContainer}>
        {historyData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Henüz deneme kaydı yok</Text>
          </View>
        ) : (
          <Histories data={sortedHistoryData} onDelete={handleDelete} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Spacing.xl,
  },
  emptyText: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.large,
    color: Colors.muted,
  },
});
