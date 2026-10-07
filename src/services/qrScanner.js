import { NativeModules } from 'react-native';

/**
 * Opens Google's built-in QR scanner (Play services Code Scanner).
 * Resolves with the scanned text, or null if the user backed out.
 */
export function openQrScanner() {
  return NativeModules.QrScanner.scan();
}
