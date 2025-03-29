import React from 'react';
import { View } from 'react-native';
import BrailleKey from './BrailleKey';
import AppStyles from '../styles/AppStyles';

export default function Keyboard({
                                     onKeyPress,
                                     onDelete,
                                     onBrailleInput,
                                     onMicPress,
                                     onThemeToggle,
                                     isHighContrast,
                                     dualLayout,
                                     onMiniToggle,
                                     onEmoji,
                                     onNumbers,
                                 }) {
    // Braille keys arranged in a typical QWERTY layout
    const topRowKeys = ['⠟', '⠺', '⠑', '⠗', '⠞', '⠽', '⠥', '⠊', '⠕', '⠏'];
    const secondRowKeys = ['⠁', '⠎', '⠙', '⠋', '⠛', '⠓', '⠚', '⠅', '⠇'];
    const thirdRowKeys = ['⠵', '⠭', '⠉', '⠧', '⠃', '⠝', '⠍'];
    const shiftKey = '⇧';

    // Styles override for high contrast mode
    const keyOverrideStyle = {
        backgroundColor: '#333333',
        borderColor: '#FFFF00',
        borderWidth: 1,
    };
    const keyTextOverrideStyle = { color: '#FFFF00', fontWeight: 'bold', fontSize: 30, textAlign: 'center' };

    return (
        <View style={[AppStyles.keyboard, isHighContrast && { backgroundColor: '#333333' }]}>
            {/* First row of Braille keys (Q-P) */}
            <View style={AppStyles.row}>
                {topRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`top-${index}`}
                        label={key}
                        dual={dualLayout}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                        accessibilityLabel={`Key ${key}`}
                        accessibilityHint={`Press to input ${key}`}
                    />
                ))}
            </View>

            {/* Second row of Braille keys (A-L) */}
            <View style={[AppStyles.row, { justifyContent: 'center' }]}>
                {secondRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`second-${index}`}
                        label={key}
                        dual={dualLayout}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                        accessibilityLabel={`Key ${key}`}
                        accessibilityHint={`Press to input ${key}`}
                    />
                ))}
            </View>

            {/* Third row including special keys (Shift, Z-M, Delete) */}
            <View style={[AppStyles.row, { justifyContent: 'center' }]}>
                <BrailleKey
                    label={shiftKey}
                    dual={dualLayout}
                    onPress={onBrailleInput}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    accessibilityLabel="Shift"
                    accessibilityHint="Toggle Braille input mode"
                />
                {thirdRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`third-${index}`}
                        label={key}
                        dual={dualLayout}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                        accessibilityLabel={`Key ${key}`}
                        accessibilityHint={`Press to input ${key}`}
                    />
                ))}
                <BrailleKey
                    label="⌫"
                    dual={dualLayout}
                    onPress={onDelete}
                    style={isHighContrast ? { backgroundColor: '#E74C3C', borderColor: '#E74C3C', borderWidth: 1 } : {}}
                    textStyle={isHighContrast ? { color: '#000000', fontWeight: 'bold' } : {}}
                    accessibilityLabel="Delete"
                    accessibilityHint="Deletes the last character"
                />
            </View>
        </View>
    );
}