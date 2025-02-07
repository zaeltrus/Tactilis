// App.js
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Vibration,
    Platform,
    StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import AppStyles from './styles/AppStyles';
import Keyboard from './components/Keyboard';
import RadialBackground from './components/RadialBackground';

export default function App() {
    // Normal chat mode states
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    // Braille mode states
    const [isBrailleMode, setIsBrailleMode] = useState(false);
    const [selectedDots, setSelectedDots] = useState([]);
    const [previewLetter, setPreviewLetter] = useState('');
    const [finalText, setFinalText] = useState('');

    // High Contrast Theme state
    const [isHighContrast, setIsHighContrast] = useState(false);
    const toggleHighContrast = () => {
        setIsHighContrast((prev) => !prev);
    };

    // Expanded Braille mapping for A–Z.
    const brailleMapping = {
        '1': 'A',
        '12': 'B',
        '14': 'C',
        '145': 'D',
        '15': 'E',
        '124': 'F',
        '1245': 'G',
        '125': 'H',
        '24': 'I',
        '245': 'J',
        '13': 'K',
        '123': 'L',
        '134': 'M',
        '1345': 'N',
        '135': 'O',
        '1234': 'P',
        '12345': 'Q',
        '1235': 'R',
        '234': 'S',
        '2345': 'T',
        '136': 'U',
        '1236': 'V',
        '2456': 'W',
        '1346': 'X',
        '13456': 'Y',
        '1356': 'Z',
    };

    // Morse code mapping for A–Z.
    const morseMapping = {
        A: ".-",
        B: "-...",
        C: "-.-.",
        D: "-..",
        E: ".",
        F: "..-.",
        G: "--.",
        H: "....",
        I: "..",
        J: ".---",
        K: "-.-",
        L: ".-..",
        M: "--",
        N: "-.",
        O: "---",
        P: ".--.",
        Q: "--.-",
        R: ".-.",
        S: "...",
        T: "-",
        U: "..-",
        V: "...-",
        W: ".--",
        X: "-..-",
        Y: "-.--",
        Z: "--.."
    };

    // Helper function to play Morse vibration pattern for a given letter.
    const playMorse = (letter) => {
        const code = morseMapping[letter.toUpperCase()];
        if (!code) return;
        const dotDuration = 100;  // Duration (ms) for a dot impact
        const dashDuration = 300; // Duration (ms) for a dash impact
        const gap = 100;          // Gap (ms) between symbols
        const extraDelay = 200;   // Extra delay for consecutive dots

        if (Platform.OS === 'android') {
            let pattern = [0];
            for (let i = 0; i < code.length; i++) {
                pattern.push(code[i] === '.' ? dotDuration : dashDuration);
                if (i < code.length - 1) {
                    pattern.push(gap);
                }
            }
            console.log(`Android Morse pattern for ${letter}:`, pattern);
            Vibration.vibrate(pattern);
        } else {
            const playSymbol = async (index) => {
                if (index >= code.length) return;
                const symbol = code[index];
                let delay = 0;
                if (symbol === '.') {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    delay = dotDuration;
                } else if (symbol === '-') {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    delay = dashDuration;
                }
                if (symbol === '.' && index < code.length - 1 && code[index + 1] === '.') {
                    delay += extraDelay;
                }
                setTimeout(() => {
                    playSymbol(index + 1);
                }, delay + gap);
            };
            playSymbol(0);
        }
    };

    // Normal chat mode handlers.
    const handleSend = () => {
        if (message.trim()) {
            const newMsg = { id: Date.now().toString(), text: message, sent: true };
            setChatMessages([newMsg, ...chatMessages]);
            setMessage('');
        }
    };

    const handleKeyPress = (key) => setMessage((prev) => prev + key);
    const handleDelete = () => setMessage((prev) => prev.slice(0, -1));
    const handleEnter = () => handleSend();
    const handleNumbers = () => {};
    const handleEmoji = () => {};

    // Toggle between chat mode and full-screen Braille mode.
    const handleBrailleInputToggle = () => {
        setIsBrailleMode((prev) => !prev);
        setSelectedDots([]);
        setPreviewLetter('');
        setFinalText('');
    };

    const handleKeyboardSelect = () => {};
    const handleMicPress = () => {};

    // Braille mode functions.
    const handleDotPress = (dot) => {
        let newDots = [...selectedDots];
        if (newDots.includes(dot)) {
            newDots = newDots.filter((d) => d !== dot);
        } else {
            newDots.push(dot);
        }
        newDots.sort();
        setSelectedDots(newDots);
        setPreviewLetter(brailleMapping[newDots.join('')] || '?');
    };

    const handleAccept = () => {
        if (previewLetter && previewLetter !== '?') {
            setFinalText((prev) => prev + previewLetter);
            playMorse(previewLetter);
            setSelectedDots([]);
            setPreviewLetter('');
        }
    };

    const handleBrailleDelete = () => {
        setSelectedDots([]);
        setPreviewLetter('');
    };

    const handleBrailleSend = () => {
        if (finalText.trim()) {
            const newMsg = { id: Date.now().toString(), text: finalText, sent: true };
            setChatMessages([newMsg, ...chatMessages]);
            setFinalText('');
            setIsBrailleMode(false);
        }
    };

    // For non–high contrast mode, we want to use RadialBackground.
    // For high contrast mode, we wrap content in an absolutely positioned container with a yellow border.
    const highContrastContainerStyle = {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: '#FFFF00',
        borderRadius: 65, // adjusted per your preference
        overflow: 'hidden',
    };

    const normalContainerStyle = AppStyles.container;

    // Render normal chat mode.
    const renderChatMode = () => (
        <>
            <View style={AppStyles.header}>
                <Text style={[AppStyles.headerText, isHighContrast && { color: '#FFFF00' }]}>
                    {/* (Optional header text) */}
                </Text>
            </View>
            <View style={AppStyles.contentContainer}>
                <View style={AppStyles.chatContainer}>
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    AppStyles.messageBubble,
                                    item.sent ? AppStyles.sentMessage : AppStyles.receivedMessage,
                                    isHighContrast && {
                                        backgroundColor: '#000000',
                                        borderColor: '#FFFF00',
                                        borderWidth: 1,
                                    },
                                ]}
                            >
                                <Text style={[AppStyles.messageText, isHighContrast && { color: '#FFFF00' }]}>
                                    {item.text}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        inverted
                    />
                </View>
                <View style={AppStyles.inputContainer}>
                    <TextInput
                        style={[
                            AppStyles.input,
                            isHighContrast && { backgroundColor: '#222222', color: '#FFFF00' },
                        ]}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message"
                        placeholderTextColor={isHighContrast ? '#FFFF00' : '#888'}
                    />
                    <TouchableOpacity
                        style={[
                            AppStyles.sendButton,
                            isHighContrast && { backgroundColor: '#FFFF00' },
                        ]}
                        onPress={handleSend}
                    >
                        <Text style={[AppStyles.sendButtonText, isHighContrast && { color: '#000000' }]}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Keyboard
                onKeyPress={handleKeyPress}
                onDelete={handleDelete}
                onEnter={handleEnter}
                onEmoji={handleEmoji}
                onNumbers={handleNumbers}
                onBrailleInput={handleBrailleInputToggle}
                onKeyboardSelect={handleKeyboardSelect}
                onMicPress={handleMicPress}
                onThemeToggle={toggleHighContrast}
                isHighContrast={isHighContrast}
            />
        </>
    );

    // Render full-screen Braille input mode.
    const renderBrailleMode = () => (
        <SafeAreaView style={{ flex: 1, backgroundColor: isHighContrast ? '#222222' : 'transparent' }}>
            <View style={AppStyles.brailleHeader}>
                <TouchableOpacity onPress={handleBrailleInputToggle}>
                    <Text style={[AppStyles.brailleHeaderText, isHighContrast && { color: '#FFFF00' }]}>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={AppStyles.brailleContent}>
                {/* Braille Grid */}
                <View style={AppStyles.brailleGrid}>
                    <View style={AppStyles.brailleColumn}>
                        {[1, 2, 3].map((dot) => {
                            const dotStyleOverride = isHighContrast
                                ? {
                                    backgroundColor: selectedDots.includes(dot.toString())
                                        ? '#FFFF00'
                                        : '#222222',
                                    borderColor: '#FFFF00',
                                    borderWidth: 1,
                                }
                                : {};
                            return (
                                <TouchableOpacity
                                    key={`col1-${dot}`}
                                    style={[AppStyles.dot, dotStyleOverride]}
                                    onPress={() => handleDotPress(dot.toString())}
                                />
                            );
                        })}
                    </View>
                    <View style={AppStyles.brailleColumn}>
                        {[4, 5, 6].map((dot) => {
                            const dotStyleOverride = isHighContrast
                                ? {
                                    backgroundColor: selectedDots.includes(dot.toString())
                                        ? '#FFFF00'
                                        : '#222222',
                                    borderColor: '#FFFF00',
                                    borderWidth: 1,
                                }
                                : {};
                            return (
                                <TouchableOpacity
                                    key={`col2-${dot}`}
                                    style={[AppStyles.dot, dotStyleOverride]}
                                    onPress={() => handleDotPress(dot.toString())}
                                />
                            );
                        })}
                    </View>
                </View>

                {/* Preview Area */}
                <View
                    style={[
                        AppStyles.previewArea,
                        isHighContrast && { backgroundColor: '#222222', borderColor: '#FFFF00', borderWidth: 1 },
                    ]}
                >
                    <Text style={[AppStyles.previewText, isHighContrast && { color: '#FFFF00' }]}>
                        {previewLetter}
                    </Text>
                </View>

                {/* Translation Area */}
                <View
                    style={[
                        AppStyles.translationArea,
                        isHighContrast && { backgroundColor: '#222222', borderColor: '#FFFF00', borderWidth: 1 },
                    ]}
                >
                    <Text style={[AppStyles.translationText, isHighContrast && { color: '#FFFF00' }]}>
                        {finalText}
                    </Text>
                </View>
            </View>

            {/* Bottom Control Buttons */}
            <View style={AppStyles.bottomButtonsContainer}>
                <TouchableOpacity onPress={handleBrailleDelete} style={AppStyles.deleteButton}>
                    <Text style={AppStyles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAccept} style={AppStyles.acceptButton}>
                    <Text style={AppStyles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleBrailleSend}
                    style={[
                        AppStyles.sendButtonBraille,
                        isHighContrast && { backgroundColor: '#FFFF00' },
                    ]}
                >
                    <Text style={[AppStyles.acceptText, isHighContrast && { color: '#000000' }]}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    return (
        <>
            <StatusBar
                style={isHighContrast ? 'dark' : 'auto'}
                backgroundColor={isHighContrast ? '#FFFF00' : undefined}
            />
            {isHighContrast ? (
                <View style={highContrastContainerStyle}>
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#222222' }}>
                        {isBrailleMode ? renderBrailleMode() : renderChatMode()}
                    </SafeAreaView>
                </View>
            ) : (
                <RadialBackground>
                    <SafeAreaView style={normalContainerStyle}>
                        {isBrailleMode ? renderBrailleMode() : renderChatMode()}
                    </SafeAreaView>
                </RadialBackground>
            )}
        </>
    );
}
