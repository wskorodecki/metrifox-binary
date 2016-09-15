""" GDB Python customization auto-loader for js shell """

import os.path
sys.path[0:0] = [os.path.join('/home/wojtek/Repositories/firefox-45.0.2/js/src', 'gdb')]

import mozilla.autoload
mozilla.autoload.register(gdb.current_objfile())

import mozilla.asmjs
mozilla.asmjs.install()
