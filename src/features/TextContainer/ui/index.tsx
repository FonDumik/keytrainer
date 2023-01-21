import {useState, useEffect} from 'react'
import { generateSentence } from 'shared/utils/textGenerator/generateSentences';
import { setRandomTextTraining, updateRandomText } from 'widgets/InputText';
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import styles from './styles.module.scss'

export function TextContainer() {
    const { randomText, isFinishedLine } = useAppSelector(state => state.inputTextReducer)
    const { configuration } = useAppSelector(state => state.configurationTrainingReducer)
    const { isRestart } = useAppSelector(state => state.headerReducer)
    const [complexText, setComplexText] = useState(generateSentence())
    const dispatch = useAppDispatch()

    let configurationRUSimpleText = configuration.language === 'RU' && (configuration.mode === 'start' || configuration.mode === 'begin')
    let configurationRUComplexText = configuration.language === 'RU' && configuration.mode === 'training'

    useEffect(() => {
        if(isFinishedLine && configurationRUComplexText){
            if(complexText.length === 1){
                setComplexText(generateSentence())
            }else{
                complexText.shift()
                setComplexText(complexText)
            }
        }else if(isFinishedLine && configurationRUSimpleText){
            dispatch(updateRandomText(configuration))
        }
    }, [isFinishedLine])

    useEffect(() => {
        dispatch(setRandomTextTraining(complexText[0]))
    }, [complexText])

    useEffect(() => {
        if(configurationRUComplexText){
            dispatch(setRandomTextTraining(complexText[0]))
        }else if(configurationRUSimpleText){
            dispatch(updateRandomText(configuration))
        }
    }, [configuration])

    useEffect(() => {
        if(configurationRUComplexText){
            setComplexText(generateSentence())
        }else if(configurationRUSimpleText){
            dispatch(updateRandomText(configuration))
        }
    }, [isRestart])

  return (
    <div>
        {configurationRUSimpleText 
        ? <div className={styles.line}>{randomText}</div>
        : <div className={styles.complexText}>
            {complexText.map(elem => (
                <div className={styles.line}>{elem}</div>
            ))} 
            </div>
        }
    </div>
  )
}
