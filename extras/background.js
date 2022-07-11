chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.runtime.setUninstallURL('https://tools.scratchstatus.org/goodbye')
        chrome.tabs.create({ url: 'https://tools.scratchstatus.org/welcome' })
    }
});
  
  chrome.tabs.onUpdated.addListener(function (tabId , info) {
    if (info.status === 'loading') {
  async function getCurrentTab() {
    var response = await fetch('/features/features.json')
    var data = await response.json()
    console.log(data)
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/logging.js`],
      world:'MAIN'
    });
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [`/api/vm.js`],
      world:'MAIN'
    });
    Object.keys(data).forEach(async function(el) {
      chrome.storage.sync.get("features", function (obj) {
        console.log(obj['features']);
        console.log(obj['features'])
        if (data[el]['default'] === true) {
          if (!obj['features'].includes(data[el]['file'])) {
       chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/features/${data[el]['file']}.js`],
        world:'MAIN'
      });
    }
        } else {
        if (obj['features'].includes(data[el]['file'])) {
       chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [`/features/${data[el]['file']}.js`],
        world:'MAIN'
      });
        }
    }
    });
    })
    var version = '2.6.0'
    await chrome.storage.sync.get("version", async function (obj) {
        if (obj['version'] !== version) {
            var tab = await chrome.tabs.get(tabId)
            if (tab.url.includes('https://scratch.mit.edu')) {
            chrome.storage.sync.set({"version": version})
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: [`/extras/new.js`]
              });
            }
        }
    })
  }
  getCurrentTab()
  }
  })
