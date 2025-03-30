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

// Custom styles and components
import AppStyles from './styles/AppStyles';
import Keyboard from './components/Keyboard';
import NumericKeyboard from './components/NumericKeyboard';
import MiniBrailleKeyboard from './components/MiniBrailleKeyboard';
import RadialBackground from './components/RadialBackground';
import GradientButton from './components/GradientButton';
import BrailleKey from './components/BrailleKey';

export default function App() {
    // ==================== Chat and Braille States ====================
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [isBrailleMode, setIsBrailleMode] = useState(false);
    const [selectedDots, setSelectedDots] = useState([]);
    const [previewLetter, setPreviewLetter] = useState('');
    const [finalText, setFinalText] = useState('');

    // ==================== Appearance and Feedback States ====================
    const [isHighContrast, setIsHighContrast] = useState(false);
    const toggleHighContrast = () => setIsHighContrast(prev => !prev);

    const [hapticFeedbackEnabled, setHapticFeedbackEnabled] = useState(true);
    const toggleHapticFeedback = () => setHapticFeedbackEnabled(prev => !prev);

    // ==================== Keyboard Mode State ====================
    // Modes: "default" (full keyboard), "numeric", and "mini" (mini Braille)
    const [keyboardMode, setKeyboardMode] = useState('default');
    const toggleNumericKeyboard = () =>
        setKeyboardMode(prev => (prev === 'default' ? 'numeric' : 'default'));
    const toggleMiniBraille = () =>
        setKeyboardMode(prev => (prev === 'default' ? 'mini' : 'default'));

    // ==================== Dual Layout State ====================
    // Controls whether the default keyboard shows braille-only or braille+Latin.
    const [isDualLayout, setIsDualLayout] = useState(false);
    const handleKeyboardSelect = () => setIsDualLayout(prev => !prev);

    // ==================== Mappings ====================
    const brailleMapping = {
        '1': 'A', '12': 'B', '14': 'C', '145': 'D', '15': 'E',
        '124': 'F', '1245': 'G', '125': 'H', '24': 'I', '245': 'J',
        '13': 'K', '123': 'L', '134': 'M', '1345': 'N', '135': 'O',
        '1234': 'P', '12345': 'Q', '1235': 'R', '234': 'S', '2345': 'T',
        '136': 'U', '1236': 'V', '2456': 'W', '1346': 'X', '13456': 'Y',
        '1356': 'Z',
    };

    const morseMapping = {
        A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.',
        F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
        K: '-.-', L: '.-..', M: '--', N: '-.', O: '---',
        P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
        U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--',
        Z: '--..',
    };

    // ==================== Braille to Latin Conversion ====================
    const brailleToLatin = {
        '⠟': 'Q', '⠺': 'W', '⠑': 'E', '⠗': 'R', '⠞': 'T',
        '⠽': 'Y', '⠥': 'U', '⠊': 'I', '⠕': 'O', '⠏': 'P',
        '⠁': 'A', '⠎': 'S', '⠙': 'D', '⠋': 'F', '⠛': 'G',
        '⠓': 'H', '⠚': 'J', '⠅': 'K', '⠇': 'L', '⠵': 'Z',
        '⠭': 'X', '⠉': 'C', '⠧': 'V', '⠃': 'B', '⠝': 'N',
        '⠍': 'M'
    };
    const convertBrailleToLatin = (text) =>
        text.split('').map(char => brailleToLatin[char] || char).join('');


    // ==================== Haptic Feedback Functions ====================

    // Plays Morse code vibration for a single letter
    const playMorse = (letter) => {
        const code = morseMapping[letter.toUpperCase()];
        if (!code) return;
        const dotDuration = 100, dashDuration = 300, gap = 100, extraDelay = 200;
        if (Platform.OS === 'android') {
            let pattern = [0]; // Initial pause
            for (let i = 0; i < code.length; i++) {
                pattern.push(code[i] === '.' ? dotDuration : dashDuration);
                if (i < code.length - 1) pattern.push(gap); // add gap after each symbol except the last
            }
            Vibration.vibrate(pattern);
        } else {
            // Recursive function to play Morse on iOS
            const playSymbol = async (index) => {
                if (index >= code.length) return;
                const symbol = code[index];
                let delay = symbol === '.' ? dotDuration : dashDuration;
                if (hapticFeedbackEnabled) {
                    await Haptics.impactAsync(
                        symbol === '.' ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Heavy
                    );
                }
                // Add extra delay if two dots are sequential
                if (symbol === '.' && index < code.length - 1 && code[index + 1] === '.') {
                    delay += extraDelay;
                }
                setTimeout(() => playSymbol(index + 1), delay + gap);
            };
            playSymbol(0);
        }
    };

    // Plays Morse code vibrations sequentially for entire text
    const playMorseForText = (text) => {
        const convertedText = convertBrailleToLatin(text);
        let delay = 0;
        const letterDelay = 500;
        for (let i = 0; i < convertedText.length; i++) {
            const char = convertedText[i];
            if (/[A-Za-z]/.test(char)) {
                setTimeout(() => {
                    console.log(`Playing Morse for: ${char}`);
                    playMorse(char);
                }, delay);
                delay += letterDelay;
            }
        }
    };

    // Speaks out the text (for preview and final text)
    const speakPreview = (text) => {
        const convertedText = convertBrailleToLatin(text);
        if (convertedText && convertedText.trim() !== '') {
            console.log(`Speaking text: ${convertedText}`);
            Speech.speak(convertedText);
        }
    };

    // ==================== Chat Handlers ====================

    // Sends current message and resets input field
    const handleSend = () => {
        if (message.trim()) {
            const newMsg = { id: Date.now().toString(), text: message, sent: true };
            setChatMessages([newMsg, ...chatMessages]);
            setMessage('');
        }
    };

    // Adds pressed key to the current message
    const handleKeyPress = (key) => setMessage(prev => prev + key);

    // Deletes the last character from the message
    const handleDelete = () => setMessage(prev => prev.slice(0, -1));

    // Submits the current message
    const handleEnter = () => handleSend();

    // Placeholder for emoji input (future implementation)
    const handleEmoji = () => {};

    // Toggles full-screen Braille input mode
    const handleBrailleInputToggle = () => {
        setIsBrailleMode(prev => !prev);
        setSelectedDots([]);
        setPreviewLetter('');
        setFinalText('');
    };

    // Placeholder for microphone input (future implementation)
    const handleMicPress = () => {};

    // ==================== Braille Mode Functions (Full Screen) ====================

    // Manages dot selection/deselection and updates letter preview
    const handleDotPress = (dot) => {
        let newDots = [...selectedDots];
        if (newDots.includes(dot)) {
            newDots = newDots.filter(d => d !== dot);
        } else {
            newDots.push(dot);
        }
        newDots.sort();
        setSelectedDots(newDots);
        setPreviewLetter(brailleMapping[newDots.join('')] || '?');
    };

    // Accepts currently previewed letter, adds to final text, triggers Morse feedback
    const handleAccept = () => {
        if (previewLetter && previewLetter !== '?') {
            setFinalText(prev => prev + previewLetter);
            playMorse(previewLetter);
            setSelectedDots([]);
            setPreviewLetter('');
        }
    };

    // Clears Braille selection and preview letter
    const handleBrailleDelete = () => {
        setSelectedDots([]);
        setPreviewLetter('');
    };

    // Sends accumulated final Braille text to chat
    const handleBrailleSend = () => {
        if (finalText.trim()) {
            const newMsg = { id: Date.now().toString(), text: finalText, sent: true };
            setChatMessages([newMsg, ...chatMessages]);
            setFinalText('');
            setIsBrailleMode(false);
        }
    };

    // Returns dynamic style for Braille dots based on selection & contrast mode
    const getDotStyle = (dot) => {
        const isSelected = selectedDots.includes(dot.toString());
        if (isHighContrast) {
            return {
                backgroundColor: isSelected ? '#FFFF00' : '#222222',
                borderColor: '#FFFF00',
                borderWidth: 1,
            };
        } else {
            return isSelected ? { backgroundColor: '#C381E7' } : {};
        }
    };

    // ==================== Containers ====================
    const highContrastContainerStyle = {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#222222',
        borderWidth: 2,
        borderColor: '#FFFF00',
        borderRadius: 65,
        overflow: 'hidden',
    };
    const normalContainerStyle = AppStyles.container;

    // ==================== Render Chat Mode ====================

    // Renders the main chat interface (default, numeric, mini Braille keyboard modes)
    const renderChatMode = () => (
        <>
            {/* Chat Header */}
            <View
                style={AppStyles.header}
                accessible={true}
                accessibilityRole="header"
                accessibilityLabel="Chat Header"
            >
                <Text style={[AppStyles.headerText, isHighContrast && { color: '#FFFF00' }]}>
                    {/* Optional header title */}
                </Text>
            </View>
            {/* Main chat messages area */}
            <View style={AppStyles.contentContainer}>
                <View style={AppStyles.chatContainer}>
                    <FlatList
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <LinearGradient
                                colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : ['#7435FD', '#C381E7']}
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
                        keyExtractor={item => item.id}
                        inverted
                    />
                </View>

                {/* Chat Input Area */}
                <View style={[
                    AppStyles.inputContainer,
                    isHighContrast && { backgroundColor: '#333333' }
                ]}>
                    <View style={AppStyles.inputRow}>
                        {/* Playback Buttons on the left */}
                        <GradientButton
                            onPress={() => playMorseForText(message)}
                            style={[AppStyles.circleButton, { marginLeft: 4 }]}
                            colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : ['#7435FD', '#C381E7']}
                            noPadding={true}
                            accessibilityLabel="Play Morse code preview"
                            accessibilityHint="Plays the current message in Morse code"
                        >
                            <Ionicons name="flash-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                        </GradientButton>
                        <GradientButton
                            onPress={() => speakPreview(message)}
                            style={[AppStyles.circleButton, { marginLeft: 4 }]}
                            colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : ['#7435FD', '#C381E7']}
                            noPadding={true}
                            accessibilityLabel="Speak message preview"
                            accessibilityHint="Reads the current message using text-to-speech"
                        >
                            <Ionicons name="volume-high-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                        </GradientButton>

                        {/* Text input field for composing messages */}
                        <TextInput
                            style={[
                                AppStyles.input,
                                AppStyles.inputField,
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

                        {/* The Send Button */}
                        <GradientButton
                            onPress={handleSend}
                            style={[AppStyles.sendButton, isHighContrast && { backgroundColor: '#FFFF00' }]}
                            colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                            noPadding={true}
                            accessibilityLabel="Send message"
                            accessibilityHint="Sends your message"
                        >
                            <Ionicons name="send-outline" size={20} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                        </GradientButton>
                    </View>
                </View>
            </View>

            {/* Bottom keyboard area */}
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 265,
                backgroundColor: isHighContrast ? '#333333' : '#2E2E3A',
            }}>
                {keyboardMode === 'default' ? (
                    <>
                        <View style={{ borderTopWidth: 1, borderColor: '#3A3A4A' }}>
                            <Keyboard
                                onKeyPress={handleKeyPress}
                                onDelete={handleDelete}
                                onBrailleInput={handleBrailleInputToggle}
                                onKeyboardSelect={handleKeyboardSelect}
                                onMicPress={handleMicPress}
                                onThemeToggle={toggleHighContrast}
                                isHighContrast={isHighContrast}
                                dualLayout={isDualLayout}
                                onMiniToggle={toggleMiniBraille}
                                onEmoji={handleEmoji}
                                onNumbers={toggleNumericKeyboard}
                            />
                        </View>
                        <View style={[AppStyles.row, { justifyContent: 'center', marginTop: 0, marginBottom: 4 }]}>
                            <BrailleKey
                                label={'⠼'}
                                dual={isDualLayout}
                                onPress={toggleNumericKeyboard}
                                style={[
                                    AppStyles.key,
                                    { marginHorizontal: 5 },
                                    isHighContrast && { backgroundColor: '#FFFF00', borderColor: '#000000' },
                                ]}
                                textStyle={
                                    isHighContrast
                                        ? { color: '#000000', fontWeight: 'bold' }
                                        : AppStyles.specialKeyText
                                }
                                accessibilityLabel="Numeric keyboard"
                                accessibilityHint="Switch to numeric keyboard layout"
                            />
                            <BrailleKey
                                label={'😊'}
                                dual={isDualLayout}
                                onPress={handleEmoji}
                                style={[
                                    AppStyles.key,
                                    { marginHorizontal: 2 },
                                    isHighContrast && { backgroundColor: '#FFFF00', borderColor: '#000000' },
                                ]}
                                textStyle={
                                    isHighContrast
                                        ? { color: '#000000', fontWeight: 'bold' }
                                        : AppStyles.specialKeyText
                                }
                                accessibilityLabel="Emoji keyboard"
                                accessibilityHint="Switch to emoji input mode"
                            />
                            <BrailleKey
                                label={'Space'}
                                dual={isDualLayout}
                                onPress={() => handleKeyPress(' ')}
                                style={[
                                    AppStyles.spacebar,
                                    { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
                                    isHighContrast && { backgroundColor: '#FFFF00', borderColor: '#000000' },
                                ]}
                                textStyle={
                                    isHighContrast
                                        ? { color: '#000000', fontWeight: 'bold' }
                                        : AppStyles.specialKeyText
                                }
                                accessibilityLabel="Space"
                                accessibilityHint="Insert a space"
                            />
                            <BrailleKey
                                label={'Enter'}
                                dual={isDualLayout}
                                onPress={handleEnter}
                                style={[
                                    AppStyles.enterKey,
                                    { justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 },
                                    isHighContrast && { backgroundColor: '#FFFF00', borderColor: '#000000' },
                                ]}
                                textStyle={
                                    isHighContrast
                                        ? { color: '#000000', fontWeight: 'bold' }
                                        : AppStyles.specialKeyText
                                }
                                accessibilityLabel="Enter"
                                accessibilityHint="Submit your input"
                            />
                        </View>
                        <View style={[AppStyles.bottomRow]}>
                            <GradientButton
                                onPress={handleKeyboardSelect}
                                style={[AppStyles.extraButton, { padding: 0 }]}
                                noPadding={true}
                                accessibilityLabel="Toggle dual layout"
                                accessibilityHint="Switch between braille-only and braille+Latin layout"
                                colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                            >
                                <Ionicons name="globe-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                            </GradientButton>
                            <GradientButton
                                onPress={toggleHighContrast}
                                style={[AppStyles.extraButton, { padding: 0 }]}
                                noPadding={true}
                                accessibilityLabel="Toggle high contrast mode"
                                accessibilityHint="Switch high contrast mode on or off"
                                colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                            >
                                <Ionicons name="invert-mode-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                            </GradientButton>
                            <GradientButton
                                onPress={handleMicPress}
                                style={[AppStyles.extraButton, { padding: 0 }]}
                                noPadding={true}
                                accessibilityLabel="Microphone"
                                accessibilityHint="Activate voice input"
                                colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                            >
                                <Ionicons name="mic-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                            </GradientButton>
                            <GradientButton
                                onPress={handleBrailleInputToggle}
                                style={[AppStyles.extraButton, { padding: 0 }]}
                                noPadding={true}
                                accessibilityLabel="Full screen Braille input"
                                accessibilityHint="Activate full screen Braille input mode"
                                colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                            >
                                <Ionicons name="finger-print-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                            </GradientButton>
                            <GradientButton
                                onPress={toggleMiniBraille}
                                style={[AppStyles.extraButton, { padding: 0 }]}
                                noPadding={true}
                                accessibilityLabel="Mini Braille keyboard"
                                accessibilityHint="Switch to mini Braille keyboard mode"
                                colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                            >
                                <Ionicons name="grid-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                            </GradientButton>
                        </View>
                    </>
                ) : keyboardMode === 'numeric' ? (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 265,
                            backgroundColor: isHighContrast ? '#333333' : '#2E2E3A',
                        }}
                    >
                        <NumericKeyboard
                            onKeyPress={handleKeyPress}
                            onExit={() => setKeyboardMode('default')}
                            onDelete={handleDelete}
                            isHighContrast={isHighContrast}
                        />
                    </View>
                ) : (
                    // Mini Mode: Use imported MiniBrailleKeyboard component
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 265,
                            backgroundColor: isHighContrast ? '#333333' : '#2E2E3A',
                        }}
                    >
                        <MiniBrailleKeyboard
                            onAccept={(letter) => setMessage(prev => prev + letter)}
                            onDelete={() => setMessage(prev => prev.slice(0, -1))}
                            onSend={() => {
                                if (message.trim()) {
                                    const newMsg = { id: Date.now().toString(), text: message, sent: true };
                                    setChatMessages([newMsg, ...chatMessages]);
                                    setMessage('');
                                }
                            }}
                            onExit={toggleMiniBraille}
                            isHighContrast={isHighContrast}
                        />
                    </View>
                )}
            </View>
        </>
    );

    // ==================== Render Braille Mode (Full Screen) ====================

    // Renders the full-screen Braille input mode
    const renderBrailleMode = () => (
        <SafeAreaView style={{ flex: 1, backgroundColor: isHighContrast ? '#222222' : 'transparent' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center', // Centered
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    backgroundColor: 'transparent',
                }}
            >
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <GradientButton
                        onPress={toggleHapticFeedback}
                        style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10 }}
                        colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : hapticFeedbackEnabled ? ['#7435FD', '#C381E7'] : ['transparent', 'transparent']}
                        textStyle={isHighContrast ? { color: '#000000', fontSize: 16, fontWeight: 'bold' } : { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}
                        noPadding={true}
                        accessibilityLabel="Toggle haptic feedback"
                        accessibilityHint="Switch haptic feedback on or off"
                    >
                        {hapticFeedbackEnabled ? 'Haptic mode: On' : 'Haptic mode: Off'}
                    </GradientButton>
                </View>
            </View>
            <View style={AppStyles.brailleContent}>
                <View style={AppStyles.brailleGrid}>
                    <View style={AppStyles.brailleColumn}>
                        {[1, 2, 3].map(dot => (
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
                        {[4, 5, 6].map(dot => (
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
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                    <View
                        style={[
                            AppStyles.previewArea,
                            isHighContrast && { backgroundColor: '#222222', borderColor: '#FFFF00', borderWidth: 1 },
                            { flex: 1 }
                        ]}
                        accessible={true}
                        accessibilityRole="text"
                        accessibilityLabel="Preview letter"
                    >
                        <Text style={[AppStyles.previewText, isHighContrast && { color: '#FFFF00' }]}>
                            {previewLetter}
                        </Text>
                    </View>
                    <GradientButton
                        onPress={() => { if (previewLetter && previewLetter !== '?') Speech.speak(previewLetter); }}
                        style={[AppStyles.circleButton, { marginLeft: 4 }]}
                        colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : ['#7435FD', '#C381E7']}
                        noPadding={true}
                        accessibilityLabel="Speak preview letter"
                        accessibilityHint="Plays the preview letter using text-to-speech"
                    >
                        <Ionicons name="volume-high-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                    </GradientButton>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
                    <View
                        style={[
                            AppStyles.translationArea,
                            isHighContrast && { backgroundColor: '#222222', borderColor: '#FFFF00', borderWidth: 1 },
                            { flex: 1 }
                        ]}
                        accessible={true}
                        accessibilityRole="text"
                        accessibilityLabel="Final text"
                    >
                        <Text style={[AppStyles.translationText, isHighContrast && { color: '#FFFF00' }]}>
                            {finalText}
                        </Text>
                    </View>
                    <GradientButton
                        onPress={() => { if (finalText && finalText.trim() !== '') Speech.speak(finalText); }}
                        style={[AppStyles.circleButton, { marginLeft: 4 }]}
                        colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : ['#7435FD', '#C381E7']}
                        noPadding={true}
                        accessibilityLabel="Speak final text"
                        accessibilityHint="Plays the final text using text-to-speech"
                    >
                        <Ionicons name="volume-high-outline" size={24} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                    </GradientButton>
                </View>
            </View>
            <View style={[AppStyles.bottomButtonsContainer, { marginTop: 20, marginBottom: 30 }]}>
                <GradientButton
                    onPress={() => setIsBrailleMode(false)}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Back"
                    accessibilityHint="Return to the default Braille keyboard"
                    colors={isHighContrast ? ['#FFFF00', '#FFFF00'] : undefined}
                >
                    <Ionicons name="return-up-back-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
                <GradientButton
                    onPress={handleBrailleDelete}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Delete"
                    accessibilityHint="Clears the current Braille selection"
                    colors={isHighContrast ? ['#E74C3C', '#E74C3C'] : undefined}
                >
                    <Ionicons name="backspace-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
                <GradientButton
                    onPress={handleBrailleSend}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Send"
                    accessibilityHint="Sends the current message"
                    colors={isHighContrast ? ['#007AFF', '#007AFF'] : undefined}
                >
                    <Ionicons name="send-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
                <GradientButton
                    onPress={handleAccept}
                    style={{ paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 }}
                    noPadding={true}
                    accessibilityLabel="Accept"
                    accessibilityHint="Accepts the current Braille input"
                    colors={isHighContrast ? ['#27AE60', '#27AE60'] : undefined}
                >
                    <Ionicons name="checkmark-circle-outline" size={30} color={isHighContrast ? '#000000' : '#FFFFFF'} />
                </GradientButton>
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