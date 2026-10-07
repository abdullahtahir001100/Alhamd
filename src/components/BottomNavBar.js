import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Polyline, Rect } from 'react-native-svg';
import { Colors } from '../theme/colors';

export default function BottomNavBar({ activeTab, onTabChange, onScanPress }) {
  return (
    <View style={styles.navContainer}>
      <View style={styles.innerRow}>
        {/* Home Tab */}
        <TouchableOpacity
          style={styles.tabBtn}
          activeOpacity={0.8}
          onPress={() => onTabChange('home')}>
          <Svg
            width={24}
            height={24}
            viewBox="0 0 20 20"
            fill={activeTab === 'home' ? '#0062E0' : '#94A3B8'}>
            <Path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </Svg>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'home' && styles.activeTabLabel,
            ]}>
            Home
          </Text>
          {activeTab === 'home' ? <View style={styles.activeIndicator} /> : <View style={styles.inactiveIndicator} />}
        </TouchableOpacity>

        {/* Center Floating Elevated Scan QR Button */}
        <View style={styles.centerContainer}>
          <TouchableOpacity
            style={styles.floatingScanBtn}
            activeOpacity={0.85}
            onPress={onScanPress}>
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="#FFFFFF"
                strokeWidth={2.2}
              />
              <Rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1.5"
                stroke="#FFFFFF"
                strokeWidth={2.2}
              />
              <Rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1.5"
                stroke="#FFFFFF"
                strokeWidth={2.2}
              />
              <Rect x="14" y="14" width="2" height="2" fill="#FFFFFF" />
              <Rect x="19" y="14" width="2" height="2" fill="#FFFFFF" />
              <Rect x="14" y="19" width="2" height="2" fill="#FFFFFF" />
              <Rect x="19" y="19" width="2" height="2" fill="#FFFFFF" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.scanLabel}>Scan QR</Text>
        </View>

        {/* History Tab */}
        <TouchableOpacity
          style={styles.tabBtn}
          activeOpacity={0.8}
          onPress={() => onTabChange('history')}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Circle
              cx="12"
              cy="12"
              r="9"
              stroke={activeTab === 'history' ? '#0062E0' : '#64748B'}
              strokeWidth={2}
            />
            <Polyline
              points="12 7 12 12 15 15"
              stroke={activeTab === 'history' ? '#0062E0' : '#64748B'}
              strokeWidth={2}
            />
          </Svg>
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'history' && styles.activeTabLabel,
            ]}>
            History
          </Text>
          {activeTab === 'history' ? <View style={styles.activeIndicator} /> : <View style={styles.inactiveIndicator} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 12,
  },
  innerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  tabBtn: {
    alignItems: 'center',
    paddingTop: 4,
    minWidth: 64,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#0062E0',
  },
  activeIndicator: {
    width: 28,
    height: 3,
    backgroundColor: '#0062E0',
    borderRadius: 2,
    marginTop: 4,
  },
  inactiveIndicator: {
    width: 28,
    height: 3,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  centerContainer: {
    alignItems: 'center',
    marginTop: -28,
  },
  floatingScanBtn: {
    width: 54,
    height: 54,
    backgroundColor: '#0062E0',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0062E0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 10,
  },
  scanLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    marginTop: 4,
  },
});
