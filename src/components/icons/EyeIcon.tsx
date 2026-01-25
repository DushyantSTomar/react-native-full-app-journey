import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
    color?: string;
    size?: number;
}

const EyeIcon: React.FC<IconProps> = ({ color = '#000', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <Path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
    </Svg>
);

export default EyeIcon;
