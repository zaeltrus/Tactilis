import React from 'react';
import { View } from 'react-native';
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
                                     onThemeToggle,
                                     isHighContrast,
                                 }) {
    console.log('Keyboard rendered'); // Debug log

    const topRowKeys = ['⠟', '⠺', '⠑', '⠗', '⠞', '⠽', '⠥', '⠊', '⠕', '⠏'];
    const secondRowKeys = ['⠁', '⠎', '⠙', '⠋', '⠛', '⠓', '⠚', '⠅', '⠇'];
    const thirdRowExtraKey = '⇧';
    const thirdRowKeys = ['⠵', '⠭', '⠉', '⠧', '⠃', '⠝', '⠍'];
    const fourthRowKeys = { numbers: '⠼', emoji: '😊', space: 'Space', enter: 'Enter' };

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
        <View
            style={[AppStyles.keyboard, isHighContrast && { backgroundColor: '#333333' }]}
            accessible={true}
            accessibilityLabel="Keyboard"
        >
            {/* Top row */}
            <View style={AppStyles.row}>
                {topRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`top-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                        accessibilityLabel={`Key ${key}`}
                        accessibilityHint={`Press to input ${key}`}
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
                        accessibilityLabel={`Key ${key}`}
                        accessibilityHint={`Press to input ${key}`}
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
                    accessibilityLabel="Toggle Braille input mode"
                    accessibilityHint="Switch between chat and Braille input modes"
                />
                {thirdRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`third-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                        style={isHighContrast ? keyOverrideStyle : {}}
                        textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                        accessibilityLabel={`Key ${key}`}
                        accessibilityHint={`Press to input ${key}`}
                    />
                ))}
                <BrailleKey
                    label="⌫"
                    onPress={onDelete}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    accessibilityLabel="Delete"
                    accessibilityHint="Deletes the last character"
                />
            </View>

            {/* Fourth row */}
            <View style={AppStyles.row}>
                <BrailleKey
                    label={fourthRowKeys.numbers}
                    onPress={onNumbers}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    accessibilityLabel="Numbers"
                    accessibilityHint="Switch to number input mode"
                />
                <BrailleKey
                    label={fourthRowKeys.emoji}
                    onPress={onEmoji}
                    style={isHighContrast ? keyOverrideStyle : {}}
                    textStyle={isHighContrast ? keyTextOverrideStyle : {}}
                    accessibilityLabel="Emoji"
                    accessibilityHint="Switch to emoji input mode"
                />
                <BrailleKey
                    label={fourthRowKeys.space}
                    onPress={() => onKeyPress(' ')}
                    style={isHighContrast ? { ...AppStyles.spacebar, ...keyOverrideStyle } : AppStyles.spacebar}
                    textStyle={isHighContrast ? keyTextOverrideStyle : AppStyles.specialKeyText}
                    accessibilityLabel="Space"
                    accessibilityHint="Insert a space"
                />
                <BrailleKey
                    label={fourthRowKeys.enter}
                    onPress={onEnter}
                    style={isHighContrast ? { ...AppStyles.enterKey, ...keyOverrideStyle } : AppStyles.enterKey}
                    textStyle={isHighContrast ? keyTextOverrideStyle : AppStyles.specialKeyText}
                    accessibilityLabel="Enter"
                    accessibilityHint="Submit your input"
                />
            </View>

            {/* Bottom row with extra buttons using icons */}
            <View style={AppStyles.bottomRow}>
                <GradientButton
                    onPress={onKeyboardSelect}
                    style={[AppStyles.extraButton, { padding: 0 }]}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                    noPadding={true}
                    accessibilityLabel="Select keyboard"
                    accessibilityHint="Switch to a different keyboard layout"
                >
                    <Ionicons
                        name="globe-outline"
                        size={24}
                        color={isHighContrast ? '#000000' : '#FFFFFF'}
                        style={{ alignSelf: 'center' }}
                    />
                </GradientButton>
                <GradientButton
                    onPress={onBrailleInput}
                    style={[AppStyles.extraButton, { padding: 0 }]}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                    noPadding={true}
                    accessibilityLabel="Braille input mode"
                    accessibilityHint="Switch to Braille input mode"
                >
                    <Ionicons
                        name="finger-print-outline"
                        size={24}
                        color={isHighContrast ? '#000000' : '#FFFFFF'}
                        style={{ alignSelf: 'center' }}
                    />
                </GradientButton>
                <GradientButton
                    onPress={onMicPress}
                    style={[AppStyles.extraButton, { padding: 0 }]}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                    noPadding={true}
                    accessibilityLabel="Microphone"
                    accessibilityHint="Activate voice input"
                >
                    <Ionicons
                        name="mic-outline"
                        size={24}
                        color={isHighContrast ? '#000000' : '#FFFFFF'}
                        style={{ alignSelf: 'center' }}
                    />
                </GradientButton>
                <GradientButton
                    onPress={onThemeToggle}
                    style={[AppStyles.extraButton, { padding: 0 }]}
                    colors={extraButtonColors}
                    textStyle={extraButtonTextStyle}
                    noPadding={true}
                    accessibilityLabel="Toggle high contrast mode"
                    accessibilityHint="Switch between high contrast and normal display modes"
                >
                    <Ionicons
                        name="invert-mode-outline"
                        size={24}
                        color={isHighContrast ? '#000000' : '#FFFFFF'}
                        style={{ alignSelf: 'center' }}
                    />
                </GradientButton>
            </View>
        </View>
    );
}
