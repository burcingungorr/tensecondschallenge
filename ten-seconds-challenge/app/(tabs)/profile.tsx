import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Colors, Spacing, Fonts, FontSize } from "@/constants/theme";
import AvatarPicker from "@/components/ProfileScreen/AvatarPicker";
import ProfileInfo from "@/components/ProfileScreen/ProfileInfo";
import LogOutButton from "@/components/ProfileScreen/LogOutButton";
import Header from "@/components/Header";
import { clearUser } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import Loading from "../loading";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state: RootState) => state.user);

  const [profileStats, setProfileStats] = useState({
    totalTries: 0,
    bestScore: 0,
    bestErrorMs: null as number | null,
    loading: true,
  });

  useEffect(() => {
    if (!currentUser.uid) {
      router.replace("/auth");
    }
  },);

  useEffect(() => {
    if (!currentUser.uid) return;

    const attemptsRef = collection(firestore, "attempts");
    const attemptsQuery = query(
      attemptsRef,
      where("uid", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      attemptsQuery,
      (snapshot) => {
        try {
          const totalTries = snapshot.size;
          let bestScore = 0;
          let bestErrorMs = null;

          if (!snapshot.empty) {
            const attempts = snapshot.docs.map(doc => doc.data());

            const validAttempts = attempts.filter(a => {
              const error = a.errorMs || a.bestErrorMs;
              return error != null && typeof error === 'number' && error > 0;
            });

            if (validAttempts.length > 0) {
              const bestAttempt = validAttempts.reduce((best, current) => {
                const currentError = current.errorMs || current.bestErrorMs;
                const bestError = best.errorMs || best.bestErrorMs;
                return currentError < bestError ? current : best;
              });

              bestErrorMs = bestAttempt.errorMs || bestAttempt.bestErrorMs;
              
              if (bestAttempt.durationMs && typeof bestAttempt.durationMs === 'number') {
                bestScore = bestAttempt.durationMs / 1000;
              }
            }
          }

          setProfileStats({
            totalTries,
            bestScore,
            bestErrorMs,
            loading: false,
          });
        } catch (error) {
          console.error("Profil istatistikleri güncellenirken hata:", error);
          setProfileStats({
            totalTries: 0,
            bestScore: 0,
            bestErrorMs: null,
            loading: false,
          });
        }
      },
      (error) => {
        console.error("Firestore dinleme hatası:", error);
        setProfileStats({
          totalTries: 0,
          bestScore: 0,
          bestErrorMs: null,
          loading: false,
        });
      }
    );

    return () => unsubscribe();
  }, [currentUser.uid]);

  const handleLogout = () => {
    dispatch(clearUser());
    router.replace("/auth");
  };

  if (!currentUser.uid) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LogOutButton onPress={handleLogout} />
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Header title="PROFİL" />
        <AvatarPicker />
        
      {profileStats.loading ? (
  <Loading />
) : (
  <ProfileInfo
    username={currentUser.displayName || "Kullanıcı"}
    email={currentUser.email || ""}
    totalTries={profileStats.totalTries}
    bestScore={profileStats.bestScore}
    bestErrorMs={profileStats.bestErrorMs}
  />
)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    marginTop: Spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontFamily: Fonts.regular,
    fontSize: FontSize.medium,
    color: Colors.muted,
  },
});