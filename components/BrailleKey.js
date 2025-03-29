import React, { useState, useRef } from 'react';
import { View, Text, Animated, PanResponder } from 'react-native';
import AppStyles from '../styles/AppStyles';

// Dual mapping of Braille characters to their corresponding Latin letters.
const dualMapping = {
    '⠟': 'Q', '⠺': 'W', '⠑': 'E', '⠗': 'R', '⠞': 'T',
    '⠽': 'Y', '⠥': 'U', '⠊': 'I', '⠕': 'O', '⠏': 'P',
    '⠁': 'A', '⠎': 'S', '⠙': 'D', '⠋': 'F', '⠛': 'G',
    '⠓': 'H', '⠚': 'J', '⠅': 'K', '⠇': 'L', '⠵': 'Z',
    '⠭': 'X', '⠉': 'C', '⠧': 'V', '⠃': 'B', '⠝': 'N', '⠍': 'M'
};

// Main component for individual Braille keyboard keys.
export default function BrailleKey({
                                       label,                  // Label displayed on the key (Braille character or special symbol).
                                       onPress,                // Callback function triggered when the key is pressed.
                                       style,                  // Additional styling for the key container.
                                       textStyle,              // Additional styling for the key text.
                                       dual,                   // Enables dual layout (Braille + Latin character).
                                       isHighContrast,         // High contrast mode flag.
                                       accessibilityLabel,     // Accessibility label for screen readers.
                                       accessibilityHint,      // Accessibility hint for additional context.
                                   }) {
    // State to track if key is enlarged due to long press.
    const [enlarged, setEnlarged] = useState(false);

    // Animated scale value for key enlargement.
    const scaleValue = useRef(new Animated.Value(1)).current;

    // Timeout reference for detecting long press gestures.
    const longPressTimeout = useRef(null);

    // PanResponder setup for detecting gestures and interactions.
    const panResponder = useRef(
        PanResponder.create({
            // Always respond to touch events.
            onStartShouldSetPanResponder: () => true,

            // Detect start of press and initiate enlargement after 300ms.
            onPanResponderGrant: () => {
                longPressTimeout.current = setTimeout(() => {
                    setEnlarged(true);
                    Animated.spring(scaleValue, {
                        toValue: 1.5,
                        useNativeDriver: true,
                    }).start();
                }, 300);
            },

            // Cancel enlargement if finger moves significantly.
            onPanResponderMove: (evt, gestureState) => {
                if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) {
                    clearTimeout(longPressTimeout.current);
                    if (enlarged) {
                        Animated.spring(scaleValue, {
                            toValue: 1,
                            useNativeDriver: true,
                        }).start(() => setEnlarged(false));
                    }
                }
            },

            // Handle key press and reset enlargement on release.
            onPanResponderRelease: () => {
                clearTimeout(longPressTimeout.current);
                Animated.spring(scaleValue, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start(() => {
                    if (enlarged) {
                        setEnlarged(false);
                    }
                    // Use dual mapping if dual mode is enabled.
                    if (dual && dualMapping[label]) {
                        onPress(dualMapping[label]);
                    } else {
                        onPress(label);
                    }
                });
            },

            // Reset key scale if gesture is terminated prematurely.
            onPanResponderTerminate: () => {
                clearTimeout(longPressTimeout.current);
                Animated.spring(scaleValue, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start(() => setEnlarged(false));
            },
        })
    ).current;

    // Renders the key label, handling dual (Braille + Latin) or single layouts.
    const renderDualLabel = () => {
        if (dual && dualMapping[label]) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* Braille character displayed centrally */}
                    <Text
                        style={[
                            {
                                fontSize: 28,
                                color: textStyle?.color || '#FFFFFF',
                                textAlign: 'center',
                                lineHeight: 28,
                            },
                            textStyle || {}
                        ]}
                    >
                        {label}
                    </Text>
                    {/* Latin equivalent displayed in corner for dual mode */}
                    <View style={{ position: 'absolute', bottom: 4, right: 4 }}>
                        <Text style={{ fontSize: 16, color: textStyle?.color || '#FFFFFF' }}>
                            {dualMapping[label]}
                        </Text>
                    </View>
                </View>
            );
        } else {
            // Non-dual keys rendered with centered label.
            const brailleFontSize = isHighContrast
                ? 28
                : (textStyle && textStyle.fontSize) || AppStyles.keyText.fontSize || 35;
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[
                        { fontSize: brailleFontSize, lineHeight: brailleFontSize, textAlign: 'center' },
                        AppStyles.keyText,
                        textStyle || {}
                    ]}>
                        {label}
                    </Text>
                </View>
            );
        }
    };

    // Render component with accessibility features.
    return (
        <Animated.View
            style={[
                AppStyles.key,
                style,
                { transform: [{ scale: scaleValue }] }
            ]}
            {...panResponder.panHandlers}
            accessible
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || `Key ${label}`}
            accessibilityHint={accessibilityHint || `Press to input ${label}`}
        >
            {renderDualLabel()}
        </Animated.View>
    );
}