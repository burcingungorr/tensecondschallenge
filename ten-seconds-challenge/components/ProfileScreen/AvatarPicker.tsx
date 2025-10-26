import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { useResponsive } from '@/hooks/useResponsive';
import { Colors, Spacing, FontSize, Fonts } from '@/constants/theme';
import { RootState } from '@/redux/store';
import { updateUser } from '@/redux/userSlice';

const avatars = [
  { name: 'avatar1.png', source: require('../../assets/avatars/avatar1.png') },
  { name: 'avatar2.png', source: require('../../assets/avatars/avatar2.png') },
  { name: 'avatar3.png', source: require('../../assets/avatars/avatar3.png') },
  { name: 'avatar4.png', source: require('../../assets/avatars/avatar4.png') },
  { name: 'avatar5.png', source: require('../../assets/avatars/avatar5.png') },
  { name: 'avatar6.png', source: require('../../assets/avatars/avatar6.png') },
  { name: 'default.png', source: require('../../assets/avatars/default.png') },
];

const AvatarPicker = () => {
  const { scaleWidth, scaleHeight } = useResponsive();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);

  const [selectedAvatar, setSelectedAvatar] = useState(avatars[6].source);
  const [isSelectorVisible, setSelectorVisible] = useState(false);

  useEffect(() => {
    if (!currentUser.uid) return;

    const userRef = doc(firestore, 'users', currentUser.uid);

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const avatarName = data?.avatarUrl || 'default.png';

        dispatch(updateUser({ avatarUrl: avatarName }));

        const savedAvatar = avatars.find((a) => a.name === avatarName);
        if (savedAvatar) {
          setSelectedAvatar(savedAvatar.source);
        }
      }
    });

    return () => unsubscribe();
  }, );

  const saveAvatarToFirebase = async (avatarName: string) => {
    if (!currentUser.uid) return;

    try {
      const userRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userRef, { avatarUrl: avatarName });

      dispatch(updateUser({ avatarUrl: avatarName }));
    } catch (error) {
      console.error('Firebase güncelleme hatası:', error);
      Alert.alert('Hata', 'Avatar kaydedilemedi');
    }
  };

  const handleSelect = async (avatarSource: any, avatarName: string) => {
    setSelectedAvatar(avatarSource);
    setSelectorVisible(false);
    await saveAvatarToFirebase(avatarName);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => setSelectorVisible(true)}>
        <Image
          source={selectedAvatar}
          style={{
            width: scaleWidth(120),
            height: scaleWidth(120),
            borderRadius: scaleWidth(60),
            borderWidth: 3,
            borderColor: Colors.primary,
          }}
        />
      </TouchableOpacity>

      <Modal visible={isSelectorVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              { padding: scaleWidth(20), borderRadius: scaleWidth(16), width: '80%' },
            ]}
          >
            <Text style={[styles.title, { fontSize: scaleWidth(FontSize.large) }]}>
              Avatarını Seç
            </Text>

            <View style={styles.avatarGrid}>
              {avatars.map((avatar, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelect(avatar.source, avatar.name)}
                  style={{
                    margin: scaleWidth(8),
                    borderRadius: scaleWidth(35),
                    borderWidth: selectedAvatar === avatar.source ? 2 : 0,
                    borderColor:
                      selectedAvatar === avatar.source ? Colors.primary : 'transparent',
                  }}
                >
                  <Image
                    source={avatar.source}
                    style={{
                      width: scaleWidth(70),
                      height: scaleWidth(70),
                      borderRadius: scaleWidth(35),
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setSelectorVisible(false)}
              style={{
                marginTop: scaleHeight(10),
                backgroundColor: Colors.primary,
                paddingVertical: scaleHeight(8),
                paddingHorizontal: scaleWidth(16),
                borderRadius: scaleWidth(8),
              }}
            >
              <Text style={[styles.buttonText, { fontSize: scaleWidth(FontSize.medium) }]}>
                Kapat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: Spacing.md,
    color: Colors.text,
    fontFamily: Fonts.bold,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonText: {
    color:  Colors.background,
    fontFamily: Fonts.bold,
  },
});

export default AvatarPicker;
