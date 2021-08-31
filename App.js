import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Root } from 'react-native-gpp-utils';

import Home from './src/screens/home';
import Materiais from './src/screens/materiais';
import Scanner from './src/screens/scanner';
import MateriaisPrev from './src/screens/materiais_preview';
import Layout from './src/components/layout';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <Root>
        <Provider store={Store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Layout" component={Layout} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Materiais" component={Materiais} />
              <Stack.Screen name="Scanner" component={Scanner} />
              <Stack.Screen name="MateriaisPrev" component={MateriaisPrev} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </Root>
  )
}

export default App;
