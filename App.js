import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Vibration,
} from 'react-native';
import AppStyles from './styles/AppStyles';
import Keyboard from './components/Keyboard';

export default function App() {
  const [isBrailleInput, setIsBrailleInput] = useState(false);
  const [selectedDots, setSelectedDots] = useState([]);
  const [previewLetter, setPreviewLetter] = useState('');
  const [finalText, setFinalText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const vibrationPatterns = {
    A: [100],
    B: [100, 200, 100],
    C: [100, 200, 100, 200, 100],
    D: [100, 300, 100],
    E: [100, 300, 100, 200, 100],
    F: [100, 300, 100, 300, 100, 200, 100],
    G: [100, 200, 100, 300, 100],
    H: [100, 200, 100, 300, 100, 300, 100],
    I: [100, 200, 100, 300, 100, 300, 100, 200, 100],
    J: [100, 200, 100, 300, 100, 300, 100, 300, 100],
  };

  const brailleToLatin = {
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

  const playVibrationPattern = (pattern) => {
    if (!pattern) return;

    let delay = 0;
    pattern.forEach((duration) => {
      setTimeout(() => {
        Vibration.vibrate(duration);
      }, delay);
      delay += duration + 100;
    });
  };

  const handleDotPress = (dot) => {
    const updatedDots = [...selectedDots, dot].sort().join('');
    setSelectedDots((prev) => [...prev, dot]);
    const letter = brailleToLatin[updatedDots] || '?';
    setPreviewLetter(letter);

    if (vibrationPatterns[letter]) {
      playVibrationPattern(vibrationPatterns[letter]);
    }
  };

  const handleAccept = () => {
    if (previewLetter) {
      setFinalText((prev) => prev + previewLetter);
      setSelectedDots([]);
      setPreviewLetter('');
    }
  };

  const handleDelete = () => {
    if (isBrailleInput) {
      setSelectedDots([]);
      setPreviewLetter('');
    } else if (finalText.length > 0) {
      setFinalText((prev) => prev.slice(0, -1)); // Remove the last character
    }
  };

  const handleSend = () => {
    if (finalText.trim()) {
      setChatMessages((prevMessages) => [
        { text: finalText, sent: true },
        ...prevMessages,
      ]);
      setFinalText('');
    }
  };

  const renderMessage = ({ item }) => (
      <View
          style={[
            AppStyles.messageBubble,
            item.sent ? AppStyles.sentMessage : AppStyles.receivedMessage,
          ]}
      >
        <Text style={AppStyles.messageText}>{item.text}</Text>
      </View>
  );

  if (isBrailleInput) {
    return (
        <SafeAreaView style={AppStyles.container}>
          {/* Header */}
          <View style={AppStyles.header}>
            <TouchableOpacity onPress={() => setIsBrailleInput(false)}>
              <Text style={AppStyles.headerText}>Back</Text>
            </TouchableOpacity>
          </View>

          {/* Preview Letter Area */}
          <View style={AppStyles.previewArea}>
            <View style={AppStyles.previewSquare}>
              <Text style={AppStyles.previewText}>{previewLetter}</Text>
            </View>
          </View>

          {/* Final Text Area */}
          <View style={AppStyles.translationArea}>
            <Text style={AppStyles.translationText}>{finalText}</Text>
          </View>

          {/* Braille Grid */}
          <View style={AppStyles.brailleGrid}>
            <View style={AppStyles.brailleColumn}>
              {[1, 2, 3].map((row) => (
                  <TouchableOpacity
                      key={`col1-row${row}`}
                      style={[
                        AppStyles.dot,
                        selectedDots.includes(row.toString()) && AppStyles.dotFilled,
                      ]}
                      onPress={() => handleDotPress(row.toString())}
                  />
              ))}
            </View>
            <View style={AppStyles.brailleColumn}>
              {[4, 5, 6].map((row) => (
                  <TouchableOpacity
                      key={`col2-row${row}`}
                      style={[
                        AppStyles.dot,
                        selectedDots.includes(row.toString()) && AppStyles.dotFilled,
                      ]}
                      onPress={() => handleDotPress(row.toString())}
                  />
              ))}
            </View>
          </View>

          {/* Accept, Send, and Delete Buttons */}
          <View style={[AppStyles.bottomButtonsContainer, { flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 20, marginBottom: 20 }]}>
            <TouchableOpacity style={[AppStyles.deleteButton, { flex: 1, marginHorizontal: 5 }]} onPress={handleDelete}>
              <Text style={AppStyles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[AppStyles.sendButtonBraille, { backgroundColor: 'blue', flex: 1, marginHorizontal: 5 }]} onPress={handleSend}>
              <Text style={AppStyles.acceptText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[AppStyles.acceptButton, { flex: 1, marginHorizontal: 5 }]} onPress={handleAccept}>
              <Text style={AppStyles.acceptText}>Accept</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }

  return (
      <SafeAreaView style={AppStyles.container}>
        <View style={AppStyles.header}>
          <Text style={AppStyles.headerText}>Chat</Text>
        </View>

        <FlatList
            data={chatMessages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
            inverted
            contentContainerStyle={AppStyles.chatArea}
        />

        <View style={AppStyles.inputBar}>
          <TextInput
              style={AppStyles.input}
              value={finalText}
              onChangeText={setFinalText}
              placeholder="Type your message..."
          />
          <TouchableOpacity style={AppStyles.sendButton} onPress={handleSend}>
            <Text style={AppStyles.acceptText}>Send</Text>
          </TouchableOpacity>
        </View>

      <Keyboard
          onKeyPress={(key) => setFinalText((prev) => prev + key)}
          onEnter={handleSend}
          onBrailleInput={() => setIsBrailleInput(true)}
          onDelete={handleDelete} // Pass the delete handler
      />
      </SafeAreaView>
  );
}














