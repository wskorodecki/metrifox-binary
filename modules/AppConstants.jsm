//@line 2 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Services", "resource://gre/modules/Services.jsm");

this.EXPORTED_SYMBOLS = ["AppConstants"];

// Immutable for export.
this.AppConstants = Object.freeze({
  // See this wiki page for more details about channel specific build
  // defines: https://wiki.mozilla.org/Platform/Channel-specific_build_defines
  NIGHTLY_BUILD:
//@line 21 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 23 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  RELEASE_BUILD:
//@line 26 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 30 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  ACCESSIBILITY:
//@line 33 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 37 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  // Official corresponds, roughly, to whether this build is performed
  // on Mozilla's continuous integration infrastructure. You should
  // disable developer-only functionality when this flag is set.
  MOZILLA_OFFICIAL:
//@line 45 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 47 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_OFFICIAL_BRANDING:
//@line 52 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 54 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_SERVICES_HEALTHREPORT:
//@line 57 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 61 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_DATA_REPORTING:
//@line 64 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 68 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_DEVICES:
//@line 73 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 75 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_SAFE_BROWSING:
//@line 78 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 82 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_SANDBOX:
//@line 85 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 89 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_TELEMETRY_REPORTING:
//@line 94 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 96 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_TELEMETRY_ON_BY_DEFAULT:
//@line 101 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 103 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_SERVICES_CLOUDSYNC:
//@line 106 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 110 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_UPDATER:
//@line 113 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 117 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_SWITCHBOARD:
//@line 122 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 124 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_WEBRTC:
//@line 127 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 131 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

//@line 133 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  MOZ_B2G:
//@line 137 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 139 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

//@line 142 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  platform:
//@line 144 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  "linux",
//@line 160 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  isPlatformAndVersionAtLeast(platform, version) {
    let platformVersion = Services.sysinfo.getProperty("version");
    return platform == this.platform &&
           Services.vc.compare(platformVersion, version) >= 0;
  },

  isPlatformAndVersionAtMost(platform, version) {
    let platformVersion = Services.sysinfo.getProperty("version");
    return platform == this.platform &&
           Services.vc.compare(platformVersion, version) <= 0;
  },

  MOZ_CRASHREPORTER:
//@line 175 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 179 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_VERIFY_MAR_SIGNATURE:
//@line 184 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 186 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_MAINTENANCE_SERVICE:
//@line 191 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 193 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  E10S_TESTING_ONLY:
//@line 198 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 200 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  DEBUG:
//@line 205 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 207 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_B2G_RIL:
//@line 212 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 214 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_B2GDROID:
//@line 219 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 221 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_GRAPHENE:
//@line 226 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 228 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_PLACES:
//@line 231 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  true,
//@line 235 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  MOZ_ANDROID_HISTORY:
//@line 240 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  false,
//@line 242 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"

  DLL_PREFIX: "lib",
  DLL_SUFFIX: ".so",

  MOZ_APP_NAME: "metrifox",
  MOZ_APP_VERSION: "45.0.2",
  MOZ_APP_VERSION_DISPLAY: "45.0.2",
  MOZ_BUILD_APP: "browser",
  MOZ_MACBUNDLE_NAME: "Nightly.app",
  MOZ_UPDATE_CHANNEL: "default",
  INSTALL_LOCALE: "en-US",
  MOZ_WIDGET_TOOLKIT: "gtk2",
  ANDROID_PACKAGE_NAME: "",
  MOZ_B2G_VERSION: "1.0.0",
  MOZ_B2G_OS_NAME: "",

  MOZ_ANDROID_APZ:
//@line 262 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
    false,
//@line 264 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/modules/AppConstants.jsm"
  DEBUG_JS_MODULES: "",

  // URL to the hg revision this was built from (e.g.
  // "https://hg.mozilla.org/mozilla-central/rev/6256ec9113c1")
  // On unofficial builds, this is an empty string.
  SOURCE_REVISION_URL: ""
});
