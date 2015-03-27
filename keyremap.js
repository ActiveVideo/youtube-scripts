/*
    VERSION 0.1
*/

(function() {

    "use strict";

    /**
     * Remap keys to different keycodes.
     * This script may be used as a workaround for apps that listen to incorrect keycodes or for apps that listen to non-standard keys, where CloudTV uses a different keycode.
     *
     *
     * Last modified: 20142201 11:49
     */



    /** Prefix of domain this remapping applies to. Workaround for preload scripts not always being unloaded. */

    var DOMAIN = "https://www.youtube.com/tv";



    var MAPPING = {

        // Format is:
        // "CloudTV keycode": { keyCode: app_specific_keycode, keyIdentifier: "Unicode value or textual representation of non character key" }
        // e.g.
        // "8": { keyCode: 27, keyIdentifier: "U+001B"}
        // if the keyIdentifier is not supplied, the original keyIdentifier is used.
        "415": {
            keyCode: 0xFA
        },
        // Play
        //"19":  { keyCode: 0x13 },  // Pause is already at correct keycode
        "413": {
            keyCode: 0xB2
        },
        // Stop
        "417": {
            keyCode: 0xE4
        },
        // Fast forward
        "412": {
            keyCode: 0xE3
        },
        // Rewind
       "424": {
            keyCode: 0xB1
        },
        // Prev
        "425": {
            keyCode: 0xB0
        },
        // Next
  };







    //////////////////////////////////
    // Application code starts here


/*

    if (document.location.href.indexOf(DOMAIN) !== 0) {

        console.log("Remap script not applicable for this domain, stopping.");

        return;

    }

    */



    console.warn("Remapping keys");

    for (var i in MAPPING) {

        if (MAPPING.hasOwnProperty(i)) {

            console.warn(i, "->", MAPPING[i].keyCode, "(" + MAPPING[i].keyIdentifier + ")");

        }

    }



    function sendKey(e, map) {

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



    function remapKey(e) {

        var map = MAPPING[e.keyCode];

        if (typeof map === typeof undefined) {

            if (!e.keyCodeOriginal) {
                console.log("I do not know how to remap key", e.keyCode, "ignoring.");
            }

            return;

        }





        e.preventDefault();

        e.stopImmediatePropagation();



        sendKey(e, map);

    }



    window.addEventListener("keydown", remapKey, true);

    window.addEventListener("keypress", remapKey, true);

    window.addEventListener("keyup", remapKey, true);



})();
