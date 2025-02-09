import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import AppStyles from '../styles/AppStyles';

export default function BrailleKey({ label, onPress, style, textStyle, accessibilityLabel, accessibilityHint }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[AppStyles.key, style]}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel || `Key ${label}`}
            accessibilityHint={accessibilityHint || `Press to input ${label}`}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[AppStyles.keyText, textStyle]}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}
