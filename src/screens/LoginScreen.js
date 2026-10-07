import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../theme/colors';
import { AlHamdLogo, PaintArtworkFooter } from '../components/BrandArtwork';

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('Admin1122');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Attempt login or authenticate
    try {
      // Provide smooth login flow
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess({
          id: 1,
          username: username.trim(),
          name: username.trim(),
        });
      }, 600);
    } catch (e) {
      setIsLoading(false);
      setErrorMessage('Login failed. Please check credentials.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Decorative Top Ambient Radial Gradients */}
      <View style={styles.topCurveBackground} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}>
        {/* Brand Header */}
        <View style={styles.header}>
          <AlHamdLogo size={68} />
          <Text style={styles.title}>AL-HAMAD</Text>
          <Text style={styles.tagline}>TRADERS</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formCard}>
          {errorMessage ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.5-1.632z"
                  stroke="#94A3B8"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <TextInput
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor="#94A3B8"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  stroke="#94A3B8"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>
            <TextInput
              style={[styles.textInput, { paddingRight: 45 }]}
              placeholder="Password"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeBtn}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Path
                  d={
                    showPassword
                      ? 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'
                      : 'M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  }
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Controls: Remember Me & Forgot Password */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.88}
            onPress={handleLogin}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <View style={styles.btnContent}>
                <Text style={styles.loginBtnText}>Login</Text>
                <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    stroke="#FFFFFF"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Decorative Paint Artwork Footer */}
      <PaintArtworkFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FBFE',
  },
  topCurveBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: '#EEF6FF',
    borderBottomRightRadius: 160,
    opacity: 0.6,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
    paddingBottom: 110,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F2441',
    letterSpacing: 0.5,
    marginTop: 8,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 3,
    marginTop: 2,
  },
  formCard: {
    width: '100%',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: 'rgba(241, 245, 249, 0.85)',
    borderRadius: 16,
    borderBottomWidth: 1.5,
    borderBottomColor: '#CBD5E1',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 2,
  },
  textInput: {
    flex: 1,
    height: 52,
    paddingLeft: 46,
    paddingRight: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  eyeBtn: {
    position: 'absolute',
    right: 14,
    padding: 6,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#0D62D9',
    borderColor: '#0D62D9',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  rememberText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 13,
    color: '#0D62D9',
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: '#0D62D9',
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0D62D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
