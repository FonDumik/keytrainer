import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { keyboardCases, keyboardConfiguration , keyboardCasesKeys} from '../../../types/keyboardConfiguration';
import { keysCases, arrayList } from '../../../shared/keyboardPresets/keyboardRU';
import { setSelectedShift } from "../../../shared/keyboardPresets/common";

interface keyboardState {
    keyList: Array<keyboardConfiguration>
}

const initialState: keyboardState = {
    keyList: arrayList
}

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    updateKeyboard(state, lastLetter: PayloadAction<string>){
        state.keyList = selectLetter(keysCases, lastLetter.payload, state.keyList)
    }
  }
});

export const { updateKeyboard } = keyboardSlice.actions

export default keyboardSlice.reducer

export function selectLetter(keysCases: keyboardCases, lastLetter: string, keysList: Array<keyboardConfiguration>){
    for (let elem in keysCases) {
        if (keysCases[elem as keyof keyboardCasesKeys].indexOf(lastLetter) !== -1) {
            switch (elem) {
                case 'downCase':
                    return keysList.map(elem => {
                        elem.selected = false
                        if(elem.content1 === lastLetter.toUpperCase() || elem.content1 === lastLetter){
                            elem.selected = true;
                        }
                        return elem
                    })
                case 'upperCase':
                    return keysList.map(elem => {
                        elem.selected = false
                        if(elem.content1 === lastLetter){
                            elem.selected = true;
                        }
                
                        if(elem.needShift === 'left'){
                            setSelectedShift('left', keysList)
                        }else if(elem.needShift === 'right'){
                            setSelectedShift('right', keysList)
                        }
                        return elem
                    })
                case 'symbols':
                    return keysList.map(elem => {
                        elem.selected = false;
                        if(elem.content1 === lastLetter){
                            elem.selected = true;
                        }
                
                        if(elem.needShift === 'left'){
                            setSelectedShift('left', keysList)
                        }else if(elem.needShift === 'right'){
                            setSelectedShift('right', keysList)
                        }
                        return elem
                    })
                default:
                    break;
            }
        }
    }
}