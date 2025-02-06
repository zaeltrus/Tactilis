// components/Keyboard.js
import React from 'react';
import { View } from 'react-native';
import BrailleKey from './BrailleKey';
import GradientButton from './GradientButton';
import AppStyles from '../../Tactilis2/styles/AppStyles';


export default function Keyboard({
                                     onKeyPress,
                                     onDelete,
                                     onEnter,
                                     onEmoji,
                                     onNumbers,
                                     onBrailleInput,
                                     onKeyboardSelect,
                                     onMicPress,
                                 }) {
    const topRowKeys = ['⠟', '⠺', '⠑', '⠗', '⠞', '⠽', '⠥', '⠊', '⠕', '⠏'];
    const secondRowKeys = ['⠁', '⠎', '⠙', '⠋', '⠛', '⠓', '⠚', '⠅', '⠇'];
    const thirdRowExtraKey = '⇧'; // (Optional: You may remove this if you prefer the toggle to be only in the bottom row)
    const thirdRowKeys = ['⠵', '⠭', '⠉', '⠧', '⠃', '⠝', '⠍'];
    const fourthRowKeys = { numbers: '⠼', emoji: '😊', space: 'Space', enter: 'Enter' };

    return (
        <View style={AppStyles.keyboard}>
            {/* Top row: no offset */}
            <View style={AppStyles.row}>
                {topRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`top-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                    />
                ))}
            </View>

            {/* Second row: offset by half a key width */}
            <View style={[AppStyles.row, AppStyles.rowOffsetHalf]}>
                {secondRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`second-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                    />
                ))}
            </View>

            {/* Third row: offset by half a key width */}
            <View style={[AppStyles.row, AppStyles.rowOffsetHalf]}>
                {/* If you wish to remove the old ⇧ button from here, you can comment it out */}
                <BrailleKey label={thirdRowExtraKey} onPress={onBrailleInput} />
                {thirdRowKeys.map((key, index) => (
                    <BrailleKey
                        key={`third-${index}`}
                        label={key}
                        onPress={() => onKeyPress(key)}
                    />
                ))}
                <BrailleKey label="⌫" onPress={onDelete} />
            </View>

            {/* Fourth row: no offset */}
            <View style={AppStyles.row}>
                <BrailleKey label={fourthRowKeys.numbers} onPress={onNumbers} />
                <BrailleKey label={fourthRowKeys.emoji} onPress={onEmoji} />
                <BrailleKey
                    label={fourthRowKeys.space}
                    onPress={() => onKeyPress(' ')}
                    style={AppStyles.spacebar}
                    textStyle={AppStyles.specialKeyText}
                />
                <BrailleKey
                    label={fourthRowKeys.enter}
                    onPress={onEnter}
                    style={AppStyles.enterKey}
                    textStyle={AppStyles.specialKeyText}
                />
            </View>

            {/* Bottom row: extra buttons using GradientButton */}
            <View style={AppStyles.bottomRow}>
                <GradientButton onPress={onKeyboardSelect} style={AppStyles.extraButton}>
                    􀆪
                </GradientButton>
                <GradientButton onPress={onBrailleInput} style={AppStyles.extraButton}>
                    ⣞
                </GradientButton>
                <GradientButton onPress={onMicPress} style={AppStyles.extraButton}>
                    􀊰
                </GradientButton>
            </View>
        </View>
    );
}
