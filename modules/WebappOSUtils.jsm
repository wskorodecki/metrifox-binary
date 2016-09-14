/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { classes: Cc, interfaces: Ci, results: Cr, utils: Cu, Constructor: CC } = Components;

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");
Cu.import("resource://gre/modules/Promise.jsm");

//@line 16 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"

this.EXPORTED_SYMBOLS = ["WebappOSUtils"];

// Returns the MD5 hash of a string.
function computeHash(aString) {
  let converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].
                  createInstance(Ci.nsIScriptableUnicodeConverter);
  converter.charset = "UTF-8";
  let result = {};
  // Data is an array of bytes.
  let data = converter.convertToByteArray(aString, result);

  let hasher = Cc["@mozilla.org/security/hash;1"].
               createInstance(Ci.nsICryptoHash);
  hasher.init(hasher.MD5);
  hasher.update(data, data.length);
  // We're passing false to get the binary hash and not base64.
  let hash = hasher.finish(false);

  function toHexString(charCode) {
    return ("0" + charCode.toString(16)).slice(-2);
  }

  // Convert the binary hash data to a hex string.
  return [toHexString(hash.charCodeAt(i)) for (i in hash)].join("");
}

this.WebappOSUtils = {
  getUniqueName: function(aApp) {
    return this.sanitizeStringForFilename(aApp.name).toLowerCase() + "-" +
           computeHash(aApp.manifestURL);
  },

//@line 80 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"

  /**
   * Returns the executable of the given app, identifying it by its unique name,
   * which is in either the new format or the old format.
   * On Mac OS X, it returns the identifier of the app.
   *
   * The new format ensures a readable and unique name for an app by combining
   * its name with a hash of its manifest URL.  The old format uses its origin,
   * which is only unique until we support multiple apps per origin.
   */
  getLaunchTarget: function(aApp) {
//@line 145 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
    let uniqueName = this.getUniqueName(aApp);

    let exeFile = Services.dirsvc.get("Home", Ci.nsIFile);
    exeFile.append("." + uniqueName);
    exeFile.append("webapprt-stub");

    // Fall back to the old installation naming scheme
    if (!exeFile.exists()) {
      exeFile = Services.dirsvc.get("Home", Ci.nsIFile);

      let origin = Services.io.newURI(aApp.origin, null, null);
      let installDir = "." + origin.scheme + ";" +
                       origin.host +
                       (origin.port != -1 ? ";" + origin.port : "");

      exeFile.append(installDir);
      exeFile.append("webapprt-stub");

      if (!exeFile.exists() ||
          !this.isOldInstallPathValid(aApp, exeFile.parent.path)) {
        return null;
      }
    }

    return exeFile;
//@line 171 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
  },

  getInstallPath: function(aApp) {
//@line 179 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
   // Firefox

//@line 192 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
    let execFile = this.getLaunchTarget(aApp);
    if (!execFile) {
      return null;
    }

    return execFile.parent.path;
//@line 199 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"

//@line 223 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
    // Anything unsupported
    throw new Error("Unsupported apps platform");
  },

  getPackagePath: function(aApp) {
    let packagePath = this.getInstallPath(aApp);

    // Only for Firefox on Mac OS X
//@line 236 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"

    return packagePath;
  },

  launch: function(aApp) {
    let uniqueName = this.getUniqueName(aApp);

//@line 277 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
    let exeFile = this.getLaunchTarget(aApp);
    if (!exeFile) {
      return false;
    }

    try {
      let process = Cc["@mozilla.org/process/util;1"]
                      .createInstance(Ci.nsIProcess);

      process.init(exeFile);
      process.runAsync([], 0);
    } catch (e) {
      return false;
    }

    return true;
//@line 294 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
  },

  uninstall: function(aApp) {
//@line 352 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
    let exeFile = this.getLaunchTarget(aApp);
    if (!exeFile) {
      return Promise.reject("App executable file not found");
    }

    let deferred = Promise.defer();

    try {
      let process = Cc["@mozilla.org/process/util;1"]
                      .createInstance(Ci.nsIProcess);

      process.init(exeFile);
      process.runAsync(["-remove"], 1, (aSubject, aTopic) => {
        if (aTopic == "process-finished") {
          deferred.resolve(true);
        } else {
          deferred.reject("Uninstaller failed with exit code: " + aSubject.exitValue);
        }
      });
    } catch (e) {
      deferred.reject(e);
    }

    return deferred.promise;
//@line 377 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
  },

  /**
   * Returns true if the given install path (in the old naming scheme) actually
   * belongs to the given application.
   */
  isOldInstallPathValid: function(aApp, aInstallPath) {
    // Applications with an origin that starts with "app" are packaged apps and
    // packaged apps have never been installed using the old naming scheme.
    // After bug 910465, we'll have a better way to check if an app is
    // packaged.
    if (aApp.origin.startsWith("app")) {
      return false;
    }

    // Bug 915480: We could check the app name from the manifest to
    // better verify the installation path.
    return true;
  },

  /**
   * Checks if the given app is locally installed.
   */
  isLaunchable: function(aApp) {
//@line 404 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"

    let uniqueName = this.getUniqueName(aApp);

//@line 420 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
    let env = Cc["@mozilla.org/process/environment;1"]
                .getService(Ci.nsIEnvironment);

    let xdg_data_home_env;
    try {
      xdg_data_home_env = env.get("XDG_DATA_HOME");
    } catch(ex) {}

    let desktopINI;
    if (xdg_data_home_env) {
      desktopINI = new FileUtils.File(xdg_data_home_env);
    } else {
      desktopINI = FileUtils.getFile("Home", [".local", "share"]);
    }
    desktopINI.append("applications");
    desktopINI.append("owa-" + uniqueName + ".desktop");

    // Fall back to the old installation naming scheme
    if (!desktopINI.exists()) {
      if (xdg_data_home_env) {
        desktopINI = new FileUtils.File(xdg_data_home_env);
      } else {
        desktopINI = FileUtils.getFile("Home", [".local", "share"]);
      }

      let origin = Services.io.newURI(aApp.origin, null, null);
      let oldUniqueName = origin.scheme + ";" +
                          origin.host +
                          (origin.port != -1 ? ";" + origin.port : "");

      desktopINI.append("owa-" + oldUniqueName + ".desktop");

      if (!desktopINI.exists()) {
        return false;
      }

      let installDir = Services.dirsvc.get("Home", Ci.nsIFile);
      installDir.append("." + origin.scheme + ";" + origin.host +
                        (origin.port != -1 ? ";" + origin.port : ""));

      return isOldInstallPathValid(aApp, installDir.path);
    }

    return true;
//@line 466 "/home/wojtek/Repositories/firefox-45.0.2/toolkit/webapps/WebappOSUtils.jsm"
  },

  /**
   * Sanitize the filename (accepts only a-z, 0-9, - and _)
   */
  sanitizeStringForFilename: function(aPossiblyBadFilenameString) {
    return aPossiblyBadFilenameString.replace(/[^a-z0-9_\-]/gi, "");
  }
}
