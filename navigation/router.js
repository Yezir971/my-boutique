import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from '../screen/home'
import Detail from '../screen/detail'
import PlayersStack from './playerStack'
import Add from '../screen/add'

const Tabs = createBottomTabNavigator()

// cette fonction déclare le comosant de navigation principal "AppNavigation"

const AppNavigation = () => {
    return(
        <>
            <NavigationContainer>
                {/* configuration des onglets de navigation  */}
                <Tabs.Navigator>
                {/* L'option options={{ headerShown: false }} retirera le titre "home" de l'en-tête de vos écrans. */}
                    <Tabs.Screen name='Home' component={PlayersStack} options={{headerShown: false}} />
                    <Tabs.Screen name='Add' component={Add} />
                </Tabs.Navigator>

            </NavigationContainer>
        </>
    )
}

export default AppNavigation