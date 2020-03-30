/** ***************************************************************************
 *                                                                            *
 * @source: https://github.com/anizaeger/jsBells                              *
 *                                                                            *
 * The following is the entire license notice for the                         *
 * JavaScript code in this page.                                              *
 *                                                                            *
 * Copyright (C) 2018 Anakin-Marc Zaeger                                      *
 *                                                                            *
 *                                                                            *
 * The JavaScript code in this page is free software: you can                 *
 * redistribute it and/or modify it under the terms of the GNU                *
 * General Public License (GNU GPL) as published by the Free Software         *
 * Foundation, either version 3 of the License, or (at your option)           *
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;          *
 * without even the implied warranty of MERCHANTABILITY or FITNESS            *
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.               *
 *                                                                            *
 * As additional permission under GNU GPL version 3 section 7, you            *
 * may distribute non-source (e.g., minimized or compacted) forms of          *
 * that code without the copy of the GNU GPL normally required by             *
 * section 4, provided you include this license notice and a URL              *
 * through which recipients can access the Corresponding Source.              *
 *                                                                            *
 *                                                                            *
 * @licend The above is the entire license notice                             *
 * for the JavaScript code in this page.                                      *
 *                                                                            *
 ******************************************************************************/
/** ------------------------------------------------------------------------- *
 * CLASS:         Bell
 * DESCRIPTION:   Simulates the bell, controlled by the user, which starts
 *                and maintains the action on stage.  When rung, the crowd
 *                will be excited, and the guests instigated.
 * -------------------------------------------------------------------------- */
define(['createjs'], function() {
  return class Bell {
    /** --------------------------------------------------------------------- *
     * FUNCTION:      constructor
     * DESCRIPTION:   Construct a new instance of class Bell.
     * ---------------------------------------------------------------------- */
    constructor( studio ) {
      this.studio = studio;
      var queue = new createjs.LoadQueue();
      queue.installPlugin(createjs.Sound);
      queue.on("fileload", this.queueFileLoad, this);
      queue.loadFile({id:"bell", src:"sounds/bell.wav"});
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Bell::queueFileLoad
     * DESCRIPTION:   Preload the audio file(s) for the bell to improve
     *                playback.
     * ---------------------------------------------------------------------- */
    queueFileLoad(event) {
      var fileName = event.item.id;
      this.studio.preloadChk( fileName );
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Bell::ring
     * DESCRIPTION:   Ring that Mutha Frakin' Bell!  Ringing the bell prods
                      the studio.
     * ---------------------------------------------------------------------- */
    ring() {
      createjs.Sound.play("bell");
			this.studio.prod();
    }
  };
});