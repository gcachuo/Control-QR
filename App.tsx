import React, { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import firebase from "firebase/compat";
import { firebaseConfig } from "./firebaseConfig";
import { Alert, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = "es";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(null as unknown as string);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkForUpdate() {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          // Recarga la aplicación para cargar la actualización
          await Updates.reloadAsync();
        }
      } catch (e) {
        console.log(e);
      }
    }

    checkForUpdate();
  }, []);

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => setIsLoggedIn(true))
      .catch((error) => handleErrors(error));
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setIsLoggedIn(true))
      .catch((error: firebase.FirebaseError) => handleErrors(error));
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setIsLoggedIn(false))
      .catch((error) => setError(error.message));
  };

  const handleErrors = (error: firebase.FirebaseError) => {
    console.log(error.code);
    console.log(error.message);

    switch (error.code) {
      case "auth/missing-email":
        setError("Por favor ingrese su correo.");
        break;
      case "auth/too-many-requests":
        setError(
          "El acceso a esta cuenta ha sido temporalmente desactivado debido a múltiples intentos fallidos de inicio de sesión. Puede restaurarlo de inmediato restableciendo su contraseña o puede intentarlo de nuevo más tarde."
        );
        break;
      case "auth/invalid-email":
        setError("El correo no esta en el formato correcto");
        break;
      case "auth/wrong-password":
        setError("Los datos ingresados no son correctos");
        break;
      case "auth/email-already-in-use":
        setError(
          "Esta cuenta ya esta registrada, intente iniciar sesión con su contraseña."
        );
        break;
      case "auth/weak-password":
        setError("La contraseña debe ser de al menos 6 caracteres");
        break;
      case "auth/internal-error":
      default:
        if (!password) {
          setError("Por favor ingrese su contraseña");
          return;
        }
        setError(error.message);
        break;
    }
  };

  const handleResetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          "Correo electrónico enviado",
          "Revisa tu correo electrónico para restablecer tu contraseña."
        );
      })
      .catch((error) => handleErrors(error));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ margin: 30 }}>
        <View>
          {isLoggedIn ? (
            <>
              <Button onPress={handleLogout}>Logout</Button>
              <Text>You are logged in!</Text>
            </>
          ) : (
            <>
              <Appbar.Header>
                <Appbar.Content title="Control QR" />
              </Appbar.Header>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.TextInput}
                keyboardType={"email-address"}
                textContentType={"emailAddress"}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.TextInput}
              />
              {error && <Text style={{ color: "red" }}>{error}</Text>}
              <Button onPress={handleLogin}>Inicia Sesión</Button>
              <Button onPress={handleResetPassword}>
                Olvide mi contraseña
              </Button>
              <Button onPress={handleSignUp}>Registrate</Button>
            </>
          )}
          <StatusBar />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  TextInput: { marginBottom: 15 },
});
