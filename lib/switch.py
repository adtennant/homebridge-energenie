#!/usr/bin/python

import time
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)) + '/pyenergenie/src')

import energenie
energenie.init()

me_global = sys.modules[__name__]
energenie.registry.load_into(me_global)

try:
    if len(sys.argv) == 3:
        if sys.argv[1] == 'on':
            print("switch " + sys.argv[2] + " on")
            exec(sys.argv[2] + '.turn_on()')
        elif sys.argv[1] == 'off':
            print("switch " + sys.argv[2] + " off")
            exec(sys.argv[2] + '.turn_off()')
    else:
        print("invalid number of arguments")
finally:
    energenie.finished()
