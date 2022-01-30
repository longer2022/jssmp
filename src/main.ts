import { RGB } from "src/common/helpers";
import { Margin } from "src/common/stacksplitter";

export function on_paint(gr: GdiGraphics) {
	gr.FillSolidRect(0, 0, window.Width, window.Height, RGB(0, 0, 0))
}

export function on_size() {

}

export function on_mouse_move(x: number, y: number) {
}


let margin_test = new Margin();
console.log(margin_test);

if (typeof "module" == undefined) {
	var module = {}
}
