import React from 'react';
import { View } from 'react-native';
import BrailleKey from './BrailleKey';
import AppStyles from '../styles/AppStyles';
import GradientButton from './GradientButton';
import { Ionicons } from '@expo/vector-icons';

export default function NumericKeyboard({ onKeyPress, onExit, onDelete, isHighContrast }) {
    const row1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const row2 = ["-", "/", ":", ";", "(", ")", "$", "&", "@", "\""];
    const row3 = [".", ",", "?", "!", "'", "+", "*", "#", "%", "="];

    // Style overrides for high contrast mode
    const highContrastKeyStyle = {
        backgroundColor: '#333333',
        borderColor: '#FFFF00',
        borderWidth: 1.5,
    };

    const highContrastTextStyle = {
        color: '#FFFF00',
        fontWeight: 'bold',
    };

    return (
        <View style={[AppStyles.keyboard, { backgroundColor: isHighContrast ? '#333333' : '#2E2E3A', flex: 1, paddingBottom: 15 }]}>
            {/* Row 1 */}
            <View style={[AppStyles.row, { justifyContent: 'center' }]}>
                {row1.map((key, index) => (
                    <BrailleKey
                        key={`num1-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        dual={false}
                        style={isHighContrast ? highContrastKeyStyle : {}}
                        textStyle={isHighContrast ? highContrastTextStyle : {}}
                    />
                ))}
            </View>
            {/* Row 2 */}
            <View style={[AppStyles.row, { justifyContent: 'center' }]}>
                {row2.map((key, index) => (
                    <BrailleKey
                        key={`num2-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        dual={false}
                        style={isHighContrast ? highContrastKeyStyle : {}}
                        textStyle={isHighContrast ? highContrastTextStyle : {}}
                    />
                ))}
            </View>
            {/* Row 3 (aligned properly) */}
            <View style={[AppStyles.row, { justifyContent: 'center' }]}>
                {row3.map((key, index) => (
                    <BrailleKey
                        key={`num3-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        dual={false}
                        style={isHighContrast ? highContrastKeyStyle : {}}
                        textStyle={isHighContrast ? highContrastTextStyle : {}}
                    />
                ))}
            </View>

            {/* Control Buttons */}
            <View style={[AppStyles.bottomRow, { marginTop: 15, justifyContent: 'flex-end', paddingHorizontal: 20 }]}>
                {/* Delete button */}
                <GradientButton
                    onPress={onDelete}
                    style={[{ paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25, marginRight: 10 }]}
                    noPadding={true}
                    accessibilityLabel="Delete"
                    accessibilityHint="Delete last character"
                    colors={isHighContrast ? ['#E74C3C', '#E74C3C'] : ['#7435FD', '#C381E7']}
                >
                    <Ionicons
                        name="backspace-outline"
                        size={28}
                        color={isHighContrast ? '#000000' : '#FFFFFF'}
                    />
                </GradientButton>
                {/* Back button */}
                <GradientButton
                    onPress={onExit}
                    style={[{ paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 }]}
                    noPadding={true}
                    accessibilityLabel="Switch to alphabet keyboard"
                    accessibilityHint="Switch back to the default keyboard layout"
                    colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : ['#7435FD', '#C381E7']}
                >
                    <Ionicons
                        name="return-up-back-outline"
                        size={28}
                        color={isHighContrast ? '#000000' : '#FFFFFF'}
                    />
                </GradientButton>
            </View>
        </View>
    );
}