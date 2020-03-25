/**
*
* @source: https://github.com/anizaeger/jsBells
*
* The following is the entire license notice for the 
* JavaScript code in this page.
*
* Copyright (C) 2018 Anakin-Marc Zaeger
*
*
* The JavaScript code in this page is free software: you can
* redistribute it and/or modify it under the terms of the GNU
* General Public License (GNU GPL) as published by the Free Software
* Foundation, either version 3 of the License, or (at your option)
* any later version.  The code is distributed WITHOUT ANY WARRANTY;
* without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
*
* As additional permission under GNU GPL version 3 section 7, you
* may distribute non-source (e.g., minimized or compacted) forms of
* that code without the copy of the GNU GPL normally required by
* section 4, provided you include this license notice and a URL
* through which recipients can access the Corresponding Source.
*
*
* @licend The above is the entire license notice
* for the JavaScript code in this page.
*
*/
/** -------------------------------------------------------------------------
 * CLASS:		Censor
 * DESCRIPTION:		Simulates the studio censor.
----------------------------------------------------------------------------- */
define([], function() {
	return class Censor {
		/** ---------------------------------------------------------------------
		 * FUNCTION:		constructor
		 * DESCRIPTION:		Construct a new instance of class Censor.
		 * ATTRIBUTION:		https://gist.github.com/laziel/7aefabe99ee57b16081c
		------------------------------------------------------------------------- */
		constructor( studio ) {
			this.studio = studio
			this.context = null;
			this.usingWebAudio = true;
			this.bleeping = false;

			this.bleepSecs = 1;

			try {
				if ( typeof AudioContext !== 'undefined' ) {
					this.context = new AudioContext();
				} else if ( typeof webkitAudioContext !== 'undefined' ) {
					this.context = new webkitAudioContext();
				} else {
					this.usingWebAudio = false;
				}
			} catch( e ) {
				alert( "*** BUG - Osc::constructor()\n" + "Error - " + e );
				this.usingWebAudio = false;
			}

			this.wake();
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Censor::init
		 * DESCRIPTION:		Initialize web audio oscillator.
		 * ATTRIBUTION:		https://gist.github.com/laziel/7aefabe99ee57b16081c
		------------------------------------------------------------------------- */
		init() {
			this.gain = this.context.createGain();
			this.gain.gain.value = 0.25;

			this.osc = this.context.createOscillator();
			this.osc.type = 'sine';
			this.osc.frequency.value = 1000;

			this.osc.connect( this.gain );
			this.gain.connect( this.context.destination );
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Censor::play
		 * DESCRIPTION:		Start/stop censor bleep.
		------------------------------------------------------------------------- */
		bleep() {
			if ( this.usingWebAudio ) {
				var that = this;
				if ( this.bleeping == false ) {
					this.init();
					this.bleeping = true;
					createjs.Sound.muted = true;
					this.osc.start();
				}
				this.osc.onended = function() {
					createjs.Sound.muted = false;
					that.bleeping = false;
				}
				this.osc.stop( this.context.currentTime + this.bleepSecs );
			}
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Censor::wake
		 * DESCRIPTION:		Resumes web audio in the event that it gets suspended.
		 * ATTRIBUTION:		https://gist.github.com/laziel/7aefabe99ee57b16081c
		------------------------------------------------------------------------- */
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
});