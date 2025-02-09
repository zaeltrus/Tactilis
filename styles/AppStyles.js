import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Base key size: 9% of screen width.
const keySize = width * 0.09;
const spacebarWidth = width * 0.5;
const enterWidth = keySize * 2;

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    // Content container for normal chat mode (chat area and input)
    contentContainer: {
        flex: 1,
        paddingBottom: keySize * 5.5, // Reserve space for the keyboard
    },
    // Header for normal chat mode
    header: {
        height: 80, // Increased height so text is lower on the screen
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        marginVertical: 6,
        maxWidth: '75%',
    },
    sentMessage: {
        backgroundColor: '#5B67FF',
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#27293D',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderTopWidth: 0.5,
        borderColor: '#3A3A4A',
        backgroundColor: '#2E2E3A',
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#27293D',
        color: '#FFFFFF',
        fontSize: 16,
    },
    sendButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#5B67FF',
        borderRadius: 20,
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Keyboard container positioned absolutely at the bottom.
    keyboard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2E2E3A',
        borderTopWidth: 1,
        borderColor: '#3A3A4A',
        paddingVertical: 4,
        zIndex: 10,
        elevation: 10,
    },
    // Row style for keyboard keys (using space-around for even gaps)
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 4, // Vertical spacing between rows
    },
    // Row offset for rows that need to be shifted (for iOS-style layout)
    rowOffsetHalf: {
        marginLeft: keySize * 0.5,
    },
    // Each key's style
    key: {
        width: keySize,
        height: keySize,
        backgroundColor: '#3A3A4A',
        borderRadius: 8,
        marginHorizontal: 2,
    },
    keyText: {
        fontSize: 28,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    specialKeyText: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    spacebar: {
        width: spacebarWidth,
        height: keySize,
        backgroundColor: '#3A3A4A',
        borderRadius: 8,
    },
    enterKey: {
        width: enterWidth,
        height: keySize,
        backgroundColor: '#3A3A4A',
        borderRadius: 8,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 2,
        paddingHorizontal: 10,
    },
    extraButton: {
        width: keySize * 1.3,
        height: keySize * 1.3,
        backgroundColor: '#3A3A4A',
        borderRadius: (keySize * 1.3) / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    extraButtonText: {
        fontSize: 24,
        color: '#FFFFFF',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    // -------------------- Styles for Braille Input Mode --------------------
    // Header in braille mode (with back button)
    brailleHeader: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        paddingTop: 10,
        backgroundColor: '#2E2E3A',
    },
    brailleHeaderText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    // Preview area for current braille input
    previewArea: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#7435FD',
        padding: 10,
        margin: 20,
        backgroundColor: '#27293D',
    },
    previewText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#C381E7',
    },
    // Translation area (final text)
    translationArea: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#7435FD',
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#27293D',
    },
    translationText: {
        fontSize: 24,
        color: '#C381E7',
    },
    // Braille grid styling
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
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#7435FD',
        marginVertical: 12,
        backgroundColor: '#000802',
    },
    dotFilled: {
        backgroundColor: '#C381E7',
    },
    // Bottom buttons container for braille mode
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20,
    },
    acceptButton: {
        backgroundColor: '#27AE60',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    deleteButton: {
        backgroundColor: '#E74C3C',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sendButtonBraille: {
        backgroundColor: '#27AE60',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    spaceButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 23,
        paddingVertical: 11,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    spaceButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
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
});
