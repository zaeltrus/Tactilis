// BrailleKey.js
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import AppStyles from '../../Tactilis2/styles/AppStyles';

export default function BrailleKey({ label, onPress, style, textStyle }) {
    return (
        <TouchableOpacity onPress={onPress} style={[AppStyles.key, style]}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[AppStyles.keyText, textStyle]}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}
























