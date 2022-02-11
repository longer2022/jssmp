// Helpers.js

export function RGBA(r: number, g: number, b: number, a: number) {
	return ((a << 24) | (r << 16) | (g << 8) | (b));
}

export function RGB(r: number, g: number, b: number) {
	return (0xff000000 | (r << 16) | (g << 8) | (b));
}

// returns an array like [192, 0, 0]
export function toRGB(col: number) {
	var a = col - 0xFF000000;
	return [a >> 16, a >> 8 & 0xFF, a & 0xFF];
}

export function getAlpha(colour: number) {
	return ((colour >> 24) & 0xff);
}

export function getRed(colour: number) {
	return ((colour >> 16) & 0xff);
}

export function getGreen(colour: number) {
	return ((colour >> 8) & 0xff);
}

export function getBlue(colour: number) {
	return (colour & 0xff);
}

export function setAlpha(colour: number, a: number) {
	return ((colour & 0x00ffffff) | (a << 24));
}

// Helper function for GdiGraphics.DrawString() and GdiGraphics.MeasureString()
export function StringFormat(h_align = 0, v_align = 0, trimming = 0, flags = 0) {
	return ((h_align << 28) | (v_align << 24) | (trimming << 20) | flags);
}

// Based on human hearing curve
// 0 <= pos <= 1
// return a value value: -100 <= vol <= 0
export function pos2vol(pos: number) {
	return 50 * Math.log(0.99 * pos + 0.01) / Math.LN10;
}

// Inverse function of pos2vol()
export function vol2pos(v: number) {
	return (Math.pow(10, v / 50) - 0.01) / 0.99;
}

const SM_CXVSCROLL = 2;
const SM_CYHSCROLL = 3;

export function get_system_scrollbar_width() {
	return utils.GetSystemMetrics(SM_CXVSCROLL);
}

export function get_system_scrollbar_height() {
	return utils.GetSystemMetrics(SM_CYHSCROLL);
}

export function randomColor() {
	return RGB(Math.floor(255 * Math.random()), Math.floor(255 * Math.random()), Math.floor(255 * Math.random()));
}
