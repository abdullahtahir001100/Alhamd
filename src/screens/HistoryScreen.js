import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PaintArtworkFooter } from '../components/BrandArtwork';

const formatDate = (d, withYear) =>
  d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(withYear ? { year: 'numeric' } : {}),
  });

const SAMPLE_HISTORY = [
  {
    id: '8492',
    item: 'Diamond Paints 20L',
    type: 'sales',
    qty: '3 Cans',
    amount: 'Rs 24,500',
    date: 'Oct 3 • 10:45 AM',
    client: 'Malik Builders',
    status: 'Completed',
  },
  {
    id: '8491',
    item: 'Solvent Thinner 5L',
    type: 'sales',
    qty: '10 Bottles',
    amount: 'Rs 8,200',
    date: 'Oct 3 • 09:20 AM',
    client: 'Al-Rehman Paint Co',
    status: 'Completed',
  },
  {
    id: '8490',
    item: 'Wood Enamel Gloss',
    type: 'sales',
    qty: '6 Cans',
    amount: 'Rs 14,800',
    date: 'Oct 3 • 08:50 AM',
    client: 'Apex Interiors',
    status: 'Completed',
  },
  {
    id: '8489',
    item: 'Exterior Wall Primer',
    type: 'sales',
    qty: '8 Buckets',
    amount: 'Rs 31,450',
    date: 'Oct 2 • 05:15 PM',
    client: 'Shalimar Heights',
    status: 'Completed',
  },
  {
    id: '8488',
    item: 'Synthetic Undercoat',
    type: 'sales',
    qty: '5 Gallons',
    amount: 'Rs 12,300',
    date: 'Oct 2 • 03:40 PM',
    client: 'City Hardware',
    status: 'Completed',
  },
  {
    id: '8487',
    item: 'Red Oxide Primer',
    type: 'sales',
    qty: '4 Buckets',
    amount: 'Rs 9,600',
    date: 'Oct 2 • 01:10 PM',
    client: 'Al-Madina Freight',
    status: 'Delivered',
  },
  {
    id: '8486',
    item: 'Matt Finish White 10L',
    type: 'sales',
    qty: '2 Cans',
    amount: 'Rs 18,200',
    date: 'Oct 1 • 04:30 PM',
    client: 'Home Builders',
    status: 'Completed',
  },
  {
    id: '8485',
    item: 'Gloss Enamel Black',
    type: 'returns',
    qty: '1 Can',
    amount: 'Rs 2,450',
    date: 'Oct 1 • 11:20 AM',
    client: 'City Hardware',
    status: 'Returned',
  },
];

export default function HistoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [fromDate, setFromDate] = useState(new Date(2026, 9, 1));
  const [toDate, setToDate] = useState(new Date(2026, 9, 3));
  // null | 'from' | 'to'
  const [pickerStep, setPickerStep] = useState(null);

  const onDateChange = (event, selected) => {
    if (event.type !== 'set' || !selected) {
      setPickerStep(null);
      return;
    }
    if (pickerStep === 'from') {
      setFromDate(selected);
      if (selected > toDate) setToDate(selected);
      setPickerStep('to');
    } else {
      setToDate(selected);
      setPickerStep(null);
    }
  };

  const filteredItems = SAMPLE_HISTORY.filter(item => {
    const matchesSearch =
      item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.includes(searchQuery) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && item.type === activeFilter;
  });

  return (
    <View style={styles.container}>
      {/* Same artwork as Login screen */}
      <PaintArtworkFooter />

      {pickerStep && (
        <DateTimePicker
          key={pickerStep}
          value={pickerStep === 'from' ? fromDate : toDate}
          mode="date"
          display="default"
          minimumDate={pickerStep === 'to' ? fromDate : undefined}
          maximumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      <View style={{ flex: 1, zIndex: 2 }}>
        {/* Header Area */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.headerTitle}>
                Transaction <Text style={{ color: 'red' }}>History</Text>
              </Text>
              <Text style={styles.headerSubtitle}>
                Al-Hamad Traders • Paints & Hardware
              </Text>
            </View>

            {/* Date Range Pill */}
            <TouchableOpacity
              style={styles.datePill}
              onPress={() => setPickerStep('from')}
            >
              <Svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748B"
                strokeWidth={2}
              >
                <Path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <Text style={styles.datePillText}>
                {formatDate(fromDate)} - {formatDate(toDate, true)}
              </Text>
              <Svg
                width={12}
                height={12}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748B"
                strokeWidth={2.5}
              >
                <Path
                  d="M19 9l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Search Row */}
          <View style={styles.searchRow}>
            <View style={styles.searchInputWrap}>
              <Svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth={2.2}
                style={styles.searchIcon}
              >
                <Path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <TextInput
                style={styles.searchInput}
                placeholder="Search order #, item, client..."
                placeholderTextColor="black"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <TouchableOpacity style={styles.filterBtn}>
              <Svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth={2}
              >
                <Path
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Filter Quick Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pillsScroll}
          >
            <TouchableOpacity
              style={[styles.pill, activeFilter === 'all' && styles.pillActive]}
              onPress={() => setActiveFilter('all')}
            >
              <Text
                style={[
                  styles.pillText,
                  activeFilter === 'all' && styles.pillTextActive,
                ]}
              >
                All Orders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pill,
                activeFilter === 'sales' && styles.pillActive,
              ]}
              onPress={() => setActiveFilter('sales')}
            >
              <Text
                style={[
                  styles.pillText,
                  activeFilter === 'sales' && styles.pillTextActive,
                ]}
              >
                Sales (Rs 121k)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pill,
                activeFilter === 'returns' && styles.pillActive,
              ]}
              onPress={() => setActiveFilter('returns')}
            >
              <Text
                style={[
                  styles.pillText,
                  activeFilter === 'returns' && styles.pillTextActive,
                ]}
              >
                Returns
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.pill,
                activeFilter === 'transport' && styles.pillActive,
              ]}
              onPress={() => setActiveFilter('transport')}
            >
              <Text
                style={[
                  styles.pillText,
                  activeFilter === 'transport' && styles.pillTextActive,
                ]}
              >
                Transport
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Transaction Table */}
        <View style={styles.listContainer}>
          <View style={styles.transactionsCard}>
            {/* Card Header */}
            <View style={styles.tableHeaderInfo}>
              <View style={styles.recordCountWrap}>
                <View style={styles.pulseDot} />
                <Text style={styles.recordCountText}>
                  Records • {filteredItems.length} Transactions
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.exportText}>Export CSV</Text>
              </TouchableOpacity>
            </View>

            {/* Table Headers */}
            <View style={styles.tableHeaderRow}>
              <View style={[styles.col, styles.col2]}>
                <Text style={styles.thText}>ORDER</Text>
              </View>
              <View style={[styles.col, styles.col5, { paddingLeft: 4 }]}>
                <Text style={styles.thText}>ITEM</Text>
              </View>
              <View style={[styles.col, styles.col2, styles.alignRight]}>
                <Text style={styles.thText}>QTY</Text>
              </View>
              <View style={[styles.col, styles.col3, styles.alignRight]}>
                <Text style={styles.thText}>AMOUNT</Text>
              </View>
            </View>

            {/* Table Rows */}
            {/* Table Rows - Inner Scroll */}
            <ScrollView
              style={styles.rowsScroll}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
            >
              {filteredItems.map((item, index) => {
                const isReturn = item.type === 'returns';
                return (
                  <View key={item.id} style={styles.tableRow}>
                    <View style={[styles.col, styles.col2]}>
                      <Text
                        style={[
                          styles.tdOrder,
                          isReturn && { color: '#F43F5E' },
                        ]}
                      >
                        #{item.id}
                      </Text>
                    </View>
                    <View style={[styles.col, styles.col5, { paddingLeft: 4 }]}>
                      <View style={styles.itemTitleWrap}>
                        <Text style={styles.tdItemTitle} numberOfLines={1}>
                          {item.item}
                        </Text>
                        {isReturn && (
                          <View style={styles.retBadge}>
                            <Text style={styles.retBadgeText}>Ret</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.tdItemSub}>{item.date}</Text>
                    </View>
                    <View style={[styles.col, styles.col2, styles.alignRight]}>
                      <Text style={styles.tdQty}>{item.qty}</Text>
                    </View>
                    <View style={[styles.col, styles.col3, styles.alignRight]}>
                      <Text
                        style={[
                          styles.tdAmount,
                          isReturn && { color: '#F43F5E' },
                        ]}
                      >
                        {isReturn ? `-${item.amount}` : item.amount}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            {/* Table Footer */}
            <View style={styles.tableFooter}>
              <Text style={styles.tableFooterText}>
                Showing {filteredItems.length} of {SAMPLE_HISTORY.length} items
              </Text>
              <TouchableOpacity style={styles.loadMoreBtn}>
                <Text style={styles.loadMoreText}>Load More</Text>
                <Svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0267F6"
                  strokeWidth={2.5}
                >
                  <Path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 180 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0c1e3d',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    marginTop: 2,
  },
  datePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  datePillText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#475569',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  searchInputWrap: {
    flex: 1,
    height: 38,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    shadowColor: '#091E42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    padding: 0,
  },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pillsScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
    paddingBottom: 8,
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.7)',
  },
  pillActive: {
    backgroundColor: 'black',
    borderColor: 'red',
    // shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 80,
  },
  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    shadowColor: '#091E42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
    
  },
  rowsScroll: {
  maxHeight: 320,
  flexGrow: 0,
},
  tableHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  recordCountWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  recordCountText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.3,
  },
  exportText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0267F6',
    letterSpacing: -0.2,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(241, 245, 249, 0.8)',
    marginTop: 8,
  },
  col: {
    justifyContent: 'center',
  },
  col2: { flex: 2 },
  col5: { flex: 5 },
  col3: { flex: 3 },
  alignRight: {
    alignItems: 'flex-end',
  },
  thText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(241, 245, 249, 0.7)',
    alignItems: 'center',
  },
  tdOrder: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  itemTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tdItemTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1E293B',
  },
  retBadge: {
    backgroundColor: '#FFF1F2',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  retBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#F43F5E',
  },
  tdItemSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  tdQty: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  tdAmount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  tableFooterText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  loadMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loadMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0267F6',
  },
});
