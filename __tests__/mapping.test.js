const brailleMapping = {
    '1': 'A', '12': 'B', '14': 'C', '145': 'D', '15': 'E',
    '124': 'F', '1245': 'G', '125': 'H', '24': 'I', '245': 'J',
    '13': 'K', '123': 'L', '134': 'M', '1345': 'N', '135': 'O',
    '1234': 'P', '12345': 'Q', '1235': 'R', '234': 'S', '2345': 'T',
    '136': 'U', '1236': 'V', '2456': 'W', '1346': 'X', '13456': 'Y',
    '1356': 'Z',
};

const morseMapping = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.',
    F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
    K: '-.-', L: '.-..', M: '--', N: '-.', O: '---',
    P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
    U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--',
    Z: '--..',
};

test('Braille mapping accuracy', () => {
    expect(brailleMapping['1']).toBe('A');
    expect(brailleMapping['245']).toBe('J');
    expect(brailleMapping['12345']).toBe('Q');
    expect(brailleMapping['1356']).toBe('Z');
});

test('Morse mapping accuracy', () => {
    expect(morseMapping['A']).toBe('.-');
    expect(morseMapping['B']).toBe('-...');
    expect(morseMapping['Y']).toBe('-.--');
    expect(morseMapping['Z']).toBe('--..');
});