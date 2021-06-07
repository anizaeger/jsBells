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
 * CLASS:         Studio
 * DESCRIPTION:   Simulates the studio studio, which contains the guests,
 *                censor, and audience.
 * -------------------------------------------------------------------------- */
define([
  'bell',
  'censor',
  'crowd',
  'guests'
], function(
  Bell,
  Censor,
  Crowd,
  Guests
) {
  return class Studio {
    /** --------------------------------------------------------------------- *
     * FUNCTION:      constructor
     * DESCRIPTION:   Construct a new instance of class Studio.
     * ---------------------------------------------------------------------- */
    constructor() {
      // Objects housed in studio.
      this.bell = new Bell(this);
      this.censor = new Censor(this);
      this.crowd = new Crowd(this);
      this.guests = new Guests(this);

      // Audio Preload Checklist
      this.files = {
        bell: false,
        chant: false,
        cheer: false,
        hit: false
      };
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Studio::preloadChk
     * DESCRIPTION:   Process preload requests from encapsulated classes.
     * ---------------------------------------------------------------------- */
    preloadChk( id ) {
      this.files[ id ] = true;

      var chkFiles = true;
      for ( var value in this.files ) {
        if ( this.files.hasOwnProperty(value)) {
          if ( !this.files[ value ]) {
            chkFiles = false;
          }
        }
      }
      if ( chkFiles ) {
        var fightBtn = document.getElementById("fightBtn");
        if ( fightBtn ) {
          fightBtn.disabled = false;
        }
      }
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Studio::ring
     * DESCRIPTION:   Forward bell ring requests from user to bell.
     * ---------------------------------------------------------------------- */
    ring() {
			this.wake();
      this.bell.ring();
    }

    /** --------------------------------------------------------------------- *
     * FUNCITON:      Studio::prod
     * DESCRIPTION:   Incite the guests and excite the crowd.
     * ---------------------------------------------------------------------- */
    prod() {
      this.excite();
      this.instigate();
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Studio::instigate
     * DESCRIPTION:   Instigate the guests into further fighting.
     * ---------------------------------------------------------------------- */
    instigate() {
      var exciteTime = Math.floor( Math.random() * 1000 ) + 1;
      var that = this;
      window.setTimeout( function() {
        that.guests.instigate();
      }, exciteTime );
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Studio::excite
     * DESCRIPTION:   Excite the crowd, getting them to cheer.
     * ---------------------------------------------------------------------- */
    excite() {
      var exciteTime = Math.floor( Math.random() * 250 );
      var that = this;
      window.setTimeout( function() {
        that.crowd.excite();
      }, exciteTime );
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Studio::calm
     * DESCRIPTION:   Calm the crowd, causing thme to begin the Jerry Chant.
     * ---------------------------------------------------------------------- */
    calm() {
      this.crowd.calm();
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Studio::bleep
     * DESCRIPTION:   Bleep a cursing guest.
     * ---------------------------------------------------------------------- */
    bleep() {
      this.censor.bleep();
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Studio::silence
     * DESCRIPTION:   Silence the guests, ending any remaining cussout cycles.
     * ---------------------------------------------------------------------- */
    silence() {
      console.log('Silenced!')
      this.guests.silence();
    }

   /** --------------------------------------------------------------------- *
    * FUNCTION:      Censor::wake
    * DESCRIPTION:   Resumes web audio in the event that it gets suspended.
    * ATTRIBUTION:   https://gist.github.com/laziel/7aefabe99ee57b16081c
    * ---------------------------------------------------------------------- */
   wake() {
     if ( this.usingWebAudio && this.context.state === 'suspended' ) {
       var resume = function() {
         this.context.resume();
         var that = this;
         setTimeout( function() {
           if ( that.context.state === 'running' ) {
             document.body.removeEventListener( 'touchend', resume, false );
           }
         }, 0 );
       };
       document.body.addEventListener('touchend', resume, false);
     }
   }
  };
})