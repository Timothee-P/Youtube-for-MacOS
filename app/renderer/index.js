var headerState = {
	isVisible: false,
	isScrolling: false,
	cursorIsTop: false
};
window.addEventListener("DOMContentLoaded", (event) => {
	console.log("location changed!");
});
window.addEventListener("load", (event) => {
	console.log("location load!");
	document.querySelector("ytd-app").setAttribute("class", "ytp-big-mode");
});
document.addEventListener("fullscreenchange", function() {
	document.exitFullscreen();
});
window.addEventListener("yt-page-data-updated", function() {});
