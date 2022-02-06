import { TPM_BOTTOMALIGN } from "common/flags";
import { Composition } from "common/splitter";

/**
 * layout1: playlistview
 * ---------------------
 * vertical_splitter
 *  topbar
 *  horizontal_splitter
 * 		side_container
 * 		playlist
 *  bottom
 *
 *
 * layout2: album gridview
 * -----------------------
 * vertical_splitter
 * 	topbar
 * 	h_splitter
 * 		side_container2
 * 		gridview
 * 	bottom
 */

export const rootLayout = new Composition({});

const topbar = new Composition({});
const main = new Composition({});
const bottom = new Composition({});

// vertical splitter:
// topbar: fixed height = 60;
// main: height = splitterheight - topbar.height - bottom.height
// bottom: height = fixed height = 80;
[topbar, main, bottom].forEach(child => rootLayout.addChild(child));

// h splitter:
// sidecontainer: resizable width, maxwidth, minwidth, currentwidth
// playlist: resizable width,
const sideContainer = new Composition({});
const playlist = new Composition({});

;[sideContainer, playlist].forEach(child => main.addChild(child));

const libtree = new Composition({});
const coverandInfo = new Composition({});
const biography = new Composition({});

;[libtree, coverandInfo, biography].forEach(child => sideContainer.addChild(child));

const coverview = new Composition({});
const infoview = new Composition({});

;[coverview, infoview].forEach(child => coverandInfo.addChild(child));
