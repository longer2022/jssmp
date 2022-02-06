import { onPaint, onSize } from "common/callbacks";
import { Rect } from "common/splitter";
import { rootLayout } from "parts/layout";
import { playlist } from "parts/playlist";

onSize.event(function onsize() {
	console.log("on_size");
	playlist.render(playlist.getGroups(), 0, new Rect(0, 0, window.Width, window.Height));
	console.log(playlist.itemBounds.length);
	rootLayout.getBounds();
});

onPaint.event(function onpaint(gr: GdiGraphics) {
	gr.FillSolidRect(0, 0, 200, 200, 0xff222222);
	console.log("onpaint");
	for (let i = 0; i < playlist.itemBounds.length; i++) {
		let bounds = playlist.itemBounds[i];
		gr.FillSolidRect(bounds.x, bounds.y, bounds.width, bounds.height, (i % 2) == 1 ? 0xff222222 : 0xff333333);
		gr.DrawRect(bounds.x, bounds.y, bounds.width, bounds.height - 2, 1, 0xffaaaaaa);
	}
});
