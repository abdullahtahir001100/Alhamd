import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import BottomNavBar from './src/components/BottomNavBar';
import { openQrScanner } from './src/services/qrScanner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const handleScan = async () => {
    try {
      await openQrScanner();
    } catch (e) {
      // scanner unavailable / failed – just stay on home
    }
    setActiveTab('home');
  };

  const screenBg = activeTab === 'home' ? '#F5F7FB' : '#F3F6FA';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {!isAuthenticated ? (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: '#F8FBFE' }]} edges={[]}>
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: screenBg }]} edges={['top']}>
          <View style={styles.screenContainer}>
            {activeTab === 'home' ? (
              <DashboardScreen
                user={currentUser}
                onNavigateToHistory={() => setActiveTab('history')}
                onLogout={handleLogout}
              />
            ) : (
              <HistoryScreen />
            )}
          </View>

          <SafeAreaView edges={['bottom']} style={styles.navSafe}>
            <BottomNavBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onScanPress={handleScan}
            />
          </SafeAreaView>
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
  },
  navSafe: {
    backgroundColor: '#FFFFFF',
  },
});
