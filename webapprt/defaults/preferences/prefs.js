/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// Check for updates once a day.
pref("webapprt.app_update_interval", 86400);

pref("browser.chromeURL", "chrome://webapprt/content/webapp.xul");
pref("browser.download.folderList", 1);

// Disable all add-on locations other than the profile (which can't be disabled this way)
pref("extensions.enabledScopes", 1);
// Auto-disable any add-ons that are "dropped in" to the profile
pref("extensions.autoDisableScopes", 1);
// Disable add-on installation via the web-exposed APIs
pref("xpinstall.enabled", false);
// Disable installation of distribution add-ons
pref("extensions.installDistroAddons", false);
// Disable the add-on compatibility dialog
pref("extensions.showMismatchUI", false);

// Set reportURL for crashes
pref("breakpad.reportURL", "https://crash-stats.mozilla.com/report/index/");

// Blocklist preferences
pref("extensions.blocklist.enabled", true);
pref("extensions.blocklist.interval", 86400);
// Controls what level the blocklist switches from warning about items to forcibly
// blocking them.
pref("extensions.blocklist.level", 2);
pref("extensions.blocklist.url", "https://blocklist.addons.mozilla.org/blocklist/3/%APP_ID%/%APP_VERSION%/%PRODUCT%/%BUILD_ID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/%PING_COUNT%/%TOTAL_PING_COUNT%/%DAYS_SINCE_LAST_PING%/");
pref("extensions.blocklist.detailsURL", "https://www.mozilla.com/%LOCALE%/blocklist/");
pref("extensions.blocklist.itemURL", "https://blocklist.addons.mozilla.org/%LOCALE%/%APP%/blocked/%blockID%");

pref("full-screen-api.enabled", true);

// IndexedDB
pref("dom.indexedDB.enabled", true);

// Offline cache prefs
pref("browser.offline-apps.notify", false);
pref("browser.cache.offline.enable", true);
pref("offline-apps.allow_by_default", true);

// TCPSocket
pref("dom.mozTCPSocket.enabled", true);

// Enable smooth scrolling
pref("general.smoothScroll", true);

// WebPayment
pref("dom.mozPay.enabled", false);

// System messages
pref("dom.sysmsg.enabled", true);

// Alarm API
pref("dom.mozAlarms.enabled", true);

// Disable slow script dialog for apps
pref("dom.max_script_run_time", 0);
pref("dom.max_chrome_script_run_time", 0);

// The request URL of the GeoLocation backend
pref("geo.wifi.uri", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");

//@line 75 "/home/wojtek/Repositories/firefox-45.0.2/webapprt/prefs.js"

// Enable window resize and move
pref("dom.always_allow_move_resize_window", true);

// Disable all plugins.  This has to be a non-empty string to disable plugins;
// otherwise, nsPluginHost::IsTypeWhitelisted assumes all plugins are enabled.
pref("plugin.allowed_types", " ");
// Suppress the check for outdated plugins from opening a window.
pref("extensions.blocklist.suppressUI", true);

// The default for this pref reflects whether the build is capable of IPC.
// (Turning it on in a no-IPC build will have no effect.)
//@line 94 "/home/wojtek/Repositories/firefox-45.0.2/webapprt/prefs.js"
pref("dom.ipc.plugins.enabled", true);
//@line 96 "/home/wojtek/Repositories/firefox-45.0.2/webapprt/prefs.js"

pref("places.database.growthIncrementKiB", 0);
