import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import Home from "../screens/Home/Home";
import PostForm from '../screens/PostForm/PostForm';
import MiPerfil from '../screens/MiPerfil/MiPerfil';
import Buscador from '../screens/Buscador/Buscador';

const Tab = createBottomTabNavigator();

export default function TabNav(){
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={Home} options = {{ headerShown: false ,
          tabBarIcon: () => <FontAwesome name='home' size={24} color='black'/> }}/> 
            <Tab.Screen name="Buscar" component={Buscador} options = {{  headerShown: false ,
          tabBarIcon: () => <FontAwesome name='search' size={24} /> }}/>
            <Tab.Screen name="Crear Post" component={PostForm} options = {{  headerShown: false ,
        tabBarIcon: () => <Octicons  name='diff-added' size={24} />}}/>
            <Tab.Screen name="Mi Perfil" component={MiPerfil} options = {{  headerShown: false ,
        tabBarIcon: () => <FontAwesome name='user' size={24}/>
        }}/>
            
        
            

        </Tab.Navigator>
    )
}
