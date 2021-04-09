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
requirejs.config({
  shim: {
    'createjs': {
      exports: 'createjs'
    }
  },
  paths: {
    // the left side is the module ID,
    // the right side is the path to
    // the jQuery file, relative to baseUrl.
    // Also, the path should NOT include
    // the '.js' file extension. This example
    // is using jQuery 1.9.0 located at
    // js/lib/jquery-1.9.0.js, relative to
    // the HTML page.
    createjs: [
      '//code.createjs.com/1.0.0/createjs.min',
      'lib/createjs.min'
    ],
    jquery: 'lib/jquery',
    lodash: [
      '//cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min',
      'lib/lodash.min'
    ]
  }
});

require([
  'studio', 'ui'
], function(
  Studio
) {
  window.studio = new Studio();
});
