(function () {
    "use strict";

    /**
     * Force all videos to be (at least) fullscreen by injecting a CSS rule.
     * Video elements will respect aspect ratio during scaling, which makes them bigger than the scree
     * if the video aspect is different from the screen aspect ratio.
     *
     * This script is used for youtube.com/tv, which does not work correctly with passthrough video otherwise;
     * virga may start drawing the non-video areas as overlays as there is a discrepency between the video
     * size accoridng to virga (not full screen) and the compositor (fullscreen, since we do passthrough video).
     *
     * This script may become obsolete when virga/compositor behaviour changes.
     */

    console.warn("Resizing all video elements to fullscreen using CSS");

    var elem = document.createElement("style");
    elem.appendChild(document.createTextNode("video { width:auto!important; height:auto!important; left:0!important;top:0!important; min-width:100%!important; min-height:100%!important; }"));
    document.head.appendChild(elem);
})();
