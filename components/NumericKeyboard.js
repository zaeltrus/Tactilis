import React from 'react';
import { View } from 'react-native';
import BrailleKey from './BrailleKey';
import AppStyles from '../styles/AppStyles';
import GradientButton from './GradientButton';
import { Ionicons } from '@expo/vector-icons';

export default function NumericKeyboard({ onKeyPress, onExit, isHighContrast }) {
    const row1 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const row2 = ["-", "/", ":", ";", "(", ")", "$", "&", "@", "\""];
    const row3 = [".", ",", "?", "!", "'"];

    return (
        <View style={AppStyles.keyboard}>
            <View style={AppStyles.row}>
                {row1.map((key, index) => (
                    <BrailleKey
                        key={`num1-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        dual={false}
                        style={isHighContrast ? { backgroundColor: '#333333' } : {}}
                    />
                ))}
            </View>
            <View style={AppStyles.row}>
                {row2.map((key, index) => (
                    <BrailleKey
                        key={`num2-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        dual={false}
                        style={isHighContrast ? { backgroundColor: '#333333' } : {}}
                    />
                ))}
            </View>
            <View style={AppStyles.row}>
                {row3.map((key, index) => (
                    <BrailleKey
                        key={`num3-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        dual={false}
                        style={isHighContrast ? { backgroundColor: '#333333' } : {}}
                    />
                ))}
            </View>
            <View style={AppStyles.bottomRow}>
                <GradientButton
                    onPress={onExit}
                    style={[AppStyles.extraButton, { padding: 0 }]}
                    noPadding={true}
                    accessibilityLabel="Switch to alphabet keyboard"
                    accessibilityHint="Switch back to the default keyboard layout"
                >
                    <Ionicons name="return-up-back-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
            </View>
        </View>
    );
}
