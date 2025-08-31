// Cross-browser API
const api = typeof browser !== 'undefined' ? browser : chrome;

api.runtime.onInstalled.addListener(() => {
  console.log('YouTube Shorts Blocker installed');
});

api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('youtube.com')) {
    api.scripting.executeScript({
      target: { tabId },
      files: ['blocker.js'],
    });
  }
});

// Redirect Shorts URLs → normal YouTube watch or homepage
api.webRequest.onBeforeRequest.addListener(
  (details) => {
    const shortsRegex = /https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
    const match = details.url.match(shortsRegex);
    if (match) {
      // redirect to normal watch page
      const videoId = match[1];
      return { redirectUrl: `https://www.youtube.com/watch?v=${videoId}` };
      // Or redirect to homepage instead:
      // return { redirectUrl: "https://www.youtube.com/" };
    }
  },
  { urls: ['*://www.youtube.com/shorts/*'], types: ['main_frame'] },
  ['blocking']
);
