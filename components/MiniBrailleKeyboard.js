// MiniBrailleKeyboard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GradientButton from './GradientButton';
import { Ionicons } from '@expo/vector-icons';
import AppStyles from '../styles/AppStyles';

export default function MiniBrailleKeyboard({ onAccept, onDelete, onSend, onExit, isHighContrast }) {
    const [selectedDots, setSelectedDots] = useState([]);
    const [previewLetter, setPreviewLetter] = useState('');

    // Mapping for Braille dot combinations
    const brailleMapping = {
        '1': 'A', '12': 'B', '14': 'C', '145': 'D', '15': 'E',
        '124': 'F', '1245': 'G', '125': 'H', '24': 'I', '245': 'J',
        '13': 'K', '123': 'L', '134': 'M', '1345': 'N', '135': 'O',
        '1234': 'P', '12345': 'Q', '1235': 'R', '234': 'S', '2345': 'T',
        '136': 'U', '1236': 'V', '2456': 'W', '1346': 'X', '13456': 'Y',
        '1356': 'Z',
    };

    const handleDotPress = (dot) => {
        let newDots = [...selectedDots];
        if (newDots.includes(dot)) {
            newDots = newDots.filter(d => d !== dot);
        } else {
            newDots.push(dot);
        }
        newDots.sort();
        setSelectedDots(newDots);
        const keyCombo = newDots.join('');
        setPreviewLetter(brailleMapping[keyCombo] || '');
    };

    const handleAcceptPress = () => {
        if (previewLetter) {
            onAccept(previewLetter);
            setSelectedDots([]);
            setPreviewLetter('');
        }
    };

    const handleDeletePress = () => {
        onDelete();
        setSelectedDots([]);
        setPreviewLetter('');
    };

    return (
        <View style={{ padding: 5, backgroundColor: '#2E2E3A' }}>
            {/* Top: Preview Box and Control Buttons */}
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                {/* Preview Box */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: isHighContrast ? '#FFFF00' : '#7435FD', backgroundColor: '#27293D', marginRight: 5, padding: 5 }}>
                    <Text style={{ fontSize: 36, color: isHighContrast ? '#FFFF00' : '#C381E7' }}>{previewLetter}</Text>
                </View>
                {/* Control Buttons */}
                <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <GradientButton
                        onPress={handleDeletePress}
                        style={{ marginBottom: 5 }}
                        accessibilityLabel="Delete"
                        accessibilityHint="Clears the current mini Braille selection"
                    >
                        <Ionicons name="backspace-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                    </GradientButton>
                    <GradientButton
                        onPress={handleAcceptPress}
                        style={{ marginBottom: 5 }}
                        accessibilityLabel="Accept"
                        accessibilityHint="Accepts the current mini Braille input"
                    >
                        <Ionicons name="checkmark-circle-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                    </GradientButton>
                    <GradientButton
                        onPress={onSend}
                        style={{ marginBottom: 5 }}
                        accessibilityLabel="Send"
                        accessibilityHint="Sends the current message"
                    >
                        <Ionicons name="send-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                    </GradientButton>
                    <GradientButton
                        onPress={onExit}
                        accessibilityLabel="Exit mini mode"
                        accessibilityHint="Return to the default keyboard"
                    >
                        <Ionicons name="return-up-back-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                    </GradientButton>
                </View>
            </View>
            {/* Bottom: Mini Braille Grid arranged in 2 rows of 3 keys */}
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {["1", "2", "3"].map(dot => (
                        <TouchableOpacity
                            key={`mini-${dot}`}
                            onPress={() => handleDotPress(dot)}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                borderWidth: 3,
                                borderColor: '#7435FD',
                                backgroundColor: '#000802',
                                margin: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            accessibilityLabel={`Mini Braille dot ${dot}`}
                            accessibilityHint={`Toggles mini Braille dot ${dot}`}
                        >
                            <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{dot}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {["4", "5", "6"].map(dot => (
                        <TouchableOpacity
                            key={`mini-${dot}`}
                            onPress={() => handleDotPress(dot)}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                borderWidth: 3,
                                borderColor: '#7435FD',
                                backgroundColor: '#000802',
                                margin: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            accessibilityLabel={`Mini Braille dot ${dot}`}
                            accessibilityHint={`Toggles mini Braille dot ${dot}`}
                        >
                            <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{dot}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}
