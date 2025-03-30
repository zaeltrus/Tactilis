export const brailleToLatin = {
    '⠟': 'Q',
    '⠺': 'W',
    '⠑': 'E',
    '⠗': 'R',
    '⠞': 'T',
    '⠽': 'Y',
    '⠥': 'U',
    '⠊': 'I',
    '⠕': 'O',
    '⠏': 'P',
    '⠁': 'A',
    '⠎': 'S',
    '⠙': 'D',
    '⠋': 'F',
    '⠛': 'G',
    '⠓': 'H',
    '⠚': 'J',
    '⠅': 'K',
    '⠇': 'L',
    '⠵': 'Z',
    '⠭': 'X',
    '⠉': 'C',
    '⠧': 'V',
    '⠃': 'B',
    '⠝': 'N',
    '⠍': 'M'
};

export const convertBrailleToLatin = (text) =>
    text.split('').map(char => brailleToLatin[char] || char).join('');