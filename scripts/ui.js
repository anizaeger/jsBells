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
 * FUNCTION:		gplAlert
 * DESCRIPTION:		Print GPL license text to alert box
 * RETURNS:		Nothing (Void Function)
----------------------------------------------------------------------------- */
function gplAlert() {
	var lic = "";
	lic += "Copyright (C) 2017 Anakin-Marc Zaeger\n"
	lic += "\n"
	lic += "\n"
	lic += "The JavaScript code in this page is free software: you can\n"
	lic += "redistribute it and/or modify it under the terms of the GNU\n"
	lic += "General Public License (GNU GPL) as published by the Free Software\n"
	lic += "Foundation, either version 3 of the License, or (at your option)\n"
	lic += "any later version.  The code is distributed WITHOUT ANY WARRANTY;\n"
	lic += "without even the implied warranty of MERCHANTABILITY or FITNESS\n"
	lic += "FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.\n"
	lic += "\n"
	lic += "As additional permission under GNU GPL version 3 section 7, you\n"
	lic += "may distribute non-source (e.g., minimized or compacted) forms of\n"
	lic += "that code without the copy of the GNU GPL normally required by\n"
	lic += "section 4, provided you include this license notice and a URL\n"
	lic += "through which recipients can access the Corresponding Source.\n"
	window.alert(lic)
}

/** -------------------------------------------------------------------------
 * FUNCTION:		setBtn
 * DESCRIPTION:		Calculate size of bell button.
 * RETURNS:		Nothing (Void Function)
----------------------------------------------------------------------------- */
function setBtn() {
	var height = screen.height;
	var width = screen.width;
	var btnSize = null;

	if ( height > width ) {
		btnSize = width;
	} else {
		btnSize = height;
	}

	btnSize /= 2;

	var fightBtn = document.getElementById("fightBtn");

	if ( fightBtn ) {
		fightBtn.style.height = btnSize;
		fightBtn.style.width = btnSize;
	}
}