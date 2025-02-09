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
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AppStyles from './styles/AppStyles';
import Keyboard from './components/Keyboard';
import RadialBackground from './components/RadialBackground';
import GradientButton from './components/GradientButton';

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
    const toggleHighContrast = () => setIsHighContrast((prev) => !prev);

    // Auditory Feedback and Haptic Feedback state
    const [hapticFeedbackEnabled, setHapticFeedbackEnabled] = useState(true);
    const toggleHapticFeedback = () => setHapticFeedbackEnabled((prev) => !prev);

    // New handler for space input
    const handleSpace = () => setFinalText((prev) => prev + ' ');

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
        A: '.-',
        B: '-...',
        C: '-.-.',
        D: '-..',
        E: '.',
        F: '..-.',
        G: '--.',
        H: '....',
        I: '..',
        J: '.---',
        K: '-.-',
        L: '.-..',
        M: '--',
        N: '-.',
        O: '---',
        P: '.--.',
        Q: '--.-',
        R: '.-.',
        S: '...',
        T: '-',
        U: '..-',
        V: '...-',
        W: '.--',
        X: '-..-',
        Y: '-.--',
        Z: '--..',
    };

    // Helper function to play Morse vibration pattern for a given letter.
    const playMorse = (letter) => {
        const code = morseMapping[letter.toUpperCase()];
        if (!code) return;
        const dotDuration = 100;
        const dashDuration = 300;
        const gap = 100;
        const extraDelay = 200;

        if (Platform.OS === 'android') {
            let pattern = [0];
            for (let i = 0; i < code.length; i++) {
                pattern.push(code[i] === '.' ? dotDuration : dashDuration);
                if (i < code.length - 1) {
                    pattern.push(gap);
                }
            }
            Vibration.vibrate(pattern);
        } else {
            const playSymbol = async (index) => {
                if (index >= code.length) return;
                const symbol = code[index];
                let delay = 0;
                if (symbol === '.') {
                    if (hapticFeedbackEnabled) {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    delay = dotDuration;
                } else if (symbol === '-') {
                    if (hapticFeedbackEnabled) {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    }
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

    // For normal mode, when a dot is selected, fill it with a color; in high contrast mode, use gray background.
    const getDotStyle = (dot) => {
        if (isHighContrast) {
            return {
                backgroundColor: selectedDots.includes(dot.toString()) ? '#FFFF00' : '#222222',
                borderColor: '#FFFF00',
                borderWidth: 1,
            };
        } else {
            return selectedDots.includes(dot.toString())
                ? { backgroundColor: '#C381E7' }
                : {};
        }
    };

    // In high contrast mode, use an outer container with a full-screen yellow border and rounded corners.
    const highContrastContainerStyle = {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#222222',
        borderWidth: 2,
        borderColor: '#FFFF00',
        borderRadius: 65,
        overflow: 'hidden',
    };

    const normalContainerStyle = AppStyles.container;

    // Render normal chat mode.
    const renderChatMode = () => (
        <>
            <View
                style={AppStyles.header}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel="Chat Header"
            >
                <Text style={[AppStyles.headerText, isHighContrast && { color: '#FFFF00' }]}>
                    {/* Optional header text */}
                </Text>
            </View>
            <View style={AppStyles.contentContainer}>
                <View style={AppStyles.chatContainer}>
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <LinearGradient
                                colors={
                                    isHighContrast ? ['#FFFF00', '#FFFF00'] : ['#7435FD', '#C381E7']
                                }
                                style={[
                                    AppStyles.messageBubble,
                                    item.sent ? AppStyles.sentMessage : AppStyles.receivedMessage,
                                    isHighContrast && { borderColor: '#FFFF00', borderWidth: 1 },
                                ]}
                                accessible={true}
                                accessibilityRole="text"
                                accessibilityLabel={`Message: ${item.text}`}
                            >
                                <Text style={[AppStyles.messageText, isHighContrast && { color: '#000000' }]}>
                                    {item.text}
                                </Text>
                            </LinearGradient>
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
                        accessible={true}
                        accessibilityRole="text"
                        accessibilityLabel="Message input"
                        accessibilityHint="Type your message here"
                    />
                    <GradientButton
                        onPress={handleSend}
                        style={[
                            AppStyles.sendButton,
                            isHighContrast && { backgroundColor: '#FFFF00' },
                        ]}
                        colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                        textStyle={isHighContrast ? { color: '#000000' } : undefined}
                        noPadding={true}
                        accessibilityLabel="Send message"
                        accessibilityHint="Sends your message"
                    >
                        Send
                    </GradientButton>
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
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: 'transparent',
                }}
            >
                {/* Back Button */}
                <TouchableOpacity
                    onPress={handleBrailleInputToggle}
                    style={{ padding: 10 }}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Back"
                    accessibilityHint="Return to chat mode"
                >
                    <Ionicons
                        name="arrow-back-outline"
                        size={28}
                        color={isHighContrast ? '#FFFF00' : '#FFFFFF'}
                    />
                </TouchableOpacity>

                {/* Centered Haptic Toggle as a Gradient Button */}
                {(() => {
                    let hapticButtonStyle, hapticButtonColors, hapticButtonTextStyle;
                    if (isHighContrast) {
                        if (hapticFeedbackEnabled) {
                            hapticButtonStyle = { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 };
                            hapticButtonColors = ['#FFFF00', '#FFFF00'];
                            hapticButtonTextStyle = { color: '#000000', fontSize: 16, fontWeight: 'bold' };
                        } else {
                            hapticButtonStyle = {
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#FFFF00',
                            };
                            hapticButtonColors = ['transparent', 'transparent'];
                            hapticButtonTextStyle = { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' };
                        }
                    } else {
                        if (hapticFeedbackEnabled) {
                            hapticButtonStyle = { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 };
                            hapticButtonColors = ['#7435FD', '#C381E7'];
                            hapticButtonTextStyle = { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' };
                        } else {
                            hapticButtonStyle = {
                                paddingVertical: 12,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#7435FD',
                            };
                            hapticButtonColors = ['transparent', 'transparent'];
                            hapticButtonTextStyle = { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' };
                        }
                    }
                    return (
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <GradientButton
                                onPress={toggleHapticFeedback}
                                style={hapticButtonStyle}
                                colors={hapticButtonColors}
                                textStyle={hapticButtonTextStyle}
                                noPadding={true}
                                accessibilityLabel="Toggle haptic feedback"
                                accessibilityHint="Switch haptic feedback on or off"
                            >
                                {hapticFeedbackEnabled ? 'Haptic mode: On' : 'Haptic mode: Off'}
                            </GradientButton>
                        </View>
                    );
                })()}

                {/* Right Placeholder for Balanced Layout */}
                <View style={{ width: 40 }} />
            </View>
            <View style={AppStyles.brailleContent}>
                {/* Braille Grid */}
                <View style={AppStyles.brailleGrid}>
                    <View style={AppStyles.brailleColumn}>
                        {[1, 2, 3].map((dot) => (
                            <TouchableOpacity
                                key={`col1-${dot}`}
                                style={[AppStyles.dot, getDotStyle(dot)]}
                                onPress={() => handleDotPress(dot.toString())}
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityLabel={`Braille dot ${dot}`}
                                accessibilityHint={`Toggles dot ${dot}`}
                            />
                        ))}
                    </View>
                    <View style={AppStyles.brailleColumn}>
                        {[4, 5, 6].map((dot) => (
                            <TouchableOpacity
                                key={`col2-${dot}`}
                                style={[AppStyles.dot, getDotStyle(dot)]}
                                onPress={() => handleDotPress(dot.toString())}
                                accessible={true}
                                accessibilityRole="button"
                                accessibilityLabel={`Braille dot ${dot}`}
                                accessibilityHint={`Toggles dot ${dot}`}
                            />
                        ))}
                    </View>
                </View>

                {/* Preview Area with Read Out Loud Button */}
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                    <View
                        style={[
                            AppStyles.previewArea,
                            isHighContrast && { backgroundColor: '#222222', borderColor: '#FFFF00', borderWidth: 1 },
                            { flex: 1 },
                        ]}
                        accessible={true}
                        accessibilityRole="text"
                        accessibilityLabel="Preview letter"
                    >
                        <Text style={[AppStyles.previewText, isHighContrast && { color: '#FFFF00' }]}>
                            {previewLetter}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (previewLetter && previewLetter !== '?') {
                                Speech.speak(previewLetter);
                            }
                        }}
                        style={{ marginLeft: 10 }}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Speak preview letter"
                        accessibilityHint="Plays the preview letter using text-to-speech"
                    >
                        <Ionicons
                            name="volume-high-outline"
                            size={24}
                            color={isHighContrast ? '#FFFF00' : '#FFFFFF'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Translation Area with Read Out Loud Button */}
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                    <View
                        style={[
                            AppStyles.translationArea,
                            isHighContrast && { backgroundColor: '#222222', borderColor: '#FFFF00', borderWidth: 1 },
                            { flex: 1 },
                        ]}
                        accessible={true}
                        accessibilityRole="text"
                        accessibilityLabel="Final text"
                    >
                        <Text style={[AppStyles.translationText, isHighContrast && { color: '#FFFF00' }]}>
                            {finalText}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (finalText && finalText.trim() !== '') {
                                Speech.speak(finalText);
                            }
                        }}
                        style={{ marginLeft: 10 }}
                        accessible={true}
                        accessibilityRole="button"
                        accessibilityLabel="Speak final text"
                        accessibilityHint="Plays the final text using text-to-speech"
                    >
                        <Ionicons
                            name="volume-high-outline"
                            size={24}
                            color={isHighContrast ? '#FFFF00' : '#FFFFFF'}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Control Buttons (Delete, Space, Accept, Send) */}
            <View style={[AppStyles.bottomButtonsContainer, { marginBottom: 20 }]}>
                <TouchableOpacity
                    onPress={handleBrailleDelete}
                    style={AppStyles.deleteButton}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Delete"
                    accessibilityHint="Clears the current Braille dot selection"
                >
                    <Text style={AppStyles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSpace}
                    style={AppStyles.spaceButton}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Space"
                    accessibilityHint="Inserts a space"
                >
                    <Text style={AppStyles.spaceButtonText}>Space</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleAccept}
                    style={AppStyles.acceptButton}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Accept"
                    accessibilityHint="Accepts the previewed letter"
                >
                    <Text style={AppStyles.acceptText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleBrailleSend}
                    style={[
                        AppStyles.sendButtonBraille,
                        isHighContrast && { backgroundColor: '#FFFF00' },
                    ]}
                    accessible={true}
                    accessibilityRole="button"
                    accessibilityLabel="Send message"
                    accessibilityHint="Sends the final text as a message"
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
                    <SafeAreaView style={{ flex: 1 }}>
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
