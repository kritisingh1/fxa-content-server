/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const intern = require('intern');
const registerSuite = require('intern!object');
const FunctionalHelpers = require('tests/functional/lib/helpers');
const selectors = require('tests/functional/lib/selectors');
var EXP_MAILCHECK_URL = intern.config.fxaContentRoot + 'signup?automatedBrowser=true';

var clearBrowserState = FunctionalHelpers.clearBrowserState;
var click = FunctionalHelpers.click;
var openPage = FunctionalHelpers.openPage;
var testElementValueEquals = FunctionalHelpers.testElementValueEquals;
var type = FunctionalHelpers.type;

registerSuite('mailcheck', {
  beforeEach: function () {
    return this.remote.then(clearBrowserState());
  },

  afterEach: function () {
    return this.remote.then(clearBrowserState());
  },

  'tooltip works': function () {
    var BAD_EMAIL = 'something@gnail.com';
    var CORRECTED_EMAIL = 'something@gmail.com';

    return this.remote
      .then(openPage(EXP_MAILCHECK_URL, selectors.SIGNUP.HEADER))
      .then(type(selectors.SIGNUP.EMAIL, BAD_EMAIL))
      .then(click(selectors.SIGNUP.PASSWORD, selectors.SIGNUP.SUGGEST_EMAIL_DOMAIN_CORRECTION))
      .then(click(selectors.SIGNUP.LINK_SUGGEST_EMAIL_DOMAIN_CORRECTION))

      .then(testElementValueEquals(selectors.SIGNUP.EMAIL, CORRECTED_EMAIL));
  }
});
