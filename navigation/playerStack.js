import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screen/home'
import Detail from '../screen/detail'
import Update from '../screen/update'

// importe la fonction de création de stack navigation a partir de la bibliothèque React Navigation 

const Stack = createNativeStackNavigator()

const PlayersStack = () => {
    return(
        <>
            {/* on utilise le composant Stack.Navigator pour gérer la navigation  */}
            <Stack.Navigator>
                <Stack.Screen name='List' component={Home} />
                <Stack.Screen name='Detail' component={Detail} />
                <Stack.Screen name='Update' component={Update} />
            </Stack.Navigator>
        
        </>
    )
}

export default PlayersStack