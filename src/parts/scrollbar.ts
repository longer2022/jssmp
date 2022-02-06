import { Button } from "./button";

export class Scrollbar {

	static defaultWidth = 12;

	private slider: Slider;
	private upArrow?: Button;
	private downArrow?: Button;
}

class Slider {

	private minHeight = 16;
	private isDrag = false;
	private position = 0;

}
