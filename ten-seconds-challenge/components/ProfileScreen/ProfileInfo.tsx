import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

import { Colors, Fonts, FontSize, Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";
import { MaterialIcons as Icon } from '@expo/vector-icons';
import EditProfileModal from "./EditProfileModal";
import { RootState } from "@/redux/store";
import { firestore } from "../../firebaseConfig";
import { updateUser } from '@/redux/userSlice';

interface Props {
  username: string;
  email: string;
  totalTries: number;
  bestScore: number;
  bestErrorMs?: number | null;
}

const ProfileInfo = ({ username, email, totalTries, bestScore }: Props) => {
  const { scaleWidth } = useResponsive();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [name, setName] = useState(username);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveName = async (newName: string) => {
    if (!currentUser.uid || !newName.trim()) {
      Alert.alert("Hata", "Lütfen geçerli bir isim girin");
      return;
    }

    setIsSaving(true);
    try {
      const userRef = doc(firestore, "users", currentUser.uid);
      await updateDoc(userRef, {
        displayName: newName.trim(),
        updatedAt: new Date(),
      });

      dispatch(updateUser({ displayName: newName.trim() }));
      
      setName(newName.trim());
      
      Alert.alert("Başarılı", "İsminiz güncellendi");
    } catch (error) {
      console.error("İsim güncellenirken hata:", error);
      Alert.alert("Hata", "İsim güncellenirken bir sorun oluştu");
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <View style={styles.container}>

      <View style={styles.infoRow}>
        <Text style={[styles.username, { fontSize: scaleWidth(FontSize.large) }]}>
          {name}
        </Text>
        <TouchableOpacity 
          onPress={() => setEditModalVisible(true)} 
          style={styles.editButton}
          disabled={isSaving}
        >
          <Icon name="edit" size={scaleWidth(20)} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.email, { fontSize: scaleWidth(FontSize.small) }]}>
        {email}
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { padding: scaleWidth(27) }]}>
          <Text style={[styles.statLabel, { fontSize: scaleWidth(FontSize.small) }]}>
            En İyi Skor
          </Text>
          <Text style={[styles.statValue, { fontSize: scaleWidth(FontSize.large) }]}>
            {bestScore > 0 ? `${bestScore.toFixed(2)}s` : "-"}
          </Text>
        </View>
        
        <View style={[styles.statBox, { padding: scaleWidth(27) }]}>
          <Text style={[styles.statLabel, { fontSize: scaleWidth(FontSize.small) }]}>
            Toplam Deneme
          </Text>
          <Text style={[styles.statValue, { fontSize: scaleWidth(FontSize.large) }]}>
            {totalTries}
          </Text>
        </View>
      </View>

      <EditProfileModal
        visible={isEditModalVisible}
        currentName={name}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveName}
        isSaving={isSaving}
      />
    </View>
  );
};

export default ProfileInfo;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "center",
    marginVertical: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
    borderRadius: 999,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
  avatarText: {
    fontFamily: Fonts.bold,
    color:  Colors.background,
  },
  avatarEditButton: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor:  Colors.background,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  username: {
    fontFamily: Fonts.bold,
    color: "black",
    textAlign: "center",
  },
  editButton: {
    marginLeft: Spacing.sm,
  },
  email: {
    fontFamily: Fonts.regular,
    color: "black",
    marginBottom: Spacing.md,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor:  Colors.background,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    elevation: 5,
  },
  statLabel: {
    fontFamily: Fonts.regular,
    color: Colors.muted,
    marginBottom: Spacing.xs,
    textAlign: "center",
  },
  statValue: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    textAlign: "center",
  },
});