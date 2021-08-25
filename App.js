import React from 'react';
import Home from './src/screens/home';
import Materiais from './src/screens/materiais';

import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" 
          screenOptions={{ headerShown:false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Materiais" component={Materiais} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
