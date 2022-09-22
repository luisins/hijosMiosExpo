import React, { useState } from 'react';
import { View, Text, StatusBar, TextInput, Button } from 'react-native';
/* import {database} from './../../firebase-config';
import {collection, addPartido } from 'firebase/firestore'; */
import firestore from '@react-native-firebase/firestore';


const partidosCollection = firestore().collection('Partidos');
const partidosTodos = firestore().collection('Partidos').get();
const partido = firestore().collection('Partidos').doc('G7eYHx3o9x7lAe0k3R28');

console.log(partidosTodos)
 
const PartidoScreen = () => {

  /* const [usuario1, setUsuario1] = useState('a');
  const [usuario2, setUsuario2] = useState('a');
  const [gol1, setGol1] = useState();
  const [gol2, setGol2] = useState(); */

  const [newPartido, setNewPartido] = useState({
    usuario1: '',
    usuario2: '',
    gol1: 0,
    gol2: 0,
    createAt: new Date(),
  })

  const onSend = async () =>{
    //await addPartido(collection(database,'partidos'), newPartido)
    //console.log(newPartido)
    console.log(partidosTodos)
  }

    return (
        <View style={{flex:1}}>
          <Text>PartidoScreen</Text>
          <StatusBar style="auto" />
          
          <TextInput style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}} 
                  /* value={newPartido.usuario1 ? newPartido.usuario1 : ''}  */placeholder={'usuario 1'}
                  onChangeText={(u1) => setNewPartido({...newPartido, usuario1: u1})} />
          <TextInput style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}} 
                  /* value={newPartido.usuario2 ? newPartido.usuario2 : ''} */ placeholder={'usuario 2'}
                  onChangeText={(u2) => setNewPartido({...newPartido, usuario2: u2})} />
          <TextInput style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}}
                  /* value={newPartido.gol1} */  
                  onChangeText={(g1) => setNewPartido({...newPartido, gol1: g1})} />
          <TextInput style={{borderColor:'black', borderWidth:1, borderRadius:15, padding:10}}
                  /* value={newPartido.g2} */ 
                  onChangeText={(g2) => setNewPartido({...newPartido, gol2: g2})} />
          <Button title='Guardar'
                    onPress={()=>onSend()}>

          </Button>

        
        </View>
      );
  }

  export default PartidoScreen