// playlist;

import { GroupedList } from "common/listview";
import { Rect } from "common/panel_splitter";

function GetProperty<T extends number | string | boolean>(keyname: string, defaultVal: T): T {
	return window.GetProperty(keyname, defaultVal);
}

enum WallpaperMode {
	Defaults = "defaults",
	PlayingAlbum = "playingalbum",
}

/**
 * Config items.
 */
const ppt = {
	rowHeight: GetProperty("_ppt.rowHeight", 36),
	doubleRowPixelAdds: 3,
	rowScrollStep: 3,
	scrollSmoothness: 2.5,
	refreshRate: 40,
	extraRowsNumber: GetProperty("_ppt.extraRowsNumber", 0),
	minimumRowsNumberPerGroup: GetProperty("_ppt.minimumRowsNumberPerGroup", 0),
	groupHeaderRowsNumber: GetProperty("_ppt.groupHeaderRowsNumber", 2),
	showTopbar: GetProperty("_ppt.showTopbar", true),
	topbarHeight: 25,
	autocollapse: GetProperty("_ppt.autoCollapse", false),
	enableFullScrollEffectOnFocusChange: false,
	enableCustomColors: GetProperty("_ppt.customColors", false),
	showGroupHeader: GetProperty("_ppt.showGroupHeader", true),
	showWallpaper: GetProperty("_ppt.showWallpaper", false),
	wallpaperalpha: 150,
	wallpaperblurred: GetProperty("_ppt.wallpaperBlurred", true),
	wallpaperblurvalue: 1.05,
	wallpaperMode: GetProperty("_ppt.wallpaperMode", WallpaperMode.Defaults),
	wallpaperPath: GetProperty("_ppt.wallpaperPath", ".\\wallpaper.png"),
	extraFontSize: GetProperty("_ppt.extraFontSize", 0),
	showFilterBox: GetProperty("_ppt.showFilterBox", true),
	doubleRowText: GetProperty("_ppt.doubleRowText", true),
	showArtistAlways: GetProperty("_ppt.showArtistAlways", false),
	showRating: GetProperty("_ppt.showRating", false),
	showMood: GetProperty("_ppt.showMood", true),
	enableTouchControl: false,
}

const trackFields = "%tracknumber% ^^ %title% ^^ %artist% ^^ [%length%] ^^ %mood%";
const groupFields = "%album artist% ^^ %album% ^^ %date%";
const groupCompare = "$if2(%album artist%,$if(%length%,'?',%title%)) ^^ $if2(%album%,$if(%length%,'?',%path%)) ^^ %discnumber% ## [%artist%] ^^ %title% ^^ [%genre%] ^^ [%date%]";

const tf = {
	artist: fb.TitleFormat("%artist%"),
	albumartist: fb.TitleFormat("%album artist%"),
	groupkey: fb.TitleFormat(`${groupCompare}##${groupFields}##${trackFields}`),
	track: fb.TitleFormat("%tracknumber% ^^ [%length%] ^^ $if2(%rating%,0) ^^ %mood%"),
	path: fb.TitleFormat("$directory_path(%path%)\\"),
	crc: fb.TitleFormat("$crc32(%path%)"),
	timeremaining: fb.TitleFormat("$if(%length%,-%playback_time_remaining%,'ON AIR')"),
}


// groupkey = groupCompare + groupFields + trackfields:
// so that, EvalWithMetadb(groupkey) will return all needed.


class TrackItem {
	index: number;
	constructor(index: number) {
		this.index = index;
	}
}

class GroupItem<T> {

	index: number;
	startIndex: number;
	metadb: FbMetadbHandle;
	groupkey: string;
	trackItems: T[] = [];

	constructor(index: number, startIndex: number, metadb: FbMetadbHandle, groupkey: string) {
		this.index = index;
		this.startIndex = startIndex;
		this.metadb = metadb;
		this.groupkey = groupkey;
	}

	addTrack(arg0: T) {
		this.trackItems.push(arg0);
	}

}

export class PlaylistView extends GroupedList<TrackItem, GroupItem<TrackItem>>{

	get metadbs() {
		return plman.GetPlaylistItems(this.playlistIndex);
	}

	get playlistIndex() {
		return plman.ActivePlaylist;
	}

	tf_groupkey: FbTitleFormat;

	constructor(playlistIndex: number, groupkey: FbTitleFormat) {
		super();
		this.tf_groupkey = tf.groupkey;
	}

	/**
	 * Assert getting groups from a playlist. and `metadbs` order by playlist
	 * order.
	 * @returns
	 */
	getGroups(): GroupItem<TrackItem>[] {
		const metadbs = this.metadbs;
		const metadbsCount = metadbs.Count;
		let groups: GroupItem<TrackItem>[] = [];
		let groupCompare = "*^%$#@!1234567890";
		let groupIndex = 0;

		for (let i = 0; i < metadbsCount; i++) {
			const metadb = metadbs[i];
			const [groupKey, groupFields, trackFields] = this.tf_groupkey.EvalWithMetadb(metadb).split("##");
			if (groupKey !== groupCompare) {
				console.log([groupKey, groupFields, trackFields]);
				groupCompare = groupKey;
				// encounter a new group: create and add current track to this group.
				const currentGroup = new GroupItem<TrackItem>(groupIndex, i, metadb, groupKey);
				// TODO: TrackItem.
				currentGroup.addTrack(new TrackItem(i))
				groups.push(currentGroup);
				groupIndex++;
			} else {
				const lastGroup = groups[groups.length - 1];
				lastGroup.addTrack(new TrackItem(i));
			}
		}
		return groups;
	}

	getTrackItems(groups: GroupItem<TrackItem>[]): TrackItem[] {
		if (!groups || groups.length === 0) {
			return [];
		}
		let trackItems: TrackItem[] = [];
		for (let i = 0; i < groups.length; i++) {
			trackItems.concat(groups[i].trackItems)
		}
		return trackItems;
	}

	onDidPlaylistChange(playlistIndex: number) {
		this.groups = this.getGroups();
		this.items = this.getTrackItems(this.groups);
	}

	render(groups: GroupItem<TrackItem>[], offsetY: number, bounds: Rect) {
		let rowHeight = ppt.rowHeight;
		let groupHeight = ppt.rowHeight * ppt.groupHeaderRowsNumber;
		let itemBounds: Rect[] = [];
		let itemY = 0;

		// filter visible items;
		for (let i = 0; i < groups.length; i++) {
			itemY -= offsetY;
			// check group item;
			if (itemY < bounds.y + bounds.height && itemY + groupHeight > bounds.y) {
				itemBounds.push(new Rect(0, itemY, 100, groupHeight));
				itemY += groupHeight;
			}
			// check group track  items;
			for (let j = 0; j < groups[i].trackItems.length; j++) {
				if (itemY < bounds.y + bounds.height && itemY + rowHeight > bounds.y) {
					itemBounds.push(new Rect(0, itemY, 100, rowHeight));
					itemY += rowHeight;
				}
			}
		}

		this.itemBounds = itemBounds;
	}

	itemBounds: Rect[];

	onPaint(gr: GdiGraphics) {
		// draw visible items;
		for (let i = 0; i < this.itemBounds.length; i++) {
			// drawGroupOrTrack(bounds)
		}
	}

}


export const playlist = new PlaylistView(plman.ActivePlaylist, tf.groupkey);

