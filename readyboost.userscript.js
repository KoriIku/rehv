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
function getHelloWorld() {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://e-hentai.org/popular",
      onload: response => {
        resolve(response.responseText);
      },
      onerror: error => {
        reject(error);
      }
    });
  });
}

function xhrGet(url) {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: response => {
        resolve(response.responseText);
      },
      onerror: error => {
        reject(error);
      }
    });
  });
}

unsafeWindow.getHelloWorld = getHelloWorld;
unsafeWindow.xhrGet = xhrGet