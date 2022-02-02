import { onPaint, onSize } from "common/callbacks";

onSize.event(function onsize() {
	console.log("on_size");
});

onPaint.event(function onpaint(gr: GdiGraphics) {
	gr.FillSolidRect(0, 0, 200, 200, 0xff222222);
	console.log("onpaint");
});

