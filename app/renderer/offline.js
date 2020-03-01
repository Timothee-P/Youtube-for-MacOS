var wasDisconnected = false;

const alertOnlineStatus = () => {
	if (!navigator.onLine) {
		ipcRenderer.send("asynchronous-message", ["offline"]);
	}
};

window.addEventListener("online", alertOnlineStatus);
window.addEventListener("offline", alertOnlineStatus);
alertOnlineStatus();
