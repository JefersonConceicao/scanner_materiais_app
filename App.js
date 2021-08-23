import React from 'react';
import Home from './src/screens/home';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

const App = () => (
  <Provider store={Store}>
    <Home/>
  </Provider>
)

export default App;
