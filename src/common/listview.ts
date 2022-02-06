import { Scrollbar } from "parts/scrollbar";

export class ListView<T>{
	items: T[] = [];
	scrollbar: Scrollbar;
}

export class GroupedList<I, G> {
	items: I[] = [];
	groups: G[] = [];
	scrollbar: Scrollbar;
}
