import React from 'react';

import { Header } from '../widgets/Header';
import { InputText } from '../widgets/InputText';
import { Keyboard } from '../widgets/Keyboard';
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
