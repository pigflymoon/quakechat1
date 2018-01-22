package com.quakechat;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import cl.json.RNSharePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BackgroundTaskPackage(),
            new BackgroundTimerPackage(),
            new RNFetchBlobPackage(),
            new RNDeviceInfo(),
            new RNSharePackage(),
            new ReactNativePushNotificationPackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new ReactNativePushNotificationPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
