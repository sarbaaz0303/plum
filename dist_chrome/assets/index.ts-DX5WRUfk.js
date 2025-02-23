console.log("background script loaded");chrome.runtime.onMessage.addListener((e,o,r)=>{if(console.log("Message received:",e),e.type==="USER_MESSAGE")return r({reply:"Hello from the background script!"}),!0});
//# sourceMappingURL=index.ts-DX5WRUfk.js.map
