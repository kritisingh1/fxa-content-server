/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const intern = require('intern');
const registerSuite = require('intern!object');
const FunctionalHelpers = require('tests/functional/lib/helpers');
const require = require('require');
var PAGE_URL = intern.config.fxaContentRoot + 'legal/privacy';
var SIGNUP_URL = intern.config.fxaContentRoot + 'signup';

var noSuchElement = FunctionalHelpers.noSuchElement;

registerSuite('pp', {
  beforeEach: function () {
    return this.remote
      .then(FunctionalHelpers.clearBrowserState());
  },

  'start at signup': function () {

    return this.remote
      .get(require.toUrl(SIGNUP_URL))
      .setFindTimeout(intern.config.pageLoadTimeout)
      .findById('fxa-pp')
      .click()
      .end()

      // success is going to the Privacy screen
      .findById('fxa-pp-header')
      .end()

      .findById('fxa-pp-back')
      .click()
      .end()

      // success is going back to the signup
      .findById('fxa-signup-header')
      .end();
  },

  'browse directly to page - no back button': function () {
    return this.remote
      .get(require.toUrl(PAGE_URL))
      .setFindTimeout(intern.config.pageLoadTimeout)

      .findById('fxa-pp-header')
      .end()

      .then(noSuchElement('#fxa-pp-back'));
  },

  'refresh, back button is available': function () {
    return this.remote

      .get(require.toUrl(SIGNUP_URL))
      .setFindTimeout(intern.config.pageLoadTimeout)
      .findByCssSelector('#fxa-pp')
      .click()
      .end()

      // wait for policy to load
      .findByCssSelector('#fxa-pp-back')
      .end()

      .refresh()

      .findByCssSelector('#fxa-pp-back')
      .click()
      .end()

      // success is going back to the signup
      .findByCssSelector('#fxa-signup-header')
      .end();
  }
});
