// JS Smooth Playlist Manager.

//
class PanelProperty {
	constructor(name, defaultValue) {
		this.name = name;
		this.value = this.getprop(this.name, defaultValue);
	}

	get() {
		return this.value();
	}

	set(new_value) {
		if (this.value !== new_value) {
			this.setprop(this.name, new_value);
			this.value = new_value;
		}
	}

	getprop(n, v) {
		return window.GetProperty(`${n}`, v);
	}

	setprop(n, v) {
		window.SetProperty(`${n}`, v);
	}
}

//
class PanelProperties {
	constructor() {
		this.list = {};
	}

	init(properties, thisArg) {
		properties.forEach(v => this.add(v));
	}

	add(item) {
		this.list[item[0]] = 1;

		this[item[2] + "_internal"] = new PanelProperty(item[0], item[1]);

		Object.defineProperty(this, item[2], {
			get() {
				return this[item[2] + "_internal"].get();
			},
			set(new_value) {
				this[item[2] + "_internal"].set(new_value);
			}
		})
	}

	remove(k) {
		let p = this[k];
		p && p.set(p.name, null);
	}

	removeProp(name) {
		PanelProperty.prototype.set.call(null, name, null);
	}
}


const ppt = new PanelProperties();
ppt.init([
	["_prop.rowHeight", 35, "rowHeight"],
	["_display.showTopBar", true, "showTopBar"],
	["_display.enableCustomColors", false, "enableCustomColors"],
	["_display.showWallpaper", false, "showWallpaper"],
	["_display.wallpaperBlurred", true, "wallpaperBlurred"],
	["_sys.wallpaperMode", 0, "wallpaperMode"],
	["_prop.defaultWallpaperPath", "", "defaultWallpaperPath"],
	["_sys.extraFontSize", 0, "extraFontSize"],
	["_prop.showFilterBox", true, "showFilterBox"],
	["_prop.touchControl", false, "touchControl"]
]);
