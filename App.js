import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import Navigation from './Navigation';




function LoginScreen({setLogeado}){

  const [email, setEmail] = useState('luis.spessot@gmail.com');
  const [pass, setPass] = useState('123456');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  const handlerCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      Alert.alert('Cuenta creada!')
      //console.log('Account created!')
      const user = userCredential.user;
      console.log(user)
      console.log(user.providerData)
    })
    .catch(error => {
      console.log(JSON.stringify(error.code))
      JSON.stringify(error.code) == '"auth/email-already-in-use"' ? 
      Alert.alert('Error', 'El usuario ya está registrado') : Alert.alert(error.message)
    })
  }

  const handlerSignIn = () => {
    signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      setLogeado(true)
      console.log('SI INGRESÓ')
    })
    .catch(error => {
      console.log(JSON.stringify(error.code))
      console.log('ERRORRRR')
      //Alert.alert(error)
      JSON.stringify(error.code) == "auth/wrong-password" ? 
      Alert.alert('Error', 'Contraseña incorrecta') : Alert.alert('Error',error.message)
    })
  }


  return(
    <View style={styles.container}>
      <Text>Ingrese sus credenciales</Text>
      <TouchableOpacity>
        <TextInput style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}} value={email} keyboardType='email-address' onChangeText={(text) => setEmail(text)} placeholder={'Email'}></TextInput>
        </TouchableOpacity>
      <TouchableOpacity style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}}>
        <TextInput value={pass} onChangeText={(text) => setPass(text)} placeholder={'Password'}></TextInput>
        </TouchableOpacity>
      <TouchableOpacity style={{borderColor:'black', borderWidth:1, borderRadius:5, padding:10}}
                        onPress={()=> handlerSignIn()}>
        <Text>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{borderColor:'black', borderWidth:1, borderRadius:5, padding:10}}
                        onPress={()=> handlerCreateAccount()}>
        <Text>Registrarse</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )
 } 

export default function App() {
  const [logeado, setLogeado] = useState(false);
  return (
    <>
      {/* logeado */true ? 
      <Navigation />
      : <LoginScreen setLogeado={setLogeado} />}
    </>
  )
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
