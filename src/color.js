import { clamp, roundFloat } from "./common";

export class RGBA {
	constructor(r, g, b, a) {
		this._r = clamp(r | 0, 0, 255);
		this._g = clamp(g | 0, 0, 255);
		this._b = clamp(b | 0, 0, 255);
		this._a = roundFloat(clamp(a, 0, 1), 3);
	}
}

export class HSLA {
	constructor(h, s, l, a) {
		this.h = clamp(h, 0, 360);
		this.s = roundFloat(clamp(s, 0, 1), 3);
		this.l = roundFloat(clamp(l, 0, 1), 3);
		this.a = roundFloat(clamp(a, 0, 1), 3);
	}

	fromRGBA(rgba) {
		const r = rgba.r / 255;
		const g = rgba.g / 255;
		const b = rgba.b / 255;
		const a = rgba.a;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		let h = 0;
		let s = 0;
		const l = (min + max) / 2;
		const chroma = max - min;

		if (chroma > 0) {
			s = Math.min((l <= 0.5 ? chroma / (2 * l) : chroma / (2 - (2 * l))), 1);

			switch (max) {
				case r: h = (g - b) / chroma + (g < b ? 6 : 0); break;
				case g: h = (b - r) / chroma + 2; break;
				case b: h = (r - g) / chroma + 4; break;
			}

			h *= 60;
			h = Math.round(h);
		}
		return new HSLA(h, s, l, a);
	}

	/**
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h in the set [0, 360] s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 */
	static toRGBA(hsla) {
		const h = hsla.h / 360;
		const { s, l, a } = hsla;
		let r, g, b;

		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = _hue2rgb(p, q, h + 1 / 3);
			g = _hue2rgb(p, q, h);
			b = _hue2rgb(p, q, h - 1 / 3);
		}

		return new RGBA(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
	}
}

function _hue2rgb(v1, v2, vH) {
	if (vH < 0)
		vH += 1;
	if (vH > 1)
		vH -= 1;
	if ((6 * vH) < 1)
		return (v1 + (v2 - v1) * 6 * vH);
	if ((2 * vH) < 1)
		return (v2);
	if ((3 * vH) < 2)
		return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
	return (v1);
};
