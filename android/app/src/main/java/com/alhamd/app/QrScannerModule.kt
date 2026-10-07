package com.alhamd.app

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning

/**
 * Thin bridge to Google's built-in Code Scanner (Google Play services).
 * Google renders the scanner UI itself, auto-captures the QR, and returns the value.
 */
class QrScannerModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "QrScanner"

  @ReactMethod
  fun scan(promise: Promise) {
    val activity = reactContext.currentActivity
    if (activity == null) {
      promise.reject("NO_ACTIVITY", "No activity")
      return
    }
    val options = GmsBarcodeScannerOptions.Builder()
      .setBarcodeFormats(Barcode.FORMAT_QR_CODE)
      .enableAutoZoom()
      .build()
    GmsBarcodeScanning.getClient(activity, options)
      .startScan()
      .addOnSuccessListener { promise.resolve(it.rawValue) }
      .addOnCanceledListener { promise.resolve(null) }
      .addOnFailureListener { promise.reject("SCAN_FAILED", it.message, it) }
  }
}
