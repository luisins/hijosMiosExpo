import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

function LoginScreen(){

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  const handlerCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      Alert.alert('Account created!')
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user)
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
      //console.log('Signed in!');
      Alert.alert('Signed in!');
      const user = userCredential.user;
      //console.log(user)
      navigation.navigate('Home')
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error)
    })
  }


  return(
    <View style={styles.container}>
      <Text>Ingrese sus credenciales</Text>
      <TouchableOpacity>
        <TextInput style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}} onChangeText={(text) => setEmail(text)} placeholder={'Email'}></TextInput>
        </TouchableOpacity>
      <TouchableOpacity style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}}>
        <TextInput onChangeText={(text) => setPass(text)} placeholder={'Password'}></TextInput>
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

function HomeScreen(){
  return (
    <View style={styles.container}>
      <Text>Holis ya estas logeado</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
