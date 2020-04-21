/**
 * This exposes the native NativeToast module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be NativeToast.SHORT or NativeToast.LONG
 */
import {NativeModules} from 'react-native';
module.exports = NativeModules.NativeToast;
