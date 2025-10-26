import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts, FontSize, Spacing } from "@/constants/theme";
import Leaders from "@/components/LeaderScreen/Leaders";
import { useResponsive } from "@/hooks/useResponsive";
import { firestore } from "@/firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import Loading from "../loading";
import { SafeAreaView } from "react-native-safe-area-context";

interface Leader {
  uid: string;
  displayName: string;
  bestErrorMs: number;
  bestTimeMs?: number;
  updatedAt: any;
  avatarUrl?: string | null;
}

export default function Leaderboard() {
  const { scaleWidth, scaleHeight } = useResponsive();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const leaderboardRef = doc(firestore, "leaderboard", "global");
    
    const unsubscribe = onSnapshot(leaderboardRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data?.top5) {
          const leadersWithAvatars = await Promise.all(
            data.top5.map(async (leader: any) => {
              try {
                const userRef = doc(firestore, "users", leader.uid);
                const userSnap = await getDoc(userRef);
                const avatarUrl = userSnap.exists() ? userSnap.data()?.avatarUrl : null;

                return {
                  ...leader,
                  bestErrorMs: Number(leader.bestErrorMs),
                  avatarUrl: avatarUrl || null,
                };
              } catch (error) {
                console.error(`Avatar çekilemedi (${leader.uid}):`, error);
                return {
                  ...leader,
                  bestErrorMs: Number(leader.bestErrorMs),
                  avatarUrl: null,
                };
              }
            })
          );

          const sorted = leadersWithAvatars.sort((a, b) => a.bestErrorMs - b.bestErrorMs);
          setLeaders(sorted);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      

      {loading ? (
        <Loading />
      ) : (
        <><View style={[styles.downcontainer, { paddingBottom: scaleHeight(20) }]}>
            <Text style={[styles.title, { fontSize: scaleWidth(FontSize.large) }]}>
              LİDERLİK
            </Text>
          </View><Leaders
              data={leaders.map(l => {
                const actualTimeS = (10000 - l.bestErrorMs) / 1000;

                const displayTime = actualTimeS > 0
                  ? actualTimeS
                  : (10000 + l.bestErrorMs) / 1000;

                return {
                  name: l.displayName,
                  errorMs: l.bestErrorMs,
                  time: displayTime,
                  avatarUrl: l.avatarUrl,
                };
              })} /></>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  downcontainer: { backgroundColor: Colors.primary },
  title: {
    fontFamily: Fonts.bold,
    color:  Colors.background,
    fontWeight: "700",
    textAlign: "center",
    marginTop: Spacing.xl
  },
});
