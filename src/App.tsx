import React, { useEffect, useState } from 'react';

import Header from './components/header/Header';
import InputText from './components/inputText/InputText';
import Keyboard from './components/keyboard/Keyboard';
import { AutoContext } from './context';
import { generateOneWordText } from './shared/textGenerator/generateOneWordText'
import { generateMultipleWordText } from './shared/textGenerator/generateMultipleWordText'
import "./App.scss";
import { configurationTrainingType } from './types/configurationTraining';

function selectText(configuration: configurationTrainingType){
  if(configuration.language === 'RU'){
    if(configuration.mode === 'start'){
      return generateOneWordText()
    }else if(configuration.mode === 'begin'){
      return generateMultipleWordText()
    }else if(configuration.mode === 'training'){
      return generateMultipleWordText()
    } 
  }
}

function App() {
  const [configurationTraining, setConfigurationTraining] = useState({
    language: 'RU',
    mode: 'start'
  })
  const [randomText, setRandomText] = useState(selectText(configurationTraining));
  const [time, setTime] = useState(5);
  const [timeWrite, setTimeWrite] = useState(0);
  const [isRestart, setIsRestart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [errors, setErrors] = useState(0);
  const [currentTime, setCurrentTime] = useState(time*60);
  const [currentText, setText] = useState('');
  const [lastLetter, setLastLetter] = useState(randomText[0]);
  const [textLength, setTextLength] = useState(randomText.length);

  function resetText(){
    setText('');
    let sentence = selectText(configurationTraining); 
    setLastLetter(sentence[0]);  
    setErrors(0)
    setRandomText(sentence);
  }

  useEffect(() => {
    if(isRestart){
      resetText()
      if(currentTime === 0){
        setCurrentTime(time*60)
      }
      setIsRestart(false)
      setIsStarted(false)
    }
  },[isRestart])
  
  useEffect(() => {
    resetText()
  },[configurationTraining])

  return (
    <AutoContext.Provider value={{
      randomText, setRandomText,
      currentText, setText,
      time, setTime,
      currentTime, setCurrentTime,
      isFinished, setIsFinished,
      isStarted, setIsStarted,
      textLength, setTextLength,
      lastLetter, setLastLetter,
      errors, setErrors,
      isRestart, setIsRestart, 
      timeWrite, setTimeWrite,
      configurationTraining, setConfigurationTraining
    }}>
      <div className="App">
        <Header/>
        <InputText/>
        <Keyboard/>
      </div>
    </AutoContext.Provider>
  )
}

export default App;
