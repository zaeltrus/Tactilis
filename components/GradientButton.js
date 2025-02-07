// components/GradientButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientButton({ onPress, style, textStyle, children, colors }) {
    const content =
        typeof children === 'string' ? (
            <Text style={[styles.text, textStyle]}>{children}</Text>
        ) : (
            children
        );

    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={colors || ['#7435FD', '#C381E7']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[styles.gradient, style]}
            >
                {content}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    gradient: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
