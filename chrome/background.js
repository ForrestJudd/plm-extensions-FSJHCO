
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'fetchData' && request.url) {
		fetch(request.url)
			.then(response => response.json())
			.then(data => sendResponse({ success: true, data: data }))
			.catch(error => sendResponse({ success: false, error: error.message }));
		return true;
	}
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
	if (tab.url && tab.url.includes("autodeskplm360.net") && tab.url.includes("affected-items"))
	{
		const queryParameters = tab.url.split("?")[1];
		const urlParameters = new URLSearchParams(queryParameters);
		const recordDMSID = urlParameters.get("itemId").split(",")[-1];
		console.log(dmsID);
		chrome.tabs.sendMessage(tabId, {
			dmsID: recordDMSID
		})
	}
})