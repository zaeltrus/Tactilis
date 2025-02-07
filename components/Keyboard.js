// components/Keyboard.js
import React from 'react';
import { View, Text } from 'react-native';
import BrailleKey from './BrailleKey';
import GradientButton from './GradientButton';
import AppStyles from '../styles/AppStyles';
import { Ionicons } from '@expo/vector-icons';

export default function Keyboard({
                                     onKeyPress,
                                     onDelete,
                                     onEnter,
                                     onEmoji,
                                     onNumbers,
                                     onBrailleInput,
                                     onKeyboardSelect,
                                     onMicPress,
                                     onThemeToggle, // New prop for theme toggle
                                     isHighContrast, // New prop indicating if high contrast is active
                                 }) {
    const topRowKeys = ['⠟', '⠺', '⠑', '⠗', '⠞', '⠽', '⠥', '⠊', '⠕', '⠏'];
    const secondRowKeys = ['⠁', '⠎', '⠙', '⠋', '⠛', '⠓', '⠚', '⠅', '⠇'];
    const thirdRowExtraKey = '⇧';
    const thirdRowKeys = ['⠵', '⠭', '⠉', '⠧', '⠃', '⠝', '⠍'];
    const fourthRowKeys = { numbers: '⠼', emoji: '😊', space: 'Space', enter: 'Enter' };

    // Override styles when high contrast is active.
    const keyOverrideStyle = {
        backgroundColor: '#333333',
        borderColor: '#FFFF00',
        borderWidth: 1,
    };
    const keyTextOverrideStyle = { color: '#FFFF00', fontWeight: 'bold' };

    // For extra buttons (bottom row), if high contrast is active, use solid yellow with black text.
    const extraButtonColors = isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined;
    const extraButtonTextStyle = isHighContrast ? { color: '#000000', fontWeight: 'bold' } : {};

    return (
        <View style={[AppStyles.keyboard, isHighContrast && { backgroundColor: '#333333' }]}>
            {/* Top row */}
            <View style={AppStyles.row}>
                {topRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`top-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    />
                ))}
            </View>

            {/* Second row */}
            <View style={[AppStyles.row, AppStyles.rowOffsetHalf]}>
                {secondRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`second-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    />
                ))}
            </View>

            {/* Third row */}
            <View style={[AppStyles.row, AppStyles.rowOffsetHalf]}>
                <BrailleKey
                    label={thirdRowExtraKey}
                    onPress={onBrailleInput}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                />
                {thirdRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`third-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    />
                ))}
                <BrailleKey
                    label="⌫"
                    onPress={onDelete}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                />
            </View>

            {/* Fourth row */}
            <View style={AppStyles.row}>
                <BrailleKey
                    label={fourthRowKeys.numbers}
                    onPress={onNumbers}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                />
                <BrailleKey
                    label={fourthRowKeys.emoji}
                    onPress={onEmoji}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                />
                <BrailleKey
                    label={fourthRowKeys.space}
                    onPress={() => onKeyPress(' ')}
                    style={isHighContrast ? { ...AppStyles.spacebar, ...keyOverrideStyle } : AppStyles.spacebar}
                    textStyle={isHighContrast ? keyTextOverrideStyle : AppStyles.specialKeyText}
                />
                <BrailleKey
                    label={fourthRowKeys.enter}
                    onPress={onEnter}
                    style={isHighContrast ? { ...AppStyles.enterKey, ...keyOverrideStyle } : AppStyles.enterKey}
                    textStyle={isHighContrast ? keyTextOverrideStyle : AppStyles.specialKeyText}
                />
            </View>

            {/* Bottom row with extra buttons using icons */}
            <View style={AppStyles.bottomRow}>
                <GradientButton
                    onPress={onKeyboardSelect}
                    style={AppStyles.extraButton}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="globe-outline" size={24} color={isHighContrast ? "#000000" : "#FFFFFF"} />
                    </View>
                </GradientButton>
                <GradientButton
                    onPress={onBrailleInput}
                    style={AppStyles.extraButton}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="grid-outline" size={24} color={isHighContrast ? "#000000" : "#FFFFFF"} />
                    </View>
                </GradientButton>
                <GradientButton
                    onPress={onMicPress}
                    style={AppStyles.extraButton}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="mic-outline" size={24} color={isHighContrast ? "#000000" : "#FFFFFF"} />
                    </View>
                </GradientButton>
                {/* High Contrast Toggle remains as text (HC) */}
                <GradientButton
                    onPress={onThemeToggle}
                    style={AppStyles.extraButton}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={isHighContrast ? { color: '#000000', fontWeight: 'bold' } : {}}>HC</Text>
                    </View>
                </GradientButton>
            </View>
        </View>
    );
}

