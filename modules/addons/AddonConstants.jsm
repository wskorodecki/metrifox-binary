/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

this.EXPORTED_SYMBOLS = [ "ADDON_SIGNING", "REQUIRE_SIGNING" ];

// Make these non-changable properties so they can't be manipulated from other
// code in the app.
Object.defineProperty(this, "ADDON_SIGNING", {
  configurable: false,
  enumerable: false,
  writable: false,
//@line 16 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/mozapps/extensions/internal/AddonConstants.jsm"
  value: true,
//@line 20 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/mozapps/extensions/internal/AddonConstants.jsm"
});

Object.defineProperty(this, "REQUIRE_SIGNING", {
  configurable: false,
  enumerable: false,
  writable: false,
//@line 29 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/mozapps/extensions/internal/AddonConstants.jsm"
  value: false,
//@line 31 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/mozapps/extensions/internal/AddonConstants.jsm"
});
