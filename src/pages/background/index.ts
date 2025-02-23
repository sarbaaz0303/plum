console.log("background script loaded");

chrome.runtime.onInstalled.addListener(async () => {
 console.log("Extension installed");

 // Enable sidebar action by default
 try {
  await chrome.sidePanel.setOptions({
   enabled: true,
  });
  console.log("Sidebar permission enabled");
 } catch (error) {
  console.error("Failed to enable sidebar:", error);
 }
});

chrome.action.onClicked.addListener(async (tab) => {
 console.log("Extension action clicked");

 const isSidebarOpen = await chrome.sidePanel.getOptions({ tabId: tab.id! });

 if (isSidebarOpen.enabled) {
  await chrome.sidePanel.setOptions({ tabId: tab.id!, enabled: false });
  console.log("Sidebar closed");
 } else {
  await chrome.sidePanel.setOptions({ tabId: tab.id!, enabled: true });
  console.log("Sidebar opened");
 }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
 console.log("Message received:", message);

 if (message.type === "USER_MESSAGE") {
  sendData("http://localhost:8000/response/", { message: message.payload })
   .then((response) => sendResponse({ success: true, content: response }))
   .catch((error) => sendResponse({ success: false, error: error.message }));

  return true;
 }
});

async function sendData(url: string, data: object) {
 try {
  const response = await fetch(url, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
  });

  if (!response.ok) {
   throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  console.log("Success:", result);
  return result;
 } catch (error) {
  console.error("Error:", error);
 }
}
