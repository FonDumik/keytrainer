import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "shared/hooks";
import { resetComplexText, updateComplexText, setRandomTextTraining, updateRandomText } from '../model';
import { setLastLetter } from 'features/InputCurrentText/model';
import styles from './styles.module.scss'

export function TextContainer() {
    const { isFinishedLine } = useAppSelector(state => state.inputCurrentTextReducer)
    const { configuration } = useAppSelector(state => state.configurationTrainingReducer)
    const { isRestart } = useAppSelector(state => state.headerReducer)
    const { complexText, randomText } = useAppSelector(state => state.textContainerReducer)
    const dispatch = useAppDispatch()

    let configurationRUSimpleText = configuration.language === 'RU' && (configuration.mode === 'start' || configuration.mode === 'begin')
    let configurationENGSimpleText = configuration.language === 'ENG' && (configuration.mode === 'start' || configuration.mode === 'begin')
    let configurationRUComplexText = configuration.language === 'RU' && configuration.mode === 'training'
    let configurationENGComplexText = configuration.language === 'ENG' && configuration.mode === 'training'

    useEffect(() => {
        dispatch(setLastLetter(randomText[0]));
    }, [randomText]);

    useEffect(() => {
        if(isFinishedLine && (configurationRUComplexText || configurationENGComplexText)){
            if(complexText.length === 1){
                dispatch(resetComplexText(configuration.language))
            }else{
                dispatch(updateComplexText())
            }
        }else if(isFinishedLine && (configurationRUSimpleText || configurationENGSimpleText)){
            dispatch(updateRandomText(configuration))
        }
    }, [isFinishedLine])

    useEffect(() => {
        dispatch(setRandomTextTraining(complexText[0]))
    }, [complexText])

    useEffect(() => {
        if(configurationRUComplexText || configurationENGComplexText){
            dispatch(resetComplexText(configuration.language))
        }else if(configurationRUSimpleText || configurationENGSimpleText){
            dispatch(updateRandomText(configuration))
        }
    }, [configuration])

    useEffect(() => {
        if(configurationRUComplexText || configurationENGComplexText){
            dispatch(resetComplexText(configuration.language))
        }else if(configurationRUSimpleText || configurationENGSimpleText){
            dispatch(updateRandomText(configuration))
        }
    }, [isRestart])

  return (
    <div>
        {configurationRUSimpleText || configurationENGSimpleText
        ?   <div className={styles.line}>
                {randomText}
            </div>
        :   <div className={styles.complexText}>
                {complexText.map(elem => (
                    <div className={styles.line}>{elem}</div>
                ))} 
            </div>
        }
    </div>
  )
}