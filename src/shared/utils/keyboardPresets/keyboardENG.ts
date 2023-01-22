import { keyboardCases, keyboardConfiguration } from "../../types/keyboardConfiguration";

export const keysCasesEng: keyboardCases = {
    downCase: [' ','a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
    upperCase: ['P','O', 'I', 'U', 'Y', 'T', 'R', 'E', 'W', 'Q', 'L', 'K', 'J', 'H', 'G', 'F', 'D', 'S', 'A', 'M', 'N', 'B', 'V', 'C', 'X', 'Z'],
    symbols: ['!', '@', '#', '$', '%', '&', '?', '-', '+', '=', '~', '.', ',', ':', '<', '>', '/'],
};

export const arrayListENG: Array<keyboardConfiguration> = [
    {setType: '5', content1: 'Ё',   needShift: 'right', selected: false},
    {setType: '5', content1: '1', content2:'!', needShift: 'right', selected: false},
    {setType: '4', content1: '2', content2: '@', needShift: 'right', selected: false},
    {setType: '3', content1: '3', content2: '#',needShift: 'right', selected: false},
    {setType: '1.1', content1: '4', content2: '$', needShift: 'right', selected: false},
    {setType: '1.1', content1: '5', content2: '%', needShift: 'right', selected: false},
    {setType: '1', content1: '6', content2: '^',  needShift: 'left', selected: false},
    {setType: '1', content1: '7', content2: '&',  needShift: 'left', selected: false},
    {setType: '3', content1: '8', content2: '*',  needShift: 'left', selected: false},
    {setType: '4', content1: '9', content2: '(',  needShift: 'left', selected: false},
    {setType: '5', content1: '0', content2: ')',  needShift: 'left', selected: false},
    {setType: '5', content1: '-', content2: '_',  needShift: 'left', selected: false},
    {setType: '5', content1: '=', content2: '+',  needShift: 'left', selected: false},
    {setType: 'sys backspace', content1: 'Backspace', selected: false},

    {setType: 'sys tab', content1: 'Tab',  selected: false},
    {setType: '5', content1: 'Q',  needShift: 'right', selected: false},
    {setType: '4', content1: 'W',  needShift: 'right', selected: false},
    {setType: '3', content1: 'E',  needShift: 'right', selected: false},
    {setType: '1.1', content1: 'R',  needShift: 'right', selected: false},
    {setType: '1.1', content1: 'T', needShift: 'right', selected: false},
    {setType: '1', content1: 'Y',   needShift: 'left', selected: false},
    {setType: '1', content1: 'U',  needShift: 'left', selected: false},
    {setType: '3', content1: 'I',   needShift: 'left', selected: false},
    {setType: '4', content1: 'O',   needShift: 'left', selected: false},
    {setType: '5', content1: 'P',   needShift: 'left', selected: false},
    {setType: '5', content1: '[', content2: '{',   needShift: 'left', selected: false},
    {setType: '5', content1: ']', content2: '}',   needShift: 'left', selected: false},
    {setType: '5', content1: '/',  content2: '|', needShift: 'left', selected: false},

    {setType: 'sys caps', content1: 'CapsLock', selected: false},
    {setType: '5', content1: 'A', needShift: 'right', selected: false},
    {setType: '4', content1: 'S',  needShift: 'right', selected: false},
    {setType: '3', content1: 'D',  needShift: 'right', selected: false},
    {setType: '1.1', content1: 'F', needShift: 'right', selected: false},
    {setType: '1.1', content1: 'G', needShift: 'right', selected: false},
    {setType: '1', content1: 'H',   needShift: 'left', selected: false},
    {setType: '1', content1: 'J',   needShift: 'left', selected: false},
    {setType: '3', content1: 'K',   needShift: 'left', selected: false},
    {setType: '4', content1: 'L',  needShift: 'left', selected: false},
    {setType: '5', content1: ';', content2: ':',   needShift: 'left', selected: false},
    {setType: '5', content1: "'", content2: '"', needShift: 'left', selected: false},
    {setType: 'sys enter', content1: 'Enter', selected: false},

    {setType: 'sys shift', content1: 'Shift',  positionFor: 'left', selected: false},
    {setType: '5', content1: 'Z',  needShift: 'right', selected: false},
    {setType: '4', content1: 'X',  needShift: 'right', selected: false},
    {setType: '3', content1: 'C',  needShift: 'right', selected: false},
    {setType: '1.1', content1: 'V',  needShift: 'right', selected: false},
    {setType: '1.1', content1: 'B',  needShift: 'right', selected: false},
    {setType: '1', content1: 'N',   needShift: 'left', selected: false},
    {setType: '1', content1: 'M',   needShift: 'left', selected: false},
    {setType: '3', content1: ',', content2: '<',  needShift: 'left', selected: false},
    {setType: '4', content1: '.', content2: '>',  needShift: 'left', selected: false},
    {setType: '5', content1: '/', content2: '?', needShift: 'left', selected: false},
    {setType: 'sys shift', content1: 'Shift', positionFor: 'right', selected: false},

    {setType: 'sys space', content1: ' ',  selected: false},
]