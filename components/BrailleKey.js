import React, { useState, useRef } from 'react';
import { View, Text, Animated, PanResponder } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function BrailleKey({
                                       label,
                                       onPress,
                                       style,
                                       textStyle,
                                       dual,
                                       isHighContrast,
                                       accessibilityLabel,
                                       accessibilityHint,
                                   }) {
    const [enlarged, setEnlarged] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;
    const longPressTimeout = useRef(null);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                longPressTimeout.current = setTimeout(() => {
                    setEnlarged(true);
                    Animated.spring(scaleValue, {
                        toValue: 1.5,
                        useNativeDriver: true,
                    }).start();
                }, 300);
            },
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
            onPanResponderRelease: () => {
                clearTimeout(longPressTimeout.current);
                Animated.spring(scaleValue, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start(() => {
                    if (enlarged) {
                        setEnlarged(false);
                    }
                    if (dual && dualMapping[label]) {
                        onPress(dualMapping[label]);
                    } else {
                        onPress(label);
                    }
                });
            },
            onPanResponderTerminate: () => {
                clearTimeout(longPressTimeout.current);
                Animated.spring(scaleValue, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start(() => setEnlarged(false));
            },
        })
    ).current;

    const dualMapping = {
        '⠟': 'Q',
        '⠺': 'W',
        '⠑': 'E',
        '⠗': 'R',
        '⠞': 'T',
        '⠽': 'Y',
        '⠥': 'U',
        '⠊': 'I',
        '⠕': 'O',
        '⠏': 'P',
        '⠁': 'A',
        '⠎': 'S',
        '⠙': 'D',
        '⠋': 'F',
        '⠛': 'G',
        '⠓': 'H',
        '⠚': 'J',
        '⠅': 'K',
        '⠇': 'L',
        '⠵': 'Z',
        '⠭': 'X',
        '⠉': 'C',
        '⠧': 'V',
        '⠃': 'B',
        '⠝': 'N',
        '⠍': 'M'
    };

    const renderDualLabel = () => {
        if (dual && dualMapping[label]) {
            // For dual mode, always use the normal layout so that the braille dot remains small.
            // When in high contrast mode, reduce the dot size.
            const brailleFontSize = isHighContrast ? 28 : 28;
            const brailleLineHeight = isHighContrast ? 28 : 28;
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={[
                            {
                                fontSize: brailleFontSize, // reduced size in high contrast mode
                                color: textStyle?.color || '#FFFFFF',
                                textAlign: 'center',
                                lineHeight: brailleLineHeight,
                            },
                            textStyle || {}
                        ]}
                    >
                        {label}
                    </Text>
                    <View style={{ position: 'absolute', bottom: 4, right: 4 }}>
                        <Text style={{ fontSize: 16, color: textStyle?.color || '#FFFFFF' }}>
                            {dualMapping[label]}
                        </Text>
                    </View>
                </View>
            );
        } else {
            // For non-dual keys, center the label.
            const brailleFontSize = isHighContrast ? 28 : (textStyle && textStyle.fontSize) || AppStyles.keyText.fontSize || 35;
            const brailleLineHeight = isHighContrast ? 28 : brailleFontSize;
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[{ fontSize: brailleFontSize, lineHeight: brailleLineHeight, textAlign: 'center' }, AppStyles.keyText, textStyle || {}]}>
                        {label}
                    </Text>
                </View>
            );
        }
    };

    return (
        <Animated.View
            style={[AppStyles.key, style, { transform: [{ scale: scaleValue }] }]}
            {...panResponder.panHandlers}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || `Key ${label}`}
            accessibilityHint={accessibilityHint || `Press to input ${label}`}
        >
            {renderDualLabel()}
        </Animated.View>
    );
}