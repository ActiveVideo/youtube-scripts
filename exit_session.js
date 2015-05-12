/**
 * Copyright (c) 2015 Active Video Inc. Reproduction in whole or in part without
 * written permission is prohibited. All rights reserved
 * 
 * Catch a (remapped) 'exit' key code and invoke window.close() to gracefully
 * the application.
 * 
 * Version 0.1
 */
(function() {

    "use strict";

    function processKey(e) {
        if (e.keyCode == 1158) {
            console.log("Requesting window.close() because of received exit key code")
            window.close();
        }
    }

    window.addEventListener("keydown", processKey, true);
    window.addEventListener("keypress", processKey, true);
    window.addEventListener("keyup", processKey, true);
})();
