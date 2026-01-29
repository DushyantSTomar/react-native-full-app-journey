import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface HeartIconProps {
    filled?: boolean;
    color?: string;
    stroke?: string;
}

export const HeartIcon = ({ filled = false, color, stroke }: HeartIconProps) => {
    const fillColor = filled ? (color || '#FF0000') : 'none';
    const strokeColor = stroke || (filled ? '#FF0000' : '#888888');

    return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};
