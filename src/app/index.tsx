import React from 'react';

import { Header } from '../components/Header';
import { InputText } from '../components/InputText';
import { Keyboard } from '../components/Keyboard';
import "./App.scss";
import { Provider } from 'react-redux';
import { store } from '../shared/store';

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
