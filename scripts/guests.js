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
 * CLASS:         Guests
 * DESCRIPTION:   Simulates the guests on stage.
 * -------------------------------------------------------------------------- */
define(['createjs'], function() {
  return class Guests {
    /** --------------------------------------------------------------------- *
     * FUNCTION:      constructor
     * DESCRIPTION:   Construct a new instance of class Guests.
     * ---------------------------------------------------------------------- */
    constructor( studio ) {
      /// Percent of aggression cycles that result in further aggression.
      this.hitPcnt = 75;

      /// Maximum delay (in milliseconds) between aggression events.
      this.maxDelay = 1500;

      /// Percent of cussout cycles that will result in a bleep.
      this.swearPcnt = 25;

      this.studio = studio;
      this.rapidRing = false;
      this.fighting = false;
      this.aggression = null;
      this.swearing = null;

      var queue = new createjs.LoadQueue();
      queue.installPlugin(createjs.Sound);
      queue.on("fileload", this.queueFileLoad, this);
      queue.loadFile({id:"hit", src:"sounds/punch.wav"});
    }

    maxTime() {
      return this.maxDelay * ( 100 / this.hitPcnt );
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::queueFileLoad
     * DESCRIPTION:   Preload the audio file(s) for the guests to improve
     *                playback.
     * ---------------------------------------------------------------------- */
    queueFileLoad(event) {
      var fileName = event.item.id;
      this.studio.preloadChk( fileName );
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::instigate
     * DESCRIPTION:   Begin a fight cycle.
     * ---------------------------------------------------------------------- */
    instigate() {
      if(( this.fighting == false ) || (( Math.floor( Math.random() * 100 ) < this.hitPcnt ) && !this.rapidRing )) {
        this.rapidRing = true;
        this.aggress(500);
        this.cussout(1000)
      }
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::aggress
     * DESCRIPTION:   Launch an act of aggression.
     * ---------------------------------------------------------------------- */
    aggress( maxTime = this.maxTime()) {
      console.log("aggress(" +maxTime+ ")");
      if ( this.aggression != null ) {
        console.log("Clearing aggression: " + this.aggression)
        window.clearTimeout(this.aggression);
        this.aggression = null;
      }

      var that = this, time = Math.floor( Math.random() * this.maxTime());
      if ( time <= this.maxDelay ) {
        this.aggression = window.setTimeout( function(){ that.attack() }, time );
        console.log("Attack in: " + time + ", ID: " + this.aggression);
      } else {
        this.aggression = window.setTimeout( function(){ that.truce() }, time );
        console.log("Truce in: " + time + ", ID: " + this.aggression);
      }
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::cussout
     * DESCRIPTION:   Generate random timer calling Guests::swear().
     * ---------------------------------------------------------------------- */
    cussout( maxTime = this.maxTime()) {
      console.log("cussout(" +maxTime+ ")");
      if ( this.swearing != null ) {
        console.log("Clearing swearing: " + this.swearing)
        window.clearTimeout(this.swearing);
        this.swearing = null;
      }

      var that = this, time = Math.floor( Math.random() * this.maxTime());
      this.swearing = window.setTimeout( function() { that.swear() }, time );
      console.log("Swear in: " + time + ", ID: " + this.swearing);
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::attack
     * DESCRIPTION:   Throw a punch, then restart aggression..  May result in
     *                a cussout.
     * ---------------------------------------------------------------------- */
    attack() {
      this.aggression = null;
      this.fighting = true;
      this.rapidRing = false;
      this.punch = createjs.Sound.play("hit");

      var swearRoll = Math.floor( Math.random() * 100 );
      if ( swearRoll < this.swearPcnt ) {
        this.cussout(500);
      }

      this.studio.excite();
      this.aggress();
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::truce
     * DESCRIPTION:   Call a truce and calm the studio.  Note that this does
     *                NOT stop any cussout timers, and as a result, a final
     *                cycle of cussout MAY result in further aggression.
     * ---------------------------------------------------------------------- */
    truce() {
      this.aggression = null;
      this.fighting = false;
      this.studio.calm();
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::swear
     * DESCRIPTION:   Cuss on stage, thus generating a bleep, if swearPcnt
                      roll is met.
     * ---------------------------------------------------------------------- */
    swear() {
      this.swearing = null;
      var swearRoll = Math.floor( Math.random() * 100 );
      console.log( "swear() Roll: " + swearRoll );
      if ( swearRoll < this.swearPcnt ) {
        this.studio.bleep();
        if ( Math.floor( Math.random() * 100 ) < this.hitPcnt ) {
          this.aggress();
        }
      }
      this.cussout();
    }

    /** --------------------------------------------------------------------- *
     * FUNCTION:      Guests::silence
     * DESCRIPTION:   Cancle any remaining cussout cycles.
     * ---------------------------------------------------------------------- */
    silence() {
      window.clearTimeout( this.swearing );
      this.swearing = null;
    }
  };
});