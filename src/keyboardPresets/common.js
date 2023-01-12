export function setSelectedShift(pos, keysList){
    for(let elem of keysList){
        if(elem.positionFor !== undefined && elem.positionFor === pos){
            elem.selected = true
        }
    }
}

export function setFirstSelect(array, lastLetter, keysCases){
    for (let elem in keysCases) {
        if (keysCases[elem].indexOf(lastLetter) !== -1) {
            switch (elem) {
                case 'downCase':
                    return array.map(elem => {
                        elem.selected = false;
                        if(elem.content.indexOf(lastLetter.toUpperCase()) !== Number(-1)){
                            elem.selected = true;
                        }
                        return elem
                    })
                case 'upperCase':
                    return array.map(elem => {
                        elem.selected = false;
                        if(elem.content.indexOf(lastLetter) !== Number(-1)){
                            elem.selected = true;
                        }
            
                        if(elem.needShift === 'left'){
                            setSelectedShift('left', array)
                        }else if(elem.needShift === 'right'){
                            setSelectedShift('right', array)
                        }
                        return elem
                    })
                case 'symbols':
                    return array.map(elem => {
                        elem.selected = false;
                        if(elem.content.indexOf(lastLetter) !== Number(-1)){
                            elem.selected = true;
                        }
            
                        if(elem.needShift === 'left'){
                            setSelectedShift('left', array)
                        }else if(elem.needShift === 'right'){
                            setSelectedShift('right', array)
                        }
                        return elem
                    })
                default:
                    break;
            }
        }
    }
}