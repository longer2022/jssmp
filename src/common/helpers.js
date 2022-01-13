// Helpers.js

export function RGBA(r, g, b, a) {
	return ((a << 24) | (r << 16) | (g << 8) | (b));
}

export function RGB(r, g, b) {
	return (0xff000000 | (r << 16) | (g << 8) | (b));
}

// returns an array like [192, 0, 0]
export function toRGB(col) {
	var a = col - 0xFF000000;
	return [a >> 16, a >> 8 & 0xFF, a & 0xFF];
}

export function getAlpha(colour) {
	return ((colour >> 24) & 0xff);
}

export function getRed(colour) {
	return ((colour >> 16) & 0xff);
}

export function getGreen(colour) {
	return ((colour >> 8) & 0xff);
}

export function getBlue(colour) {
	return (colour & 0xff);
}

export function setAlpha(colour, a) {
	return ((colour & 0x00ffffff) | (a << 24));
}

// Helper function for GdiGraphics.DrawString() and GdiGraphics.MeasureString()
export function StringFormat(h_align = 0, v_align = 0, trimming = 0, flags = 0) {
	return ((h_align << 28) | (v_align << 24) | (trimming << 20) | flags);
}

// Based on human hearing curve
// 0 <= pos <= 1
// return a value value: -100 <= vol <= 0
export function pos2vol(pos) {
	return 50 * Math.log(0.99 * pos + 0.01) / Math.LN10;
}

// Inverse function of pos2vol()
export function vol2pos(v) {
	return (Math.pow(10, v / 50) - 0.01) / 0.99;
}
