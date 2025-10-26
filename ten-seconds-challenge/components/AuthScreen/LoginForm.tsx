import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Colors, Spacing, Fonts, FontSize } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch(); 

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Geçersiz email").required("Email gerekli"),
    password: Yup.string().min(6, "Şifre en az 6 karakter").required("Şifre gerekli"),
  });

  const handleLogin = async (values: { email: string; password: string }, actions: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);

      dispatch(
        setUser({
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName || "",
          email: userCredential.user.email || ""
        })
      );

      actions.resetForm();
      router.push("/"); 
    } catch (error) {
      Alert.alert("Hata", "Email veya şifre hatalı");
      console.error("Login error:", error);
    }
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleLogin}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.formContainer}>
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
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.sm,
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
    fontSize: FontSize.medium,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  buttonText: {
    color: Colors.background,
    fontFamily: Fonts.bold,
    fontSize: FontSize.medium,
    fontWeight: "bold",
  },
  error: {
    color: Colors.danger,
    fontSize: FontSize.small,
    marginBottom: 5,
  },
});
