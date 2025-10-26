import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TimerDisplay from "@/components/HomeScreen/TimerDisplay";
import StartStopButton from "@/components/HomeScreen/StartStopButton";
import Result from "@/components/HomeScreen/Result";
import useTimer from "@/hooks/useTimer";
import { useResponsive } from "@/hooks/useResponsive";
import { Colors, Spacing } from "@/constants/theme";
import Header from "@/components/HomeScreen/Header";
import { useSelector } from "react-redux";
import { firestore } from "@/firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import Loading from "../loading";
import { SafeAreaView } from "react-native-safe-area-context";

interface UserState {
  uid: string | null;
  displayName: string | null;
}

export default function Index() {
  const { scaleHeight } = useResponsive();
  const { time, running, startTimer, stopTimer, resetTimer } = useTimer();
  const [showResult, setShowResult] = useState(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: { user: UserState }) => state.user);

  useEffect(() => {
    const getDeviceId = async () => {
      try {
        let storedId = await AsyncStorage.getItem("deviceId");
        if (!storedId) {
          storedId = uuidv4();
          await AsyncStorage.setItem("deviceId", storedId);
        }
        setDeviceId(storedId);
      } catch (error) {
        console.error("Device ID alınamadı:", error);
      }
    };
    getDeviceId();
  }, []);

  const updateLeaderboard = async (uid: string, displayName: string, errorMs: number) => {
    const leaderboardRef = doc(firestore, "leaderboard", "global");

    const leaderboardSnap = await getDoc(leaderboardRef);
    let top5: any[] = [];

    if (leaderboardSnap.exists()) {
      top5 = leaderboardSnap.data().top5 || [];
    }

    const existingIndex = top5.findIndex((entry) => entry.uid === uid);

    if (existingIndex >= 0) {
      if (errorMs < top5[existingIndex].bestErrorMs) {
        top5[existingIndex] = {
          uid,
          displayName,
          bestErrorMs: errorMs,
          updatedAt: new Date(),
        };
      }
    } else {
      top5.push({
        uid,
        displayName,
        bestErrorMs: errorMs,
          updatedAt: new Date(),
      });
    }

    top5.sort((a, b) => a.bestErrorMs - b.bestErrorMs);
    top5 = top5.slice(0, 5);

    await setDoc(leaderboardRef, { top5 });
  };

  const handleStop = async () => {
    stopTimer();
    setShowResult(true);

    if (user?.uid && deviceId) {
      const durationMs = time * 1000;
      const errorMs = Math.abs(durationMs - 10000); 



      try {
        await addDoc(collection(firestore, "attempts"), {
          uid: user.uid,
          durationMs: durationMs,
          errorMs: errorMs,
          createdAt: serverTimestamp(),
          device: deviceId,
        });

        await updateLeaderboard(user.uid, user.displayName || "Anonim", errorMs);

      } catch (error) {
        console.error("Kaydetme hatası:", error);
      }
    }

  };

  const handleReset = () => {
    resetTimer();
    setShowResult(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={[styles.timerBox, { marginBottom: scaleHeight(Spacing.lg) }]}>
        <TimerDisplay time={time} />
        {showResult && <Result time={time} />}
      </View>

      <StartStopButton
        running={running}
        onStart={startTimer}
        onStop={handleStop}
        onReset={handleReset}
        showResult={showResult}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.md,
  },
  timerBox: {
    marginBottom: Spacing.lg,
    alignItems: "center",
  },
});
