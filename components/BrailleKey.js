import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function BrailleKey({ label, onPress, style }) {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Text style={{ color: '#000', fontSize: 40, textAlign: 'center' }}>{label}</Text>
        </TouchableOpacity>
    );
}

















