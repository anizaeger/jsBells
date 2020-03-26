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
 * CLASS:		Crowd
 * DESCRIPTION:		Simulates the studio audiance.
----------------------------------------------------------------------------- */
define(['createjs'], function() {
	return class Crowd {
		/** ---------------------------------------------------------------------
		 * FUNCTION:		constructor
		 * DESCRIPTION:		Construct a new instance of class Crowd.
		------------------------------------------------------------------------- */
		constructor( studio ) {
			this.studio = studio;
			this.defChantNum = 6;
			this.excited = false;
			this.cheerTween = null;
			this.chanting = null;

			var queue = new createjs.LoadQueue();
			queue.installPlugin(createjs.Sound);
			queue.on("fileload", this.queueFileLoad, this);
			queue.loadManifest([
				/// The famous Jerry Chant.  Jerry!  Jerry!  Jerry!
				{id:"chant", src:"sounds/chant.wav"},
				/// The crowd cheering the fight.
				{id:"cheer", src:"sounds/cheer.wav"}
			]);
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::queueFileLoad
		 * DESCRIPTION:		Preload the audio file(s) for the crowd to improve
											playback.
		------------------------------------------------------------------------- */
		queueFileLoad(event) {
			var fileName = event.item.id;
			this.studio.preloadChk( fileName );
			if ( fileName == 'cheer' ) {
				this.cheer = createjs.Sound.createInstance("cheer");
				this.cheer.play({loop: -1});
				this.cheer.volume = 0;
			}
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::excite
		 * DESCRIPTION:		Make the crowd cheer, stopping the Jerry Chant if in
											progress.
		------------------------------------------------------------------------- */
		excite() {
			if ( !this.excited ) {
				if ( this.chanting != null ) {
					console.log("Stopping chant: " + this.chanting)
					window.clearTimeout(this.chanting);
					this.chanting = null;
				}
				this.excited = true;
				this.beginCheer();
			}
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::excite
		 * DESCRIPTION:		Make the crowd cheer, stopping the Jerry Chant if in
											progress.
		------------------------------------------------------------------------- */
		calm() {
			if ( this.excited ) {
				this.excited = false;
				this.endCheer();
				this.beginChant();
			}
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::beginCheer
		 * DESCRIPTION:		Fade in audio of crowd cheering.
		------------------------------------------------------------------------- */
		beginCheer() {
			this.cheerTween = createjs.Tween.get(this.cheer, {override:true}).to({volume: 1},500).call(this.tweenComplete);
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::endCheer
		 * DESCRIPTION:		Fade out the audio of crowd cheering over a period of 5
											seconds.
		------------------------------------------------------------------------- */
		endCheer() {
			this.cheerTween = createjs.Tween.get(this.cheer, {override:true}).to({volume: 0},5000).call(this.tweenComplete);
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::tweenComplete
		 * DESCRIPTION:		Delete the tween once complete.
		------------------------------------------------------------------------- */
		tweenComplete() {
			this.cheerTween = null;
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::beginChant
		 * DESCRIPTION:		Begin the Jerry Chant, setting iterations to
											defChantNum.
		------------------------------------------------------------------------- */
		beginChant( chants = this.defChantNum ) {
			this.chantNum = chants;
			this.doChant();
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::doChant
		 * DESCRIPTION:		Perform an iteration of the chant, decrement the
											counter, end chant when counter hits 0.
		------------------------------------------------------------------------- */
		doChant() {
			createjs.Sound.play("chant");
			this.chantNum--;
			if ( !this.excited ) {
				if ( this.chantNum > 0 ) {
					this.chanting = window.setTimeout( this.doChant.bind(this), 1000);
				}
				else {
					this.endChant();
				}
			}
		}

		/** ---------------------------------------------------------------------
		 * FUNCTION:		Crowd::endChant
		 * DESCRIPTION:		Ensure counter is reset to 0 (should already be), then
											silence the studio.
		------------------------------------------------------------------------- */
		endChant() {
			console.log("endChant()")
			this.chanting = null;
			this.chantNum = 0;
			this.studio.silence();
		}
	};
});