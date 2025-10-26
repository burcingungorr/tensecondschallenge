import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { Colors, Fonts, FontSize, Spacing } from "@/constants/theme";
import { useResponsive } from "@/hooks/useResponsive";
import { MaterialIcons as Icon } from '@expo/vector-icons';

interface Props {
  visible: boolean;
  currentName: string;
  onClose: () => void;
  onSave: (newName: string) => void;
  isSaving?: boolean;
}

const EditProfileModal = ({ visible, currentName, onClose, onSave, isSaving = false }: Props) => {
  const { scaleWidth, scaleHeight } = useResponsive();
  const [name, setName] = useState(currentName);

  useEffect(() => {
    if (visible) {
      setName(currentName);
    }
  }, [visible, currentName]);

  const handleSave = () => {
    const trimmedName = name.trim();
    if (trimmedName && trimmedName !== currentName) {
      onSave(trimmedName);
    } else if (!trimmedName) {
      return;
    } else {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, { 
          paddingVertical: scaleHeight(20),
          paddingHorizontal: scaleWidth(20) 
        }]}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={[styles.iconButton, styles.closeButton]} 
              onPress={onClose}
              disabled={isSaving}
            >
              <Icon name="close" size={scaleWidth(24)} color={Colors.danger} />
            </TouchableOpacity>

            <Text style={[styles.modalTitle, { fontSize: scaleWidth(FontSize.medium) }]}>
              Adını Düzenle
            </Text>

            <TouchableOpacity 
              style={[styles.iconButton, styles.saveIconButton]} 
              onPress={handleSave}
              disabled={isSaving || !name.trim()}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Icon name="check" size={scaleWidth(24)} color={Colors.primary} />
              )}
            </TouchableOpacity>
          </View>
          
          <TextInput 
            style={[styles.input, { 
              fontSize: scaleWidth(FontSize.medium),
              padding: scaleWidth(12)
            }]} 
            value={name} 
            onChangeText={setName}
            placeholder="İsim girin"
            placeholderTextColor={Colors.muted}
            editable={!isSaving}
            maxLength={50}
          />
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    width: "80%",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.md,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  closeButton: {
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
  saveIconButton: {
    backgroundColor: "rgba(0, 128, 255, 0.1)",
  },
  modalTitle: {
    fontFamily: Fonts.bold,
    color: Colors.text,
    flex: 1,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.muted,
    borderRadius: 12,
    marginBottom: Spacing.md,
    fontFamily: Fonts.regular,
    color: Colors.text,
  },
});