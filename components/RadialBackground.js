import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Defs, Rect, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function RadialBackground({ children }) {
    return (
        <>
            <Svg
                height={height}
                width={width}
                style={{ position: 'absolute', top: 0, left: 0 }}
                accessible={false}
                importantForAccessibility="no-hide-descendants"
            >
                <Defs>
                    <RadialGradient
                        id="grad"
                        cx="0%"
                        cy="100%"
                        rx="100%"
                        ry="100%"
                        fx="0%"
                        fy="100%"
                    >
                        <Stop offset="0%" stopColor="#5e3598" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#241848" stopOpacity="1" />
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
            </Svg>
            {children}
        </>
    );
}
