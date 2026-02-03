import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface SparklesIconProps {
    color?: string;
    size?: number;
    stroke?: string;
}

export const SparklesIcon = ({ color = '#000', size = 24, stroke }: SparklesIconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 2L14.39 9.61L22 12L14.39 14.39L12 22L9.61 14.39L2 12L9.61 9.61L12 2Z"
                fill={color}
                stroke={stroke || color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M18 2L18.8 4.2L21 5L18.8 5.8L18 8L17.2 5.8L15 5L17.2 4.2L18 2Z"
                fill={color}
                stroke={stroke || color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
