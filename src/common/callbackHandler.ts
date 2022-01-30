
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


function registerCallback(event: callbackNames, fn: Function, context: any) {
	if (typeof fn !== "function") {
		throw new TypeError('registerCallback: fn must be a function');
	}
	if (globalThis_[event] && typeof (globalThis_[event]) !== "function") {
		throw new TypeError('registerCallback: `${event}` must be a function');
	}
	// context = (context || this);
	if (!globalThis_[event]) {
		globalThis_[event] = (a1: any, a2: any, a3: any, a4: any) => {
			let len = arguments.length;
			switch (len) {
				case 0: return fn.call(context);
				case 1: return fn.call(context, a1);
				case 2: return fn.call(context, a1, a2);
				case 3: return fn.call(context, a1, a2, a3);
				case 4: return fn.call(context, a1, a2, a3, a4);
				default: return fn.apply(context, arguments);
			}
		};
	}
}
