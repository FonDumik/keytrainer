import { configurationTrainingType } from "../../types/configurationTraining";

export function setNewTextConfiguration(configuration: configurationTrainingType){
    if(configuration.language === 'RU'){
        if(configuration.mode === 'start'){
            return 'Русский стартовый'
        }else if(configuration.mode === 'begin'){
            return 'Русский начальный'
        }else if(configuration.mode === 'training'){
            return 'Русский тренировка'
        }
    }
}