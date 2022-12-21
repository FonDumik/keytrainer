import { useEffect, useState } from 'react';
import Header from './components/Header';
import InputText from './components/InputText';
import Keyboard from './components/Keyboard';
import { AutoContext } from './context';
import "./styles/App.css";
import { arrayWords } from './wordsToPrint'

const selectWord = (arrLength) => {
  let randomNum = Math.floor(arrLength * Math.random());
  return arrayWords[randomNum];
}

const generateText = (word) => {
    let string = '';
    for (let i = 0; i < 70; i += word.length + 1) {
        string = string + word + ' ';
    }
    return string;
}

function App() {
  const [time, setTime] = useState(5);
  const [timeWrite, setTimeWrite] = useState(0);
  const [isRestart, setIsRestart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [errors, setErrors] = useState(0);
  const [currentTime, setCurrentTime] = useState(300);
  const [currentText, setText] = useState('');
  const [randomText, setRandomText] = useState(generateText(selectWord(arrayWords.length)));
  const [lastLetter, setLastLetter] = useState(randomText[0]);
  const [textLength, setTextLength] = useState(randomText.length);
  const [objectLetter, setObjectLetter] = useState();
  const [shiftButton, setShiftButton] = useState(); 

  function resetText(){
    setText('');
    let sentence = generateText(selectWord(arrayWords.length)); 
    setLastLetter(sentence[0]);  
    setRandomText(sentence);
  }

  useEffect(() => {
    if(isRestart){
      resetText()
      if(currentTime === 0){
        setCurrentTime(time*60)
      }
      setIsRestart(false)
    }
  },[isRestart]) 

  return (
    <AutoContext.Provider value={{
      randomText, setRandomText,
      currentText, setText, 
      shiftButton, setShiftButton,
      time, setTime,
      objectLetter, setObjectLetter,
      currentTime,setCurrentTime,
      isFinished, setIsFinished,
      isStarted, setIsStarted,
      textLength, setTextLength,
      lastLetter, setLastLetter,
      errors, setErrors,
      isRestart, setIsRestart,
      timeWrite, setTimeWrite
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
