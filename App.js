// App.js
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
} from 'react-native';
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

    // Normal chat mode handlers
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

    // Toggle between chat mode and full-screen Braille mode
    const handleBrailleInputToggle = () => {
        setIsBrailleMode((prev) => !prev);
        setSelectedDots([]);
        setPreviewLetter('');
        setFinalText('');
    };

    const handleKeyboardSelect = () => {};
    const handleMicPress = () => {};

    // Braille mode functions
    const handleDotPress = (dot) => {
        const newDots = [...selectedDots, dot].sort();
        setSelectedDots(newDots);
        const mapping = {
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
        };
        setPreviewLetter(mapping[newDots.join('')] || '?');
    };

    const handleAccept = () => {
        if (previewLetter) {
            setFinalText((prev) => prev + previewLetter);
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

    // Render normal chat mode (without the gradient header)
    const renderChatMode = () => (
        <>
            {/* Simple header removed or replaced with a plain header if desired */}
            <View style={AppStyles.header}>
                <Text style={AppStyles.headerText}></Text>
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
                                ]}
                            >
                                <Text style={AppStyles.messageText}>{item.text}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        inverted
                    />
                </View>
                <View style={AppStyles.inputContainer}>
                    <TextInput
                        style={AppStyles.input}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Type a message"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity style={AppStyles.sendButton} onPress={handleSend}>
                        <Text style={AppStyles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Keyboard
                onKeyPress={handleKeyPress}
                onDelete={handleDelete}
                onEnter={handleEnter}
                onEmoji={handleEmoji}
                onNumbers={handleNumbers}
                onBrailleInput={handleBrailleInputToggle} // Tapping ⇧ toggles Braille mode
                onKeyboardSelect={handleKeyboardSelect}
                onMicPress={handleMicPress}
            />
        </>
    );

    // Render full-screen Braille input mode
    const renderBrailleMode = () => (
        <SafeAreaView style={AppStyles.container}>
            <View style={AppStyles.brailleHeader}>
                <TouchableOpacity onPress={handleBrailleInputToggle}>
                    <Text style={AppStyles.brailleHeaderText}>Back</Text>
                </TouchableOpacity>
            </View>
            <View style={AppStyles.previewArea}>
                <Text style={AppStyles.previewText}>{previewLetter}</Text>
            </View>
            <View style={AppStyles.translationArea}>
                <Text style={AppStyles.translationText}>{finalText}</Text>
            </View>
            <View style={AppStyles.brailleGrid}>
                <View style={AppStyles.brailleColumn}>
                    {[1, 2, 3].map((dot) => (
                        <TouchableOpacity
                            key={`col1-${dot}`}
                            style={[
                                AppStyles.dot,
                                selectedDots.includes(dot.toString()) && AppStyles.dotFilled,
                            ]}
                            onPress={() => handleDotPress(dot.toString())}
                        />
                    ))}
                </View>
                <View style={AppStyles.brailleColumn}>
                    {[4, 5, 6].map((dot) => (
                        <TouchableOpacity
                            key={`col2-${dot}`}
                            style={[
                                AppStyles.dot,
                                selectedDots.includes(dot.toString()) && AppStyles.dotFilled,
                            ]}
                            onPress={() => handleDotPress(dot.toString())}
                        />
                    ))}
                </View>
            </View>
            <View style={AppStyles.bottomButtonsContainer}>
                <TouchableOpacity onPress={handleBrailleDelete} style={AppStyles.deleteButton}>
                    <Text style={AppStyles.deleteText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleBrailleSend} style={AppStyles.sendButtonBraille}>
                    <Text style={AppStyles.acceptText}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAccept} style={AppStyles.acceptButton}>
                    <Text style={AppStyles.acceptText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

    return (
        <RadialBackground>
            <SafeAreaView style={AppStyles.container}>
                {isBrailleMode ? renderBrailleMode() : renderChatMode()}
            </SafeAreaView>
        </RadialBackground>
    );
}









