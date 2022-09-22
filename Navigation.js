import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//importar screens
import HomeScreen from "./src/components/Home/HomeScreen";
import HistoricoScreen from "./src/components/Historico/HistoricoScreen";
import StackScreen from "./src/components/StackScreen";
import PartidoScreen from "./src/components/PartidoScreen"; 

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();

function MyStack() {
    return(
        <HomeStackNavigator.Navigator
            initialRouteName="HomeScreen"
        >
            <HomeStackNavigator.Screen 
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                     
                }}
            />
            <HomeStackNavigator.Screen 
                name="Stack"
                component={StackScreen}
            />
        </HomeStackNavigator.Navigator>
    )
}

function MyTabs() {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor:'purple'
            }}
            >
            <Tab.Screen 
                name='Home' 
                component={MyStack} 
                options={{
                    tabBarLabel: 'Perfil',
                    headerShown: false,
                     tabBarIcon: ({ color, size}) => (
                        <MaterialCommunityIcons name='account-eye' color={color} size={size} /* color="black" */ />
                    ) 
                }}
                />
            <Tab.Screen name='HistoricoScreen' component={HistoricoScreen} 
            options={{
                tabBarLabel: 'Familia',
                
                 tabBarIcon: ({ color, size}) => (
                    <MaterialCommunityIcons name='account-group-outline' color={color} size={size} /* color="black" */ />
                    ) 
            }}
            
            />
            <Tab.Screen name='PartidoScreen' component={PartidoScreen}
            options={{
                tabBarLabel: 'Partido',
                 tabBarIcon: ({ color, size}) => (
                    <MaterialCommunityIcons name='card-account-mail-outline' color={color} size={size} /* color="black" */ />
                    ) 
            }}
            
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}