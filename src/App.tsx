import React from 'react';

import Header from './components/header/Header';
import InputText from './components/inputText/InputText';
import Keyboard from './components/keyboard/Keyboard';
import "./App.scss";
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <InputText/>
        <Keyboard/>
      </div>
    </Provider>
  )
}

export default App;
