import { Emitter } from "vs/base/common/event";

const globalThis_ = Function("return this")();

/**
 * Register fb callbacks
 */

type callbackNames = 'on_paint'
	| 'on_size'
	| 'on_mouse_move'
	| 'on_mouse_lbtn_down'
	| 'on_mouse_lbtn_up'
	| 'on_mouse_rbtn_down'
	| 'on_mouse_rbtn_up'
	| 'on_mouse_lbtn_dblclk'
	| 'on_mouse_wheel'
	| 'on_mouse_leave'
	| 'on_key_down'
	| 'on_key_up'
	| 'on_focus'
	| 'on_char'
	| 'on_drag_enter'
	| 'on_drag_leave'
	| 'on_drag_over'
	| 'on_drag_drop'
	| 'on_playback_order_changed'
	| 'on_playback_stop'
	| 'on_playback_pause'
	| 'on_playback_edited'
	| 'on_playback_new_track'
	| 'on_selection_changed'
	| 'on_playlist_items_added'
	| 'on_playlist_items_removed'
	| 'on_playlist_items_reordered'
	| 'on_playlists_changed'
	| 'on_playlist_switch'
	| 'on_item_focus_change'
	| 'on_metadb_changed'
	| 'on_volume_change'
	| 'on_get_album_art_done'
	| 'on_load_image_done'
	| 'on_library_items_added'
	| 'on_library_items_removed'
	| 'on_library_items_changed'
	| 'on_playlist_item_ensure_visible'
	| 'on_font_changed'
	| 'on_color_changed'
	| 'on_colour_changed';

export const onSize = new Emitter<void>();
export const onPaint = new Emitter<GdiGraphics>()
export const onMouseMove = new Emitter<{ x: number, y: number }>();
export const onMouseLbtnDown = new Emitter<{ x: number; y: number; mask?: number }>();
export const onMouseLbtnUp = new Emitter<{ x: number; y: number; mask?: number }>();
export const onMouseRbtnDown = new Emitter<{ x: number; y: number; mask?: number }>();
export const onMouseRbtnUp = new Emitter<{ x: number; y: number; mask?: number }>();


globalThis_["on_size"] = function on_size() {
	onSize.fire()
}

globalThis_["on_paint"] = function on_paint(gr: GdiGraphics) {
	onPaint.fire(gr);
}

globalThis_["on_mouse_move"] = function on_mouse_move(x: number, y: number) {
	onMouseMove.fire({ x, y });
}
