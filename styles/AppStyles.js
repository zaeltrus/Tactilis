import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Dynamic size calculations
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
        paddingBottom: 230,
    },
    // Header for normal chat mode
    header: {
        height: 80,
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
        padding: 5,
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
        height: 40,
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
        backgroundColor: '#2E2E3A',
        borderTopWidth: 1,
        borderColor: '#3A3A4A',
        paddingVertical: 4,
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
        fontSize: 35,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: keySize,
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
    // -------------------- Playback and Input Rows --------------------
    playbackRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    playbackButton: {
        padding: 8,
        marginHorizontal: 4,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputField: {
        flex: 1,
        marginRight: 8,
    },

    circleButton: {
        width: 35,
        height: 35,
        borderRadius: 25, // Half of width/height for a perfect circle
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4, // Optional spacing between buttons
    },

    // -------------------- Mini Mode Styles --------------------
    mini: {
        container: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            minHeight: 265,
            backgroundColor: '#2E2E3A',
            padding: 5,
        },
        topArea: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
        },
        previewSquare: {
            width: 100,
            height: 100,
            borderWidth: 2,
            borderColor: '#7435FD',
            backgroundColor: '#27293D',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
        },
        previewText: {
            fontSize: 18,
            color: '#C381E7',
        },
        gridContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        column: {
            flexDirection: 'column',
            justifyContent: 'center',
            marginHorizontal: 5,
        },
        dot: {
            width: 40,
            height: 40,
            borderRadius: 20,
            margin: 5,
            backgroundColor: '#27293D',
            borderWidth: 3,
            borderColor: '#7435FD',
        },
        buttonRow: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        },
        controlButton: {
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 20,
        },
    },
});