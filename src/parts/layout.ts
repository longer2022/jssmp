import { CompositionBase } from "common/stacksplitter";

/**
 * rootLayout
 * - topbar
 * - main
 * 	-
 * - bottom
 */
export const rootLayout = new CompositionBase({});
const topbar = new CompositionBase({});
const main = new CompositionBase({});
const bottom = new CompositionBase({});

rootLayout.addChild(topbar);
rootLayout.addChild(main);
rootLayout.addChild(bottom);
