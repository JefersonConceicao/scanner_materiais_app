import React from 'react';
import Home from './src/screens/home';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

import { NavigationContainer } from '@react-navigation/native';

const App = () => (
  <NavigationContainer>
    <Provider store={Store}>
      <Home/>
    </Provider>
  </NavigationContainer>
)

export default App;
