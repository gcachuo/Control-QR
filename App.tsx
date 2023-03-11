import React, { useState } from 'react';
import { Alert, Button, StatusBar, Text, TextInput, View } from 'react-native';
import firebase from 'firebase/compat';
import { firebaseConfig } from './firebaseConfig'; // importa tu configuración de Firebase

// inicializa la app de Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  // función que maneja el envío del código de verificación
  const handleSendCode = async () => {
    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        defaultCountry: 'MX',
        language: 'es',
      });

      const result = await firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setVerificationId(result.verificationId);

      Alert.alert('Código de verificación enviado');
    } catch (error) {
      console.log(error);
      Alert.alert('Error al enviar el código de verificación');
    }
  };

  // función que maneja la verificación del código
  const handleVerifyCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
      );
      const userCredential = await firebase.auth().signInWithCredential(credential);
      Alert.alert('Inicio de sesión exitoso');
    } catch (error) {
      console.log(error);
      Alert.alert('Error al verificar el código');
    }
  };

  return (
      <View>
        <StatusBar/>
        <Text>Ingrese su número de teléfono:</Text>
        <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />
        <Button title="Enviar código" onPress={handleSendCode} />

        <Text>Ingrese el código de verificación:</Text>
        <TextInput value={verificationCode} onChangeText={setVerificationCode} />
        <Button title="Verificar código" onPress={handleVerifyCode} />
      </View>
  );
}
