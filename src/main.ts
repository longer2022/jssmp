import { onMouseLbtnDown, onPaint, onSize } from "common/callbacks";
import { Panel, randomColor, Rect } from "common/panel_splitter";

/**
 * draw a panel and it's children;
 */
function drawPanel(gr: GdiGraphics, panel: Panel) {
	if (!panel || !panel.visible) return;

	// draw self;
	fillRect(gr, panel.bounds, randomColor());
	panel.draw && panel.draw(gr);

	// draw children;
	for (let i = 0; i < panel.children.length; i++) {
		drawPanel(gr, panel.children[i]);
	}
}


///////////////////////////////////////////////////////
// test panel

const _test_panel = new Panel();
const a = new Panel();
const b = new Panel();
a.caption = "a";
b.caption = "b";
_test_panel.addChild([a, b]);
_test_panel.logChild();

a.boundsProps = {
	x: 50,
	y: 50,
	width: () => a.parent.bounds.width / 2,
	height: () => a.parent.bounds.height - 100,
}

export function fillRect(gr: GdiGraphics, bounds: Rect, color: number) {
	gr.FillSolidRect(bounds.x, bounds.y, bounds.width, bounds.height, color);
}

onSize.event(() => {
	_test_panel.bounds = new Rect(0, 0, window.Width, window.Height);

	a.bounds = new Rect(0, 0, 100, 200);
	b.bounds = new Rect(50, 50, 300, 100);
});

onPaint.event((gr: GdiGraphics) => {
	drawPanel(gr, _test_panel);
});

onMouseLbtnDown.event((event) => {
	const result = _test_panel.findPanel(event.x, event.y)
	if (result) {
		console.log(result.caption);
	}
	console.log("removeChild", _test_panel.removeChild(result))
	window.Repaint();
});
