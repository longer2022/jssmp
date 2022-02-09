import { onPaint, onSize } from "common/callbacks";
import { RGB } from "common/helpers";
import { fillRect } from "main";

export class Margin {
	left: number;
	top: number;
	right: number;
	bottom: number;

	constructor(l?: number, t?: number, r?: number, b?: number) {
		this.left = l || 0;
		this.top = t || 0;
		this.right = r || 0;
		this.bottom = b || 0;
	}

	eq(margin: Margin) {
		if (!margin) return false;
		if (margin === this) return true;
		return margin.left === this.left
			&& margin.right === this.right
			&& margin.top === this.top
			&& margin.bottom === this.bottom;
	}

	toString() {
		return `margin: ${[this.left, this.top, this.right, this.bottom]}`
	}
}


export class Dimention {
	width: number;
	height: number;

	constructor(w: number, h: number) {
		this.width = w || 0;
		this.height = h || 0;
	}

	eq(dim: Dimention) {
		if (!dim) return false;
		if (dim === this) return true;
		return this.width === dim.width && this.height === dim.height;
	}
}

class Position {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x || 0;
		this.y = y || 0;
	}

	eq(pos: Position) {
		if (!pos) return false;
		if (pos === this) return true;
		return this.x === pos.x && this.y === pos.y;
	}
}

export class Rect {

	x: number;
	y: number;
	width: number;
	height: number;

	get right() {
		return this.x + this.width;
	}

	get bottom() {
		return this.y + this.height;
	}

	get location() {
		return { x: this.x, y: this.y };
	}

	get size() {
		return { width: this.width, height: this.height };
	}

	constructor(x: number, y: number, w: number, h: number) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = w || 0;
		this.height = h || 0;
	}

	move(ox: number, oy: number) {
		this.x += ox;
		this.y += oy;
	}

	contains(px: number, py: number) {
		return this.x <= px && px < this.right && this.y <= py && py < this.bottom;
	}

	eq(rect: Rect) {
		if (!rect) return false;
		if (rect === this) return true;
		return this.x === rect.x
			&& this.y === rect.y
			&& this.width === rect.width
			&& this.height === rect.height
	}

	toString() {
		return [this.x, this.y, this.width, this.height].join(",")
	}
}

export function randomColor() {
	return RGB(Math.floor(255 * Math.random()), Math.floor(255 * Math.random()), Math.floor(255 * Math.random()));
}

interface IPanel {

	get padding(): Margin;
	set padding(val: Margin);

	get bounds(): Rect;
	set bounds(val: Rect);

}

export class Panel implements IPanel {

	name = "panel";

	private _padding: Margin = new Margin();
	get padding(): Margin {
		return this._padding;
	}

	set padding(val: Margin) {
		if (!(this._padding && this._padding.eq(val))) {
			this._padding = val;
		}
	}

	private _bounds: Rect;
	get bounds(): Rect {
		return this._bounds;
	}
	set bounds(val: Rect) {
		if (!(this._bounds && this._bounds.eq(val))) {
			this._bounds = val;
		}
	}

	parent: Panel;
	children: Panel[] = [];

	private _visible = true;
	get visible() { return this._visible };
	set visible(val: boolean) { if (this._visible !== val) this._visible = val; }

	constructor() { }


	/**
	 * 递归地执行，意味着root必须传入global position。
	 */
	findPanel(x: number, y: number): Panel | null {
		if (!this.visible) return null;
		const bounds = this.bounds;
		const relativeBounds = new Rect(0, 0, bounds.width, bounds.height);
		if (relativeBounds.contains(x, y)) {
			console.log(this.name, this.bounds, x, y);
			for (let i = this.children.length - 1; i >= 0; i--) {
				const child = this.children[i];
				const childBounds = child.bounds;
				const childResult = child.findPanel(x - childBounds.x, y - childBounds.y);
				if (childResult) {
					return childResult;
				}
			}
			return this;
		} else {
			return null;
		}
	}

	/**
	 * append child to the end of children.
	 */
	addChild(arg: Panel | Panel[]) {
		if (Array.isArray(arg)) {
			for (let i = 0; i < arg.length; i++) {
				if (!this.addChild(arg[i])) return false;
			}
			return true;
		} else {
			if (!arg) return false;
			if (arg.parent) return false;
			this.children.push(arg);
			arg.parent = this;
			return true;
		}
	}

	// for test;
	logChild() {
		console.log(this.children.map(child => child.name));
	}
}

