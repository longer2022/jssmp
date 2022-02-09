import { onMouseLbtnDown, onPaint, onSize } from "common/callbacks";
import { Panel, randomColor, Rect } from "common/panel_splitter";

onSize.event(function onsize() {
	// console.log("on_size");
});

onPaint.event(function onpaint(gr: GdiGraphics) {
	// gr.FillSolidRect(0, 0, 200, 200, 0xff222222);
	// console.log("onpaint");
});


///////////////////////////////////////////////////////
// test panel

const _test_panel = new Panel();
const a = new Panel();
const b = new Panel();
a.name = "a";
b.name = "b";
_test_panel.addChild([a, b]);
_test_panel.logChild();

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
		console.log(result.name);
	}
});

function drawPanel(gr: GdiGraphics, panel: Panel) {
	if (!panel) return;
	fillRect(gr, panel.bounds, randomColor());
	for (let i = 0; i < panel.children.length; i++) {
		drawPanel(gr, panel.children[i]);
	}
}
