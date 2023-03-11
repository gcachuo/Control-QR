import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Updates from "expo-updates";
import firebase from "firebase/compat";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
      .catch((error) => setError(error.message));
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => setIsLoggedIn(true))
      .catch((error) => setError(error.message));
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setIsLoggedIn(false))
      .catch((error) => setError(error.message));
  };

  return (
    <SafeAreaView>
      <View>
        {isLoggedIn ? (
          <>
            <Text>You are logged in!</Text>
            <Button title="Logout" onPress={handleLogout} />
          </>
        ) : (
          <>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button title="Sign Up" onPress={handleSignUp} />
            <Button title="Log In" onPress={handleLogin} />
          </>
        )}
        <StatusBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
