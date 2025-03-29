import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GradientButton from './GradientButton';
import { Ionicons } from '@expo/vector-icons';

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

    // When a dot is pressed, toggle its selection and update the preview.
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

    // Local handler for Accept: call onAccept with previewLetter, then clear selection.
    const handleAcceptPress = () => {
        if (previewLetter) {
            onAccept(previewLetter);
            setSelectedDots([]);
            setPreviewLetter('');
        }
    };

    // Local handler for Delete: call onDelete, then clear selection.
    const handleDeletePress = () => {
        onDelete();
        setSelectedDots([]);
        setPreviewLetter('');
    };

    // In high contrast mode, we use specific colors; otherwise (normal mode) let the button use its default gradient.
    const backButtonColors = isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined;
    const deleteButtonColors = isHighContrast ? ['#E74C3C', '#E74C3C'] : undefined;
    const sendButtonColors = isHighContrast ? ['#007AFF', '#007AFF'] : undefined;
    const acceptButtonColors = isHighContrast ? ['#27AE60', '#27AE60'] : undefined;

    // Container background now matches the input area: "#2E2E3A" in normal mode, "#333333" in high contrast.
    return (
        <View style={{ padding: 5, backgroundColor: isHighContrast ? '#333333' : '#2E2E3A' }}>
            {/* Top Row: Centered row with preview square and braille dots */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, justifyContent: 'center' }}>
                {/* Preview Square enlarged to 135x135, centered */}
                <View style={{
                    width: 135,
                    height: 135,
                    borderWidth: 2,
                    borderColor: isHighContrast ? '#FFFF00' : '#7435FD',
                    backgroundColor: isHighContrast ? '#333333' : '#2E2E3A',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 20,
                }}>
                    <Text style={{ fontSize: 40, color: isHighContrast ? '#FFFF00' : '#C381E7' }}>
                        {previewLetter}
                    </Text>
                </View>
                {/* Braille Grid: Two columns of dots */}
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', marginRight: 10 }}>
                        {["1", "2", "3"].map(dot => (
                            <TouchableOpacity
                                key={`mini-dot-left-${dot}`}
                                onPress={() => handleDotPress(dot)}
                                style={[{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    borderWidth: 3,
                                    borderColor: isHighContrast ? '#FFFF00' : '#7435FD',
                                    backgroundColor: '#555555',
                                    margin: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                    // Additional style if selected
                                    (selectedDots.includes(dot.toString())
                                        ? (isHighContrast
                                            ? { backgroundColor: '#FFFF00', borderColor: '#FFFF00', borderWidth: 1 }
                                            : { backgroundColor: '#C381E7' })
                                        : {})]}
                                accessibilityLabel={`Mini Braille dot ${dot}`}
                                accessibilityHint={`Toggles mini Braille dot ${dot}`}
                            />
                        ))}
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        {["4", "5", "6"].map(dot => (
                            <TouchableOpacity
                                key={`mini-dot-right-${dot}`}
                                onPress={() => handleDotPress(dot)}
                                style={[{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 25,
                                    borderWidth: 3,
                                    borderColor: isHighContrast ? '#FFFF00' : '#7435FD',
                                    backgroundColor: '#555555',
                                    margin: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                    (selectedDots.includes(dot.toString())
                                        ? (isHighContrast
                                            ? { backgroundColor: '#FFFF00', borderColor: '#FFFF00', borderWidth: 1 }
                                            : { backgroundColor: '#C381E7' })
                                        : {})]}
                                accessibilityLabel={`Mini Braille dot ${dot}`}
                                accessibilityHint={`Toggles mini Braille dot ${dot}`}
                            />
                        ))}
                    </View>
                </View>
            </View>
            {/* Bottom Row: Control Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <GradientButton
                    onPress={onExit}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Back"
                    accessibilityHint="Return to the default Braille keyboard"
                    colors={backButtonColors}
                >
                    <Ionicons name="return-up-back-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
                <GradientButton
                    onPress={handleDeletePress}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Delete"
                    accessibilityHint="Clears the current Braille selection"
                    colors={deleteButtonColors}
                >
                    <Ionicons name="backspace-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
                <GradientButton
                    onPress={onSend}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Send"
                    accessibilityHint="Sends the current message"
                    colors={sendButtonColors}
                >
                    <Ionicons name="send-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
                <GradientButton
                    onPress={handleAcceptPress}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Accept"
                    accessibilityHint="Accepts the current Braille input"
                    colors={acceptButtonColors}
                >
                    <Ionicons name="checkmark-circle-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
            </View>
        </View>
    );
}