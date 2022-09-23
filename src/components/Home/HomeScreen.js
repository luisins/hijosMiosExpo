import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';


const HomeScreen = () => {

  const [data, setData] = useState();
  const [rtdata, setRTData] = useState([]);



    async function loadData() {
      try{
          const partidosCollection = await firestore().collection('Partidos').get();
          console.log(partidosCollection.docs[0].data())
          setData(partidosCollection.docs)
      } catch(e){
          console.log(e)
      }

    }

    async function loadRTData() {
      const suscriber = firestore().collection('Partidos').onSnapshot(querySnapshot => {
        const partidos = []
        querySnapshot.forEach(documentSnapshot => {
          partidos.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id
          })
        })

        setRTData(partidos)
      })

      return () => suscriber()
    }

    useEffect(()=>{
      loadData()
      loadRTData()
    },[])

    function renderItem({item}){
      return(
        <View>
          <Text>Usuario 1: {item.data().usuario1}</Text>
          <Text>Goles 1: {item.data().gol1}</Text>
          <Text>Goles 2: {item.data().gol2}</Text>
          <Text>Usuario 2: {item.data().usuario2}</Text> 
          {/* <Text>Fecha: {new Date( item.data().fecha)}</Text> */}
        </View>
      )
    }

    function renderRTItem({item}){
      return(
        <View style={{borderColor:'black', borderWidth:1}}>
          <Text>Usuario 1: {item.usuario1}</Text>
          <Text>Usuario 2: {item.usuario2}</Text> 
          <Text>Goles 1: {item.gol1}</Text>
          <Text>Goles 2: {item.gol2}</Text>
          {item.usuario3? 
          <Text>Usuario 3: {item.usuario3}</Text> : null}
          {item.usuario4? 
           <Text>Usuario 4: {item.usuario4}</Text> : null
          }
          {item.torneoN != 0 ? 
          <Text>Torneo N°: {item.torneoN}</Text> : null }
          {/* <Text>Fecha: {new Date( item.data().fecha)}</Text> */}
        </View>
      )
    }

    return (
        <View>
          {/* <Text>Partidos: </Text>
          <FlatList
            data = {data}
            renderItem = { renderItem }
            keyExtractor = {item => item.id}
          /> */}

        <Text>Partidos en tiempo real: </Text>
          <FlatList
            data = {rtdata}
            renderItem = { renderRTItem }
            keyExtractor = {item => item.key}
          />

          <StatusBar style="auto" /> 
        </View>
      );
  }

  export default HomeScreen