import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Colors, Spacing, Fonts, FontSize } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, firestore } from "../../firebaseConfig"; 
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const RegisterForm = () => {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("İsim gerekli"),
    email: Yup.string().email("Geçersiz email").required("Email gerekli"),
    password: Yup.string().min(6, "Şifre en az 6 karakter").required("Şifre gerekli"),
  });

  const handleRegister = async (
    values: { email: string; password: string; name: string },
    actions: any
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await updateProfile(userCredential.user, {
        displayName: values.name,
      });

      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        displayName: values.name,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Başarılı", "Kayıt tamamlandı. Giriş yapabilirsin!");

      actions.resetForm();
    } catch (error) {
      console.log(error);
      Alert.alert("Hata", "Kayıt sırasında bir sorun oluştu!");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(values, actions) => handleRegister(values, actions)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="account-outline" size={24} color={Colors.muted} />
            <TextInput
              placeholder="İsim"
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
          </View>
          {errors.name && touched.name && <Text style={styles.error}>{errors.name}</Text>}

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="email-outline" size={24} color={Colors.muted} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
          </View>
          {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="lock-outline" size={24} color={Colors.muted} />
            <TextInput
              placeholder="Şifre"
              style={styles.input}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
          </View>
          {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

          <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  formContainer: { 
    marginBottom: Spacing.lg, 
    paddingHorizontal: Spacing.sm 
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.muted,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },

  input: { 
    flex: 1, 
    paddingVertical: 16, 
    marginLeft: 8, 
    fontFamily: Fonts.regular, 
    fontSize: FontSize.medium 
  },

  button: { 
    backgroundColor: Colors.primary, 
    paddingVertical: 16, 
    borderRadius: 8, 
    alignItems: "center", 
    marginTop: Spacing.md 
  },

  buttonText: { 
    color: Colors.background, 
    fontFamily: Fonts.bold, 
    fontSize: FontSize.medium, 
    fontWeight: "bold" 
  },

  error: { 
    color: Colors.danger, 
    fontSize: FontSize.small, 
    marginBottom: 5 
  },
});
