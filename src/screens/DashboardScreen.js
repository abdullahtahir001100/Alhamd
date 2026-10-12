import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Svg, {
  Path,
  Circle,
  Rect,
  Polygon,
  Polyline,
  Line,
} from 'react-native-svg';
import { Colors } from '../theme/colors';
import { PaintArtworkFooter } from '../components/BrandArtwork';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DashboardScreen({
  user,
  onNavigateToHistory,
  onLogout,
}) {
  const [date, setDate] = useState(new Date(2026, 9, 3));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = d =>
    d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const onDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selected) {
      setDate(selected);
    }
  };

  const handleAvatarPress = () => {
    Alert.alert(
      'Account Session',
      `Logged in as: ${user?.name || user?.username || 'Admin'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: onLogout },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.dashboardContent}>
        {/* Top Header: User Profile Greeting & Avatar */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greetingText}>
              Hello,{' '}
              <Text style={styles.adminHighlight}>{user?.name || 'Admin'}</Text>
            </Text>
            <Text style={styles.dateSubtitle}>Tue, October 3, 2026</Text>
          </View>

          {/* User Avatar with Emerald Active Dot */}
          <TouchableOpacity
            style={styles.avatarWrap}
            activeOpacity={0.8}
            onPress={handleAvatarPress}
          >
            <View style={styles.avatarCircle}>
              <Image
                source={require('../assets/logo3.png')}
                style={styles.avatarLogo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.onlineDot} />
          </TouchableOpacity>
        </View>

        {/* Date Filter Pill */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.dateFilterPill}
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
          >
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="#64748B"
                strokeWidth={2}
              />
              <Line
                x1="16"
                y1="2"
                x2="16"
                y2="6"
                stroke="#64748B"
                strokeWidth={2}
              />
              <Line
                x1="8"
                y1="2"
                x2="8"
                y2="6"
                stroke="#64748B"
                strokeWidth={2}
              />
              <Line
                x1="3"
                y1="10"
                x2="21"
                y2="10"
                stroke="#64748B"
                strokeWidth={2}
              />
            </Svg>

            <Text style={styles.dateFilterText}>{formatDate(date)}</Text>
            <Text style={styles.dropdownCaret}>▾</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={onDateChange}
          />
        )}

        {/* 2x2 KPI Metrics Grid */}
        <View style={styles.kpiGrid}>
          {/* KPI 1: Total Sales */}
          <View style={styles.kpiCard}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#3B82F6' }]}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Circle
                  cx="9"
                  cy="21"
                  r="1"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                />
                <Circle
                  cx="20"
                  cy="21"
                  r="1"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                />
                <Path
                  d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                />
              </Svg>
            </View>

            <Text style={styles.kpiLabel}>Total Sales</Text>
            <Text style={styles.kpiValue}>Rs 121,250</Text>

            <View style={[styles.badgePill, { backgroundColor: '#ECFDF5' }]}>
              <Text style={[styles.badgeText, { color: '#059669' }]}>
                ▲ +12.5%
              </Text>
            </View>

            {/* Sparkline wave background */}
            <View style={styles.sparklineContainer}>
              <Svg width={80} height={35} viewBox="0 0 100 45">
                <Path
                  d="M0 38 Q 25 35, 45 25 T 85 10 L 100 20 L 100 45 L 0 45 Z"
                  fill="#EBF4FE"
                />
                <Path
                  d="M0 38 Q 25 35, 45 25 T 85 10 L 100 20"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth={2}
                />
              </Svg>
            </View>
          </View>

          {/* KPI 2: Transport Charges */}
          <View style={styles.kpiCard}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#F59E0B' }]}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Rect
                  x="1"
                  y="3"
                  width="15"
                  height="13"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
                <Polygon
                  points="16,8 20,8 23,11 23,16 16,16 16,8"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  fill="#FFFFFF"
                />
              </Svg>
            </View>

            <Text style={styles.kpiLabel}>Transport Charges</Text>
            <Text style={styles.kpiValue}>Rs 500</Text>

            <View style={[styles.badgePill, { backgroundColor: '#ECFDF5' }]}>
              <Text style={[styles.badgeText, { color: '#059669' }]}>
                ▲ +5.2%
              </Text>
            </View>

            <View style={styles.sparklineContainer}>
              <Svg width={80} height={35} viewBox="0 0 100 45">
                <Path
                  d="M0 40 Q 30 38, 50 30 T 90 12 L 100 18 L 100 45 L 0 45 Z"
                  fill="#FFF3E0"
                />
                <Path
                  d="M0 40 Q 30 38, 50 30 T 90 12 L 100 18"
                  fill="none"
                  stroke="#FBBF24"
                  strokeWidth={2}
                />
              </Svg>
            </View>
          </View>

          {/* KPI 3: Total Returns */}
          <View style={styles.kpiCard}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#10B981' }]}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Polyline
                  points="17 1 21 5 17 9"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                />
                <Path
                  d="M3 11V9a4 4 0 014-4h14"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                />
                <Polyline
                  points="7 23 3 19 7 15"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                />
                <Path
                  d="M21 13v2a4 4 0 01-4 4H3"
                  stroke="#FFFFFF"
                  strokeWidth={2.2}
                />
              </Svg>
            </View>

            <Text style={styles.kpiLabel}>Total Returns</Text>
            <Text style={styles.kpiValue}>Rs 108,880</Text>

            <View style={[styles.badgePill, { backgroundColor: '#FFF1F2' }]}>
              <Text style={[styles.badgeText, { color: '#E11D48' }]}>
                ▼ +8.3%
              </Text>
            </View>

            <View style={styles.sparklineContainer}>
              <Svg width={80} height={35} viewBox="0 0 100 45">
                <Path
                  d="M0 38 Q 30 35, 55 24 T 85 14 L 100 22 L 100 45 L 0 45 Z"
                  fill="#E8F8F5"
                />
                <Path
                  d="M0 38 Q 30 35, 55 24 T 85 14 L 100 22"
                  fill="none"
                  stroke="#34D399"
                  strokeWidth={2}
                />
              </Svg>
            </View>
          </View>

          {/* KPI 4: Net */}
          <View style={styles.kpiCard}>
            <View style={[styles.kpiIconWrap, { backgroundColor: '#F43F5E' }]}>
              <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
                <Polyline
                  points="14 2 14 8 20 8"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                />
              </Svg>
            </View>

            <Text style={styles.kpiLabel}>Net</Text>
            <Text style={styles.kpiValue}>Rs 11,870</Text>

            <View style={[styles.badgePill, { backgroundColor: '#ECFDF5' }]}>
              <Text style={[styles.badgeText, { color: '#059669' }]}>
                ▲ +15.7%
              </Text>
            </View>

            <View style={styles.sparklineContainer}>
              <Svg width={80} height={35} viewBox="0 0 100 45">
                <Path
                  d="M0 42 Q 35 40, 60 28 T 90 8 L 100 16 L 100 45 L 0 45 Z"
                  fill="#FDECEF"
                />
                <Path
                  d="M0 42 Q 35 40, 60 28 T 90 8 L 100 16"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth={2}
                />
              </Svg>
            </View>
          </View>
        </View>

        {/* =====================================================
            Recent Transactions Card
            ===================================================== */}
        <View style={styles.transactionsCard}>
          {/* Transaction Card Header */}
          <View style={styles.tableHeaderRow}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>

            <TouchableOpacity onPress={onNavigateToHistory}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Table Columns - FIXED */}
          <View style={styles.tableHead}>
            <Text style={[styles.thText, { flex: 1.2 }]}>ORDER</Text>

            <Text style={[styles.thText, { flex: 2.2 }]}>ITEM</Text>

            <Text
              style={[
                styles.thText,
                {
                  flex: 1.2,
                  textAlign: 'right',
                },
              ]}
            >
              QTY
            </Text>

            <Text
              style={[
                styles.thText,
                {
                  flex: 1.8,
                  textAlign: 'right',
                },
              ]}
            >
              AMOUNT
            </Text>
          </View>

          {/* =================================================
              INNER TRANSACTION SCROLL
              
              ONLY THIS SECTION SCROLLS.
              ================================================= */}
          <ScrollView
            style={styles.transactionsScroll}
            contentContainerStyle={styles.transactionsScrollContent}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            persistentScrollbar={true}
          >
            {/* Table Row 1 */}
            <View style={styles.tableRow}>
              <Text style={[styles.orderCell, { flex: 1.2 }]}>#8492</Text>

              <Text style={[styles.itemCell, { flex: 2.2 }]}>
                Diamond Paints 20L
              </Text>

              <Text
                style={[
                  styles.qtyCell,
                  {
                    flex: 1.2,
                  },
                ]}
              >
                3 Cans
              </Text>

              <Text
                style={[
                  styles.amountCell,
                  {
                    flex: 1.8,
                  },
                ]}
              >
                Rs 24,500
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.orderCell, { flex: 1.2 }]}>#8492</Text>

              <Text style={[styles.itemCell, { flex: 2.2 }]}>
                Diamond Paints 20L
              </Text>

              <Text
                style={[
                  styles.qtyCell,
                  {
                    flex: 1.2,
                  },
                ]}
              >
                3 Cans
              </Text>

              <Text
                style={[
                  styles.amountCell,
                  {
                    flex: 1.8,
                  },
                ]}
              >
                Rs 24,500
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.orderCell, { flex: 1.2 }]}>#8492</Text>

              <Text style={[styles.itemCell, { flex: 2.2 }]}>
                Diamond Paints 20L
              </Text>

              <Text
                style={[
                  styles.qtyCell,
                  {
                    flex: 1.2,
                  },
                ]}
              >
                3 Cans
              </Text>

              <Text
                style={[
                  styles.amountCell,
                  {
                    flex: 1.8,
                  },
                ]}
              >
                Rs 24,500
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.orderCell, { flex: 1.2 }]}>#8492</Text>

              <Text style={[styles.itemCell, { flex: 2.2 }]}>
                Diamond Paints 20L
              </Text>

              <Text
                style={[
                  styles.qtyCell,
                  {
                    flex: 1.2,
                  },
                ]}
              >
                3 Cans
              </Text>

              <Text
                style={[
                  styles.amountCell,
                  {
                    flex: 1.8,
                  },
                ]}
              >
                Rs 24,500
              </Text>
            </View>

            {/* Table Row 2 */}
            <View style={styles.tableRow}>
              <Text style={[styles.orderCell, { flex: 1.2 }]}>#8491</Text>

              <Text style={[styles.itemCell, { flex: 2.2 }]}>
                Solvent Thinner 5L
              </Text>

              <Text
                style={[
                  styles.qtyCell,
                  {
                    flex: 1.2,
                  },
                ]}
              >
                10 Btls
              </Text>

              <Text
                style={[
                  styles.amountCell,
                  {
                    flex: 1.8,
                  },
                ]}
              >
                Rs 8,200
              </Text>
            </View>

            {/* Table Row 3 */}
            <View style={styles.tableRow}>
              <Text style={[styles.orderCell, { flex: 1.2 }]}>#8490</Text>

              <Text style={[styles.itemCell, { flex: 2.2 }]}>
                Wood Enamel Gloss
              </Text>

              <Text
                style={[
                  styles.qtyCell,
                  {
                    flex: 1.2,
                  },
                ]}
              >
                6 Cans
              </Text>

              <Text
                style={[
                  styles.amountCell,
                  {
                    flex: 1.8,
                  },
                ]}
              >
                Rs 14,800
              </Text>
            </View>

            {/* Table Row 4 */}
            <View
              style={[
                styles.tableRow,
                {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text style={[styles.orderCell, { flex: 1.2 }]}>#8489</Text>

              <Text style={[styles.itemCell, { flex: 2.2 }]}>
                Exterior Primer
              </Text>

              <Text
                style={[
                  styles.qtyCell,
                  {
                    flex: 1.2,
                  },
                ]}
              >
                8 Bckts
              </Text>

              <Text
                style={[
                  styles.amountCell,
                  {
                    flex: 1.8,
                  },
                ]}
              >
                Rs 31,450
              </Text>
            </View>
          </ScrollView>
        </View>

        {/* Space for bottom decorative art and navigation */}
        <View style={{ height: 160 }} />
      </View>

      {/* Decorative Bottom Paint Artwork */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  dashboardContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // scrollView: {
  //   flex: 1,
  // },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,

    /*
      Keeps the bottom of the dashboard clear of the
      fixed decorative paint artwork.
    */
    paddingBottom: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  greetingText: {
    fontSize: 22,
    fontWeight: '400',
    color: '#1E293B',
  },

  adminHighlight: {
    fontWeight: '800',
    color: '#0D1E3A',
  },

  dateSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 2,
  },

  avatarWrap: {
    position: 'relative',
  },

  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },

  avatarLogo: {
    width: 40,
    height: 40,
  },

  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 14,
  },

  dateFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    gap: 6,
  },

  dateFilterText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },

  dropdownCaret: {
    fontSize: 10,
    color: '#94A3B8',
  },

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },

  kpiCard: {
    width: '48%',
    height: 132,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
    overflow: 'hidden',
  },

  kpiIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  kpiLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 4,
  },

  kpiValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  badgePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },

  sparklineContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
  },

  /* =============================================================
     RECENT TRANSACTIONS
     ============================================================= */

  //   footerOverlay: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   height: 140,
  //   overflow: 'hidden',
  //   zIndex: 0,
  // },

  scrollView: {
    flex: 1,
    zIndex: 1,
  },

  transactionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,

    height: 230,
    overflow: 'hidden',
    zIndex: 2,
  },

  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },

  seeAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0062E0',
  },

  tableHead: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
    marginBottom: 4,
  },

  thText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
  },

  /*
    NEW:
    This ScrollView is the ONLY part of Recent Transactions
    that scrolls.
  */
  transactionsScroll: {
    flex: 1,
  },

  transactionsScrollContent: {
    paddingBottom: 4,
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },

  orderCell: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
  },

  itemCell: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
  },

  qtyCell: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'right',
  },

  amountCell: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
  },

  /*
    FIXED BOTTOM PAINT ARTWORK

    Kept visually the same as your original code,
    but moved into a named style so the layout is easier
    to control.
  */
  footerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
    overflow: 'hidden',
  },
});
