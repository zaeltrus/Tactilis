import { convertBrailleToLatin } from '../utils/conversion';

test('Braille to Latin conversion accuracy', () => {
    expect(convertBrailleToLatin('⠓⠑⠇⠇⠕')).toBe('HELLO');
    expect(convertBrailleToLatin('⠃⠽⠑')).toBe('BYE');
});