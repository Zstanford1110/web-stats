chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  // Check for any errors before proceeding
  if (chrome.runtime.lastError) {
    console.error("Runtime error:", chrome.runtime.lastError.message);
    return;
  }

  // Once tab is fully loaded, attempt to update the visit count for that domain
  if (changeInfo.status === 'complete') {
    try {
      const url = new URL(tab.url);
      const domain = url.hostname;

      if(domain === 'newtab') return;

      chrome.storage.local.get(['visitCounts'], (result) => {
        const visitCounts = result.visitCounts || {};
        visitCounts[domain] = (visitCounts[domain] || 0) + 1;

        console.log("Count updated to: ", visitCounts[domain]);

        chrome.storage.local.set({ visitCounts });
      });
    } catch (error) {
      console.error("Error processing URL: ", error.message);
    }
  }
});