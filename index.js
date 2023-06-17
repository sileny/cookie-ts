/*!
 * cookie
 */
"use strict";

/**
 * get cookie
 * @param {String} cookieName
 * @returns {string}
 */
function get(cookieName) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(cookieName + "=");
    if (start !== -1) {
      start = start + cookieName.length + 1;
      let end = document.cookie.indexOf(";", start);
      if (end === -1) end = document.cookie.length;
      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
}

/**
 * set cookie
 * @param {String} key (cookie name)
 * @param {String} value (cookie value)
 * @param {Number} expiresDay (expires time. 1h = 1 / 24)
 */
function set(key, value, expiresDay = 1 / 24) {
  let date = new Date();
  date.setTime(date.getTime() + expiresDay * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + escape(value) + (expiresDay == null ? "" : ";expires=" + date.toUTCString());
}

/**
 * if do not exists cookie, add it
 * @param {String} key (cookieName)
 * @param {String | Number} value (cookie value)
 * @param {Number} time (expiresTime. default one hour)
 * @param {Boolean} forceUpdate (Whether to force the update of the cookie value. default false)
 */
function check(key, value, time = 1 / 24, forceUpdate = false) {
  let val = get(key);
  if (val && !forceUpdate) {
    return;
  }
  if (!val && value) {
    set(key, value + "", time || 1 / 24);
  }
}

/**
 * clear cookie
 * @param {String} cookieName
 */
function clear(cookieName) {
  set(cookieName, "", -1);
}

/**
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 *
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @return {object}
 * @public
 */

function parse(str) {
  var pairSplitRegExp = /; */;
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var pairs = str.split(pairSplitRegExp);

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = decodeURIComponent(val);
    }
  }

  return obj;
}

const cookie = {
  get,
  set,
  check,
  clear,
  parse
};

module.exports = cookie;
module.exports.default = cookie;
