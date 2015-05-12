/**
 * Copyright (c) 2015 Active Video Inc. Reproduction in whole or in part without
 * written permission is prohibited. All rights reserved
 * 
 * Remap keys to different keycodes. This script may be used as a workaround for
 * apps that listen to incorrect keycodes or for apps that listen to
 * non-standard keys, where CloudTV uses a different keycode.
 * 
 * Version 0.2
 */
(function() {

    "use strict";

    var MAPPING = {

        // Format is:
        // "CloudTV keycode": { keyCode: app_specific_keycode, keyIdentifier:
        // "Unicode value or textual representation of non character key" }
        // e.g.
        // "8": { keyCode: 27, keyIdentifier: "U+001B"}
        // if the keyIdentifier is not supplied, the original keyIdentifier is
        // used.
        "415" : {
            keyCode : 0xFA
        },
        // Play
        // "19": { keyCode: 0x13 }, // Pause is already at correct keycode
        "413" : {
            keyCode : 0xB2
        },
        // Stop
        "417" : {
            keyCode : 0xE4
        },
        // Fast forward
        "412" : {
            keyCode : 0xE3
        },
        // Rewind
        "424" : {
            keyCode : 0xB1
        },
        // Prev
        "425" : {
            keyCode : 0xB0
        },
        // Back/Last => Escape / Back / Return
        "8" : {
            keyCode: 0x1B
        }
    };

    // ////////////////////////////////
    // Blacklisting & whitelisting
    // 
    // Blacklist and/or (optionally remapped) keycodes. Blacklist filtering
    // takes places before the whitelist is applied.
    var KEY_BLACKLIST = [];
    var KEY_WHITELIST = [
    // YouTube whitelisting
    // 9.3 The device MUST support six-point navigation at a minimum, which
    // includes the following keys:
    0x25, // Left
    0x27, // Right
    0x26, // Up
    0x28, // Down
    0x0D, // Enter
    0x1B, // Escape / Back / Return

    // 9.4 The device MUST support the following keys if the keys exist on the
    // device remote:
    0xFA, // Play
    0x13, // Pause
    0xB3, // Play/Pause

    // Only for remotes that implement play and pause functionality on a single
    // button.
    0xB2, // Stop
    0xE4, // Fast Forward
    0xE3, // Rewind
    0x20, // Space
    0x08, // Backspace
    0x47, // Delete
    0x53, // Search
    0xB1, // Previous
    0xB0, // Next

    1158 // Exit
    ];

    // ////////////////////////////////
    // Application code starts here

    /* DEBUG: Show remapped keys
    console.warn("Remapping keys");
    console.warn("Key map: ");
    for ( var i in MAPPING) {
        if (MAPPING.hasOwnProperty(i)) {
            console.warn(i, "->", MAPPING[i].keyCode, "(" + MAPPING[i].keyIdentifier + ")");
        }
    }
    var m = "";
    for ( var i in KEY_BLACKLIST) {
        if (i > 0) {
            m += ", "
        }
        m += KEY_BLACKLIST[i];
    }
    console.warn("Blacklisted keys: " + m);
    var m = "";
    for ( var i in KEY_WHITELIST) {
        if (i > 0) {
            m += ", "
        }
        m += KEY_WHITELIST[i];
    }
    console.warn("Whitelisted keys: " + m);
    */

    function sendKey(e, map) {
        console.log("Sending key ", e.keyCode);
        var evt = document.createEvent("Event");
        evt.initEvent(e.type, e.bubbles, e.cancelable);
        evt.which = map.keyCode;
        evt.keyCode = map.keyCode;
        evt.keyCodeOriginal = e.keyCode;

        if (typeof map.keyIdentifier === typeof undefined) {
            evt.keyIdentifier = e.keyIdentifier;
        } else {
            evt.keyIdentifier = map.keyIdentifier;
        }
        e.target.dispatchEvent(evt);
    }

    function shouldHandleKey(e) {
        var keyCode = e.keyCode;

        if (KEY_BLACKLIST.indexOf(keyCode) != -1) {
            // Blacklisted key found
            console.log('Key ' + keyCode + ' blacklisted');
            return false;
        } else {
            console.log('Key ' + keyCode + ' NOT blacklisted');
        }

        if (KEY_WHITELIST.length > 0) {
            if (KEY_WHITELIST.indexOf(keyCode) != -1) {
                // Key in whitelist, handle!
                console.log('Key ' + keyCode + ' whitelisted');
                return true;
            } else {
                console.log('Key ' + keyCode + ' NOT whitelisted, stopping propagation');
            }
            return false;
        }

        return true;
    }

    function processKey(e) {
        // console.log(e.keyCode);

        var map = MAPPING[e.keyCode];
        var key = {
            keyCode : e.keyCode
        };

        if (typeof map !== typeof undefined) {
            console.log('Remapping ' + e.keyCode + ' to ' + map.keyCode);
            key.keyCode = map.keyCode;
        }

        if (shouldHandleKey(key)) {
            if (e.keyCode != key.keyCode) { // key modified, send modified key
                e.preventDefault();
                e.stopImmediatePropagation();
                sendKey(e, map);
            }
        } else {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }

    window.addEventListener("keydown", processKey, true);
    window.addEventListener("keypress", processKey, true);
    window.addEventListener("keyup", processKey, true);
})();
