var swipeGestureTimeout = -1;
var horizontalMouseMove = 0;
var verticalMouseMove = 0;

var beginningScrollLeft = null;
var beginningScrollRight = null;
var hasShownSwipeArrow = false;

function resetCounters() {
	horizontalMouseMove = 0;
	verticalMouseMove = 0;

	beginningScrollLeft = null;
	beginningScrollRight = null;
	hasShownSwipeArrow = false;
}

function onSwipeGestureFinish() {
	if (horizontalMouseMove - beginningScrollRight > 150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5) {
		if (beginningScrollRight < 10) {
			resetCounters();
			ipcRenderer.send("asynchronous-message", ["goForward"]);
		}
	}

	if (horizontalMouseMove + beginningScrollLeft < -150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5) {
		if (beginningScrollLeft < 10) {
			resetCounters();
			ipcRenderer.send("asynchronous-message", ["goBack"]);
		}
	}
	resetCounters();
}

window.addEventListener("wheel", function(e) {
	verticalMouseMove += e.deltaY;
	horizontalMouseMove += e.deltaX;
	var scroll = document.scrollingElement;

	if (!beginningScrollLeft || !beginningScrollRight) {
		beginningScrollLeft = scroll.scrollLeft;
		beginningScrollRight = scroll.scrollWidth - scroll.clientWidth - scroll.scrollLeft;
	}

	if (Math.abs(e.deltaX) >= 20 || Math.abs(e.deltaY) >= 20) {
		clearTimeout(swipeGestureTimeout);
		if (horizontalMouseMove < -150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5 && !hasShownSwipeArrow) {
			hasShownSwipeArrow = true;
		} else if (horizontalMouseMove > 150 && Math.abs(horizontalMouseMove / verticalMouseMove) > 2.5 && !hasShownSwipeArrow) {
			hasShownSwipeArrow = true;
		}
		swipeGestureTimeout = setTimeout(onSwipeGestureFinish, 70);
	}

	if (e.ctrlKey && !e.defaultPrevented) {
		if (verticalMouseMove > 10) {
			zoomOut();
			verticalMouseMove = 0;
		}
		if (verticalMouseMove < -10) {
			zoomIn();
			verticalMouseMove = 0;
		}

		e.preventDefault();
	}
	var platformZoomKey = e.metaKey;

	if (verticalMouseMove > 55 && platformZoomKey) {
		verticalMouseMove = -10;
		zoomOut();
	}

	if (verticalMouseMove < -55 && platformZoomKey) {
		verticalMouseMove = -10;
		zoomIn();
	}

	if (platformZoomKey) {
		e.preventDefault();
	}
});
