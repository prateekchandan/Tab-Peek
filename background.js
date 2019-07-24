// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var current_tab_id = -1;
var last_tab_id = -1;

var isPeeking = false;

chrome.tabs.onActivated.addListener(function(activeInfo) {
  last_tab_id = current_tab_id;
  current_tab_id = activeInfo.tabId;

  if(current_tab_id != -1) {
    chrome.tabs.executeScript(current_tab_id, {
      code : 'var isPeeking = ' + (isPeeking? 'true' : 'false')
    });

    chrome.tabs.executeScript(current_tab_id, {
      file : "content.js"
    });
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    isPeeking = !isPeeking;

    if(last_tab_id != -1)
        chrome.tabs.update(last_tab_id, {active: true, highlighted: true});
  });