// JS Stack Splitter.

///////////////////////////////////////////////////////////////////////////////////////////////////
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
	constructor(x: number, y: number, w: number, h: number) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = w || 0;
		this.height = h || 0;
	}

	get right() {
		return this.x + this.width;
	}

	get bottom() {
		return this.y + this.height;
	}

	move(ox: number, oy: number) {
		this.x += ox;
		this.y += oy;
	}

	contains(px: number, py: number) {
		return this.x <= px && px < this.right && this.y <= py && py < this.bottom;
	}

	eq(rect) {
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


////////////////////////////////////////////////////////////////////////////////////////////////////

export const enum SizeLimit { No, Element, ElementChildren };

export class CompositionBase {
	props: CompositionBase;
	minWidth: number;
	minHeight: number;
	maxWidth: number;
	maxHeight: number;
	transparentToMouse: boolean;
	children: CompositionBase[];
	parent: CompositionBase;
	x: number;
	y: number;
	private prevBounds: Rect;

	constructor(props) {
		this.props = props || {};
		this.margin = this.props.margin || new Margin(0, 0, 0, 0);
		this.padding = this.props.padding || new Margin(0, 0, 0, 0);
		this.minWidth = this.props.minWidth || (this.props.maxWidth = 0);
		this.minHeight = this.props.minHeight || (this.props.minHeight = 0);
		this.maxWidth = this.props.maxWidth || (this.props.maxWidth = 0);
		this.maxHeight = this.props.maxHeight || (this.props.maxHeight = 0);

		this.transparentToMouse = false;
		this.sizeLimit = SizeLimit.No;
		this.children = [];
		this.parent = null;
	}

	addChild(child: CompositionBase) {
		return this.insertChild(this.children.length, child);
	}

	private insertChild(index: number, child: CompositionBase) {
		if (!child) return false;
		if (child.parent) return false;
		this.children.splice(index, 0, child);

		child.parent = this;
		child.onParentChanged(null, this);
		this.onChildInsert(child);

		bufferStateChange();
		return true;
	}


	removeChild(child: CompositionBase) {
		if (!child) { return false; }
		let idx = this.children.indexOf(child);
		if (idx === -1) return false;

		child.parent = null;
		child.parent.onParentChanged(this, null);
		this.onChildRemoved(child);

		this.children.splice(idx, 1);
		bufferStateChange();
		return true;
	}

	onChildInsert(child: CompositionBase) {
		throw new Error("Method not implemented.");
	}

	onChildRemoved(child: CompositionBase) {
		throw new Error("Method not implemented.");
	}

	onParentChanged(oldParent: CompositionBase, newParent: CompositionBase) {
		throw new Error("Method not impl");
	}

	get visible() {
		return this.props.visible || (this.props.visible = true);
	}

	set visible(v) {
		if (this.visible !== v) {
			this.props.visible = v;
			bufferStateChange();
		}
	}

	get margin() {
		return this.props.margin || (this.props.margin = new Margin(0, 0, 0, 0));
	}

	set margin(val) {
		if (!this.margin.eq(val)) {
			this.props.margin = val;
			bufferStateChange();
		}
	}

	get padding() {
		return this.props.padding || (this.props.padding = new Margin(0, 0, 0, 0));
	}

	set padding(val) {
		if (!this.padding.eq(val)) {
			this.props.padding = val;
			bufferStateChange();
		}
	}

	getGlobalBounds() {
		let bounds = this.getBounds();
		let cp = this.parent;
		while (cp) {
			let client = cp.getClientArea();
			bounds.x += client.x;
			bounds.y += client.y;
			cp = cp.parent;
		}
		return bounds;
	}

	getClientArea() {
		let client = this.getBounds();
		client.x += this.margin.left + this.padding.left;
		client.y += this.margin.top + this.padding.top;
		client.width -= this.margin.right + this.padding.right;
		client.height -= this.margin.bottom + this.padding.bottom;
		return client;
	}

	getPreferredClientSize() {
		let minSize = new Dimention(this.minWidth, this.minHeight);
		if (this.sizeLimit !== SizeLimit.No) {
			// if ownedElement, set to element's min size.
		}
		if (this.sizeLimit === SizeLimit.ElementChildren) {
			for (let i = 0; i < this.children.length; i++) {
				const child = this.children[i];
				const childBounds = child.getPreferredBounds();
				// ???
				if (minSize.width < childBounds.right) {
					minSize.width = childBounds.right;
				}
				if (minSize.height < childBounds.bottom) {
					minSize.height = childBounds.bottom;
				}
			}
		}
		return minSize;
	}

	private getBoundsInternal(ex: number, ey: number, ew: number, eh: number) {
		let minSize = this.getPreferredClientSize();
		minSize.width += this.margin.left + this.margin.right + this.padding.right + this.padding.left;
		minSize.height += this.margin.top + this.margin.bottom + this.padding.top + this.padding.bottom;
		let w = ew;
		let h = eh;
		if (minSize.width < w) { minSize.width = w; }
		if (minSize.height < h) { minSize.height = h }
		return new Rect(this.x, this.y, minSize.width, minSize.height);
	}

	getPreferredBounds() {
		let client = this.getPreferredClientSize();
		return this.getBoundsInternal(this.x, this.y, client.width, client.height);
	}

	getBounds() {
		return this.getPreferredBounds();
	}

	updateBounds(prevBounds: Rect) {
		if (prevBounds && !prevBounds.eq(this.prevBounds)) {
			this.prevBounds = prevBounds;
			// boundsChanged.fire(e);
			bufferStateChange();
		}
	}

	get sizeAffectParent() {
		return this.props.sizeAffectParent || (this.props.sizeAffectParent = false);
	}

	set sizeAffectParent(val) {
		if (val !== this.sizeAffectParent) {
			this.props.sizeAffectParent = val;
			bufferStateChange();
		}
	}

	get sizeLimit() {
		return this.props.sizeLimit || (this.props.sizeLimit = SizeLimit.No);
	}

	set sizeLimit(val) {
		if (val !== this.sizeLimit) {
			this.props.sizeLimit = val;
			bufferStateChange();
		}
	}
}

export function bufferStateChange() { }


export const Direction = {
	H: 0,
	V: 1,
}

export class StackComposition extends CompositionBase {
	direction: number;
	gap: number;
	adjust: number;
	stackItems: any[];
	stackTotalSize: any;
	stackItemBounds: any[];
	constructor(props) {
		super(props);

		this.direction = Direction.H;
		this.gap = 0;
		this.adjust = 0;
		this.stackItems = [];
		this.stackTotalSize = null;
		this.stackItemBounds = [];
	}

	updateStackItemBounds() {
		this.stackTotalSize = new Dimention(0, 0);
		let offset = new Position(0, 0);

		for (let i = 0; i < this.stackItems.length; i++) {
			let ox = offset.x;
			let oy = offset.y;
			let itemSize = this.stackItems[i].getMinsize();
			this.stackItemBounds[i] = new Rect(ox, oy, itemSize.width, itemSize.height);

			switch (this.direction) {
				case Direction.H:
					this.accumulate("x", "y", this.stackTotalSize, itemSize, i);
					break;
				case Direction.V:
					this.accumulate("y", "x", this.stackTotalSize, itemSize, i);
					break;
			} // eos

			offset.x += itemSize.x;
			offset.y += itemSize.y;
		}// eof

	}

	accumulate(u, v, totalSize, itemSize, i) {
		if (totalSize[v] < itemSize[v]) {
			totalSize[v] = itemSize[v];
		}
		if (i > 0) {
			totalSize[u] += this.gap;
		}
		totalSize[u] += itemSize[u];
	}

	adjustment(u, v, itemBounds) {
		if (itemBounds[u] <= 0) {
			this.adjust -= itemBounds[u];
		} else {
			let overflow = itemBounds[v] - this.prevBounds[v];
			if (overflow > 0) {
				this.adjust -= overflow;
			}
		}
	}

}
