import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Path,
  Rect,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

export function AlHamdLogo({ size = 80 }) {
  return (
    <View style={{ width: size, height: size * 1.25, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size * 1.25} viewBox="0 0 80 100">
        <Path
          d="M40 4C35 15 18 36 18 55C18 70 29 82 43 82C48 82 53 80.5 57 77.8C54 75 52 70 52 64C52 52 60 44 60 44C58 40 54 36 50 28C46 20 42 10 40 4Z"
          fill="#1b77ec"
        />
        <Path
          d="M30 46C27 50 25 56 26 62C27 68 31 73 36 75C34 72 33 67 33 63C33 55 36 50 38 46C34 46 32 46 30 46Z"
          fill="#75b7fd"
        />
        <Path
          d="M50 45C50 45 42 56 42 66C42 75 48 81 55 81C65 81 72 72 72 61C72 47 58 35 50 45Z"
          fill="#0c356a"
        />
      </Svg>
    </View>
  );
}

export function PaintArtworkFooter() {
  return (
    <View style={styles.footerContainer} pointerEvents="none">
      {/* Pink Organic Splash */}
      <View style={styles.pinkSplash} />

      {/* Azure Organic Splash */}
      <View style={styles.blueSplash} />

      {/* Foreground Fluid White & Blue Waves */}
      <View style={styles.wavesContainer}>
        <Svg width={width} height={140} viewBox="0 0 390 144" preserveAspectRatio="none">
          <Path
            d="M-10 144L-10 70C60 70 80 115 150 115C220 115 250 50 320 60C360 65 385 105 405 110L405 144H-10Z"
            fill="#eff6ff"
            fillOpacity={0.9}
          />
          <Path
            d="M-20 144L-20 95C40 95 70 125 140 120C210 115 235 78 305 82C355 85 380 110 410 115L410 144H-20Z"
            fill="#ffffff"
          />
        </Svg>
      </View>

      {/* Realistic Paint Cans */}
      <View style={styles.paintCansRow}>
        {/* Big Paint Can */}
        <View style={styles.bigCan}>
          <Svg width={130} height={130} viewBox="0 0 130 130">
            <Defs>
              <LinearGradient id="canBody" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#CBD5E1" />
                <Stop offset="0.5" stopColor="#FFFFFF" />
                <Stop offset="1" stopColor="#94A3B8" />
              </LinearGradient>
              <LinearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#94A3B8" />
                <Stop offset="0.5" stopColor="#F1F5F9" />
                <Stop offset="1" stopColor="#64748B" />
              </LinearGradient>
            </Defs>

            {/* Handle Arc */}
            <Path
              d="M15 45 C15 10, 115 10, 115 45"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2.5"
            />

            {/* Can Body */}
            <Rect
              x="12"
              y="40"
              width="106"
              height="85"
              rx="12"
              fill="url(#canBody)"
            />

            {/* Crimp Lines */}
            <Rect x="12" y="70" width="106" height="2" fill="#CBD5E1" opacity={0.8} />
            <Rect x="12" y="105" width="106" height="2" fill="#CBD5E1" opacity={0.8} />

            {/* Rim */}
            <Rect
              x="8"
              y="34"
              width="114"
              height="14"
              rx="7"
              fill="url(#rimGrad)"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            {/* Paint surface */}
            <Rect x="16" y="38" width="98" height="6" rx="3" fill="#0062E0" />

            {/* Paint Drips */}
            <Path d="M26 44 Q 30 75 35 75 Q 40 75 44 44 Z" fill="#0062E0" />
            <Path d="M52 44 Q 57 88 62 88 Q 67 88 72 44 Z" fill="#0062E0" />
            <Path d="M80 44 Q 84 65 88 65 Q 92 65 96 44 Z" fill="#0062E0" />
          </Svg>
        </View>

        {/* Small Paint Can */}
        <View style={styles.smallCan}>
          <Svg width={95} height={95} viewBox="0 0 95 95">
            <Defs>
              <LinearGradient id="canBodySmall" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#E2E8F0" />
                <Stop offset="0.5" stopColor="#FFFFFF" />
                <Stop offset="1" stopColor="#CBD5E1" />
              </LinearGradient>
            </Defs>

            {/* Handle Arc */}
            <Path
              d="M10 35 C10 12, 85 12, 85 35"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
            />

            {/* Can Body */}
            <Rect
              x="8"
              y="32"
              width="79"
              height="60"
              rx="9"
              fill="url(#canBodySmall)"
            />

            {/* Rim */}
            <Rect
              x="5"
              y="28"
              width="85"
              height="10"
              rx="5"
              fill="#CBD5E1"
            />
            <Rect x="12" y="31" width="71" height="4" rx="2" fill="#1877F2" />

            {/* Drips */}
            <Path d="M22 36 Q 26 58 30 58 Q 34 58 38 36 Z" fill="#1877F2" />
            <Path d="M48 36 Q 52 66 56 66 Q 60 66 64 36 Z" fill="#1877F2" />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    overflow: 'hidden',
  },
  pinkSplash: {
    position: 'absolute',
    right: -30,
    bottom: 0,
    width: 220,
    height: 160,
    backgroundColor: '#FF3B81',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 80,
    opacity: 0.9,
    transform: [{ rotate: '8deg' }],
  },
  blueSplash: {
    position: 'absolute',
    left: -40,
    bottom: 10,
    width: 240,
    height: 130,
    backgroundColor: '#095EDB',
    borderTopRightRadius: 120,
    opacity: 0.95,
  },
  wavesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  paintCansRow: {
    position: 'absolute',
    bottom: -6,
    left: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bigCan: {
    width: 130,
    height: 130,
  },
  smallCan: {
    width: 95,
    height: 95,
    marginLeft: -25,
    marginBottom: -8,
  },
});
