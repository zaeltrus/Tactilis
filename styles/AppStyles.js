import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const keyWidth = width * 0.09; // Key size for keyboard
const keyHeight = keyWidth; // Keep keys square
const spacebarWidth = width * 0.5; // Spacebar spans 60% of screen width
const enterWidth = keyWidth * 2; // Enter button is twice the size of regular keys
const dotSize = width * 0.25; // Bigger dots for Braille input

const AppStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Black background for high contrast
    },
    header: {
        height: 60,
        backgroundColor: '#FFD700', // Bright yellow header for visibility
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#000', // Black text for contrast
        fontSize: 22,
        fontWeight: 'bold',
    },
    chatArea: {
        flexGrow: 1,
        padding: 10,
        justifyContent: 'flex-end', // Align messages at the bottom
    },
    messageBubble: {
        maxWidth: '75%',
        padding: 12,
        borderRadius: 12,
        marginVertical: 6,
    },
    sentMessage: {
        backgroundColor: '#FFD700', // Bright yellow for sent messages
        alignSelf: 'flex-end', // Align sent messages to the right
    },
    receivedMessage: {
        backgroundColor: '#333', // Dark gray for received messages
        alignSelf: 'flex-start', // Align received messages to the left
    },
    messageText: {
        color: '#000', // Black text inside messages
        fontSize: 30,
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#FFD700',
        backgroundColor: '#000',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#FFD700',
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 45,
        marginRight: 10,
        color: '#FFD700', // Yellow text for the input field
        backgroundColor: '#333', // Dark gray background for input
        fontSize: 30,
    },
    sendButton: {
        backgroundColor: '#FFD700',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboard: {
        width: '100%',
        paddingHorizontal: 0,
        backgroundColor: '#000', // Black background for the keyboard
        paddingVertical: 20, // Extra padding for spacing
    },
    row: {
        flexDirection: 'row', // Arrange keys in a row
        justifyContent: 'space-between', // Align keys evenly
        alignItems: 'center', // Align keys vertically
        marginBottom: 10, // Spacing between rows
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Closer spacing between keys
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10, // Slight padding for alignment
    },
    thirdRow: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Closer spacing for third row
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 10, // Slight padding for alignment
    },
    functionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 20, // Extra padding for function keys
    },
    key: {
        marginHorizontal: 2, // Reduced spacing between keys for compact layout
        alignItems: 'center', // Center text inside the key
        justifyContent: 'center', // Center text inside the key
        backgroundColor: '#FFD700', // Bright yellow for keys
        borderRadius: 10, // Slightly rounded corners
        width: keyWidth, // Adjusted relative width for keys
        height: keyHeight, // Adjusted relative height for keys
    },
    functionKey: {
        marginHorizontal: 4, // Larger margin for function keys
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFD700',
        borderRadius: 10,
        width: keyWidth, // Same width as regular keys
        height: keyHeight, // Same height as regular keys
    },
    spacebar: {
        backgroundColor: '#FFD700', // Yellow for spacebar
        borderRadius: 10,
        width: spacebarWidth, // Spacebar spans a percentage of screen width
        height: keyHeight, // Match height with other keys
        alignSelf: 'center',
        justifyContent: 'center',
    },
    enterKey: {
        backgroundColor: '#FFD700', // Yellow for enter key
        borderRadius: 10,
        width: enterWidth, // Twice the size of regular keys
        height: keyHeight, // Match height with other keys
        alignItems: 'center',
        justifyContent: 'center',
    },
    brailleGrid: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    brailleColumn: {
        marginHorizontal: 20,
        alignItems: 'center',
    },
    dot: {
        width: dotSize,
        height: dotSize,
        borderRadius: dotSize / 2,
        borderWidth: 3,
        borderColor: '#FFD700',
        marginVertical: 12,
        backgroundColor: '#000',
    },
    dotFilled: {
        backgroundColor: '#FFD700',
    },
    previewArea: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
        padding: 10,
        marginHorizontal: 150,
        marginVertical: 20,
        backgroundColor: '#333',
    },
    previewSquare: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 10,
    },
    previewText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFD700',
    },
    textArea: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#000',
    },
    textAreaContent: {
        fontSize: 24,
        color: '#FFD700',
    },
    acceptButton: {
        backgroundColor: '#4CAF50', // Green for accept
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
    },
    deleteButton: {
        backgroundColor: '#FF0000', // Red for delete
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
    },
    acceptText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    deleteText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    collectedCharactersArea: {
        marginVertical: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 10,
        backgroundColor: '#000',
    },
    collectedCharactersText: {
        fontSize: 24,
        color: '#FFD700',
        textAlign: 'center',
    },
    translationArea: {
        marginTop: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: '#FFD700',
        borderRadius: 10,
        backgroundColor: '#000',
    },
    translationText: {
        fontSize: 24,
        color: '#FFD700',
        textAlign: 'center',
    },
    sendButtonBraille: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        alignSelf: 'center',
    },
});

export default AppStyles;












