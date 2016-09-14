/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const {classes: Cc, interfaces: Ci, utils: Cu, results: Cr} = Components;

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

XPCOMUtils.defineLazyServiceGetter(this, "cpmm",
                                   "@mozilla.org/childprocessmessagemanager;1",
                                   "nsIMessageSender");

XPCOMUtils.defineLazyServiceGetter(this, "uuidgen",
                                   "@mozilla.org/uuid-generator;1",
                                   "nsIUUIDGenerator");


const PREF_DEBUG = "dom.payment.debug";

var _debug;
try {
  _debug = Services.prefs.getPrefType(PREF_DEBUG) == Ci.nsIPrefBranch.PREF_BOOL
           && Services.prefs.getBoolPref(PREF_DEBUG);
} catch(e) {
  _debug = false;
}

function DEBUG(s) {
  if (!_debug) {
    return;
  }
  dump("== Payment Provider == " + s + "\n");
}

function DEBUG_E(s) {
  dump("== Payment Provider ERROR == " + s + "\n");
}

const kPaymentFlowCancelled = "payment-flow-cancelled";

function PaymentProvider() {
}

PaymentProvider.prototype = {
  init: function(aWindow) {
    let docshell = aWindow.QueryInterface(Ci.nsIInterfaceRequestor)
                          .getInterface(Ci.nsIWebNavigation)
                          .QueryInterface(Ci.nsIDocShell);
    this._requestId = docshell.paymentRequestId;
    this._oncancelObserver = this.oncancel.bind(this);
    Services.obs.addObserver(this._oncancelObserver,
                             kPaymentFlowCancelled,
                             false);
    this._strategy = Cc["@mozilla.org/payment/provider-strategy;1"]
                       .createInstance(Ci.nsIPaymentProviderStrategy);
    this._window = aWindow;
  },

  paymentSuccess: function(aResult) {
    _debug && DEBUG("paymentSuccess " + aResult);
    let glue = Cc["@mozilla.org/payment/ui-glue;1"]
                 .createInstance(Ci.nsIPaymentUIGlue);
    glue.closePaymentFlow(this._requestId).then(() => {
      if (!this._requestId) {
        return;
      }
      cpmm.sendAsyncMessage("Payment:Success", { result: aResult,
                                                 requestId: this._requestId });
    });
  },

  paymentFailed: function(aError) {
    _debug && DEBUG("paymentFailed " + aError);
    let glue = Cc["@mozilla.org/payment/ui-glue;1"]
                 .createInstance(Ci.nsIPaymentUIGlue);
    glue.closePaymentFlow(this._requestId).then(() => {
      if (!this._requestId) {
        return;
      }
      cpmm.sendAsyncMessage("Payment:Failed", { errorMsg: aError,
                                                requestId: this._requestId });
    });

  },

  get paymentServiceId() {
    return this._strategy.paymentServiceId;
  },

  set paymentServiceId(aServiceId) {
    this._strategy.paymentServiceId = aServiceId;
  },

  /**
   * We expose to the payment provider the information of all the SIMs
   * available in the device. iccInfo is an object of this form:
   * {
   *   "serviceId1": {
   *      mcc: <string>,
   *      mnc: <string>,
   *      iccId: <string>,
   *      dataPrimary: <boolean>
   *    },
   *   "serviceIdN": {...}
   * }
   */
  get iccInfo() {
    return this._strategy.iccInfo;
  },

  oncancel: function() {
    _debug && DEBUG("Cleaning up!");

    this._strategy.cleanup();
    Services.obs.removeObserver(this._oncancelObserver, kPaymentFlowCancelled);
    if (this._cleanup) {
      this._cleanup();
    }
  },

  classID: Components.ID("{82144756-72ab-45b7-8621-f3dad431dd2f}"),

  contractID: "@mozilla.org/payment/provider;1",

  QueryInterface: XPCOMUtils.generateQI([Ci.nsISupports,
                                         Ci.nsIObserver,
                                         Ci.nsIDOMGlobalPropertyInitializer])
};

//@line 291 "/home/wojtek/Repositories/firefox-45.0.2/dom/payment/PaymentProvider.js"

PaymentProvider.prototype.sendSilentSms = function(aNumber, aMessage) {
  throw Cr.NS_ERROR_NOT_IMPLEMENTED;
};

PaymentProvider.prototype.observeSilentSms = function(aNumber, aCallback) {
  throw Cr.NS_ERROR_NOT_IMPLEMENTED;
};

PaymentProvider.prototype.removeSilentSmsObserver = function(aNumber, aCallback) {
  throw Cr.NS_ERROR_NOT_IMPLEMENTED;
};

//@line 305 "/home/wojtek/Repositories/firefox-45.0.2/dom/payment/PaymentProvider.js"

this.NSGetFactory = XPCOMUtils.generateNSGetFactory([PaymentProvider]);
