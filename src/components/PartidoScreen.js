import React, { useState } from 'react';
import { View, Text, StatusBar, TextInput, Button, StyleSheet, Switch } from 'react-native';
/* import {database} from './../../firebase-config';
import {collection, addPartido } from 'firebase/firestore'; */
import firestore from '@react-native-firebase/firestore';


const partidosCollection = firestore().collection('Partidos');
const partidosTodos = firestore().collection('Partidos').get();
const partido = firestore().collection('Partidos').doc('G7eYHx3o9x7lAe0k3R28');

console.log(partidosTodos)
 
const PartidoScreen = () => {

  const [usuario1, setUsuario1] = useState('');
  const [usuario2, setUsuario2] = useState('');
  const [gol1, setGol1] = useState();
  const [gol2, setGol2] = useState();
  const [usuario3, setUsuario3] = useState('');
  const [usuario4, setUsuario4] = useState('');
  
  const [prorroga, setProrroga] = useState(false);
  const [penales, setPenales] = useState(false);
  const [torneo, setTorneoN] = useState(0)

  /* const [newPartido, setNewPartido] = useState({
    usuario1: '',
    usuario2: '',
    gol1: 0,
    gol2: 0,
    createAt: new Date(),
  }) */

  const onSend = async () =>{
    //await addPartido(collection(database,'partidos'), newPartido)
    //console.log(newPartido)
    console.log(partidosTodos)
    try{
      firestore().collection('Partidos').add({
        usuario1: usuario1,
        usuario2: usuario2,
        gol1: gol1,
        gol2: gol2,
        mejorDe: 1,
        prorroga: prorroga,
        penales: penales,
        torneoN: torneo,
        fecha: new Date(),
        usuario3: usuario3,
        usuario4: usuario4,

      })
    } catch(e){
        console.log(e)
    } finally {
        setUsuario1('')
        setUsuario2('')
        setGol1(0)
        setGol2(0)
        setProrroga(false)
        setPenales(false)
        setTorneoN(0)
        setUsuario3('')
        setUsuario4('')
    }

  }

    return (
        <View style={{flex:1}}>
          <Text>PartidoScreen</Text>
          <StatusBar style="auto" />
          
          <TextInput style={ style.input } 
                  placeholder={'usuario 1'}
                  onChangeText={(u1) => setUsuario1(u1)} />
          <TextInput style={  style.input} 
                  placeholder={'usuario 2'}
                  onChangeText={(u2) => setUsuario2(u2)} />
          <TextInput style={  style.input}
                  placeholder={'Goles usuario1'}  
                  onChangeText={(g1) => setGol1(g1)} />
          <TextInput style={ style.input }
                  placeholder={'Goles usuario2'}   
                  onChangeText={(g2) => setGol2(g2)} />
          <TextInput style={ style.input } 
                  placeholder={'usuario 3'}
                  onChangeText={(u3) => setUsuario3(u3)} />
          <TextInput style={  style.input} 
                  placeholder={'usuario 4'}
                  onChangeText={(u4) => setUsuario4(u4)} />

          <View style={style.container}>
          <Text>Prorroga</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={prorroga ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>setProrroga(!prorroga)}
            value={prorroga}
          />
        </View>
        <View style={style.container}>
          <Text>Penales</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={penales ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>setPenales(!penales)}
            value={penales}
          />
        </View>
        <TextInput style={[ style.input,{}] }
                  placeholder={'Torneo N°'}   
                  onChangeText={(t) => setTorneoN(t)} />
          <Button title='Guardar'
                  disabled={!(gol1 && gol2)}
                    onPress={()=>onSend()}>

          </Button>

        
        </View>
      );
  }

  export default PartidoScreen

  const style = StyleSheet.create({
    input: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      marginBottom: 20,
      padding: 10,
      borderColor: 'black',
      borderWidth: 1,
    },

    container: {
      //flex: 1,
      flexDirection:'row',
      alignItems: "center",
      justifyContent: "center"
    }
  })