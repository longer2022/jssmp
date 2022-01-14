// JS Stack Splitter.

let slice = [].slice;

class Margin {
	constructor(l, t, r, b) {
		let args = slice.call(null, arguments);
		if (args.length === 4) {
			this.left = l;
			this.top = t;
			this.right = r;
			this.bottom = b;
		} else {
			this.left = this.top = this.right = this.bottom = 0;
		}
	}

	eq(another) {
		if (!another) return false;
		if (another === this) return true;
		return (b instanceof this)
			&& b.left === this.left
			&& b.right === this.right
			&& b.top === this.top
			&& b.bottom === this.bottom;
	}
}

class Dimention {
	constructor(w, h) {
		this.width = w || 0;
		this.height = h || 0;
	}

	eq(d) {
		if (!d) return false;
		if (d === this) return true;
		return this.width === d.width && this.height === d.height;
	}
}

class Position {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	eq(p) {
		if (!p) return false;
		if (p === this) return true;
		return this.x === p.x && this.y === p.y;
	}
}

class Rect {
	constructor(x, y, w, h) {
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

	move(ox, oy) {
		this.x += ox;
		this.y += oy;
	}

	contains(px, py) {
		return this.x <= px && px < this.right && this.y <= py && py < this.bottom;
	}

	eq(bounds) {
		if (!bounds) return false;
		if (bounds === this) return true;
		return this.x === bounds.x
			&& this.y === bounds.y
			&& this.width === bounds.width
			&& this.height === bounds.height
	}

	toString() {
		return [this.x, this.y, this.width, this.height].join(",")
	}
}

const SizeLimit = {
	No: 0,
	Element: 1,
	ElementChildren: 2,
}

class Composition {
	constructor(props) {
		props = props || {};
		this.margin = props.margin || new Margin();
		this.padding = props.padding || new Margin();

		this._visible = true;
		this.transparentToMouse = false;
		this.sizeLimit = SizeLimit.No;
		this.children = [];
		this.parent = null;
	}

	get visible() {
		return this._visible;
	}

	set visible(v) {
		if (this._visible !== v) {
			this._visible = v;
			bufferStateChange();
		}
	}

	addChild(child) {
		return this.insertChild(this.children.length, child);
	}

	insertChild(index, child) {
		if (!child) return false;
		if (child.parent) return false;
		this.children.splice(index, 0, child);

		child.parent = this;
		child.onParentChanged(null, this);
		this.onChildInsert(child);

		bufferStateChange();
		return true;
	}

	getBounds() {
		return new Rect();
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
}

function bufferStateChange() { }

const Direction = {
	H: 0,
	V: 1,
}

class StackComposition extends Composition {
	constructor(props) {
		super(props);

		this.direction = Direction.H;
		this.gap = 0;
		this.adjustment = 0;
		this.stackItems = [];
		this.stackTotalSize = null;
		this.stackItemBounds = [];
		this.prevBounds = null;
	}

	updateStackItemBounds() {
		this.stackTotalSize = new Dimention();
		let offset = new Position();

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

	adj(u, v, itemBounds) {
		if (itemBounds[u] <= 0) {
			this.adjustment -= itemBounds[u];
		} else {
			let overflow = itemBounds[v] - this.prevBounds[v];
			if (overflow > 0) {
				this.adjustment -= overflow;
			}
		}
	}

}