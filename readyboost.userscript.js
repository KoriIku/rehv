// ==UserScript==
// @name         My Greasemonkey Plugin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://localhost/*
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      *
// ==/UserScript==

unsafeWindow.myPluginLoaded = true;
GM_log("载入");
unsafeWindow.GM_XHR = GM_xmlhttpRequest;