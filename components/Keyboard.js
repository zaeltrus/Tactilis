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
    const topRowKeys = ['⠟', '⠺', '⠑', '⠗', '⠞', '⠽', '⠥', '⠊', '⠕', '⠏'];
    const secondRowKeys = ['⠁', '⠎', '⠙', '⠋', '⠛', '⠓', '⠚', '⠅', '⠇'];
    const thirdRowKeys = ['⠵', '⠭', '⠉', '⠧', '⠃', '⠝', '⠍'];
    const shiftKey = '⇧';

    const keyOverrideStyle = {
        backgroundColor: '#333333',
        borderColor: '#FFFF00',
        borderWidth: 1,
    };
    const keyTextOverrideStyle = { color: '#FFFF00', fontWeight: 'bold' };

    return (
        <View style={[AppStyles.keyboard, isHighContrast && { backgroundColor: '#333333' }]}>
            {/* Row 1 */}
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
            {/* Row 2 */}
            <View style={[AppStyles.row, AppStyles.rowOffsetHalf]}>
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
            {/* Row 3: Shift key, then letters, then Delete */}
            <View style={[AppStyles.row, AppStyles.rowOffsetHalf]}>
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
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    accessibilityLabel="Delete"
                    accessibilityHint="Deletes the last character"
                />
            </View>
            {/* Bottom Toolbar removed */}
        </View>
    );
}