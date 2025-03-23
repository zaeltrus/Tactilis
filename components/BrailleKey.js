import React, { useState, useRef } from 'react';
import { View, Text, Animated, PanResponder } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function BrailleKey({ label, onPress, style, textStyle, dual, accessibilityLabel, accessibilityHint }) {
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
                    // If dual is enabled and the label is in our braille-to-Latin mapping, pass the Latin letter.
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

    // Mapping for dual layout: if the key's label is a braille symbol, get the Latin letter.
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

    // In dual mode, if the label is in dualMapping, render both pieces.
    const renderDualLabel = () => {
        if (dual && dualMapping[label]) {
            return (
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', top: 4, left: 4 }}>
                        <Text style={{ fontSize: 35, color: textStyle?.color || '#FFFFFF' }}>{label}</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 2, right: 2 }}>
                        <Text style={{ fontSize: 18, color: textStyle?.color || '#FFFFFF' }}>{dualMapping[label]}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[AppStyles.keyText, { transform: [{ translateY: 3 }] } ,textStyle]}>{label}</Text>
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
