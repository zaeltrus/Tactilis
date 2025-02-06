import React from 'react';
import { View } from 'react-native';
import BrailleKey from './BrailleKey';
import AppStyles from '../styles/AppStyles';

export default function Keyboard({ onKeyPress, onDelete, onEnter, onEmoji, onNumbers, onBrailleInput }) {
    return (
        <View style={AppStyles.keyboard}>
            {/* Top Row */}
            <View style={AppStyles.topRow}>
                {['⠟', '⠺', '⠑', '⠗', '⠞', '⠽', '⠥', '⠊', '⠕', '⠏'].map((char, index) => (
                    <BrailleKey key={index} label={char} onPress={() => onKeyPress(char)} style={AppStyles.key} />
                ))}
            </View>

            {/* Second Row */}
            <View style={AppStyles.secondRow}>
                {['⠁', '⠎', '⠙', '⠋', '⠛', '⠓', '⠚', '⠅', '⠇'].map((char, index) => (
                    <BrailleKey key={index} label={char} onPress={() => onKeyPress(char)} style={AppStyles.key} />
                ))}
            </View>

            {/* Third Row */}
            <View style={AppStyles.thirdRow}>
                <BrailleKey label="⠿" onPress={onBrailleInput} style={AppStyles.functionKey} />
                {['⠵', '⠭', '⠉', '⠧', '⠃', '⠝', '⠍'].map((char, index) => (
                    <BrailleKey key={index} label={char} onPress={() => onKeyPress(char)} style={AppStyles.key} />
                ))}
                <BrailleKey label="⌫" onPress={onDelete} style={AppStyles.functionKey} />
            </View>

            {/* Fourth Row */}
            <View style={AppStyles.functionRow}>
                <BrailleKey label="⠼" onPress={onNumbers} style={AppStyles.key} />
                <BrailleKey label="😊" onPress={onEmoji} style={AppStyles.key} />
                <BrailleKey label="Space" onPress={() => onKeyPress(' ')} style={AppStyles.spacebar} />
                <BrailleKey label="Enter" onPress={onEnter} style={AppStyles.enterKey} />
            </View>
        </View>
    );
}

















