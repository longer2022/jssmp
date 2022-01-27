// Flags.js

// Flags, used with GdiDrawText()
// For more information, see: http://msdn.microsoft.com/en-us/library/dd162498(VS.85).aspx
export const DT_TOP = 0x00000000;
export const DT_LEFT = 0x00000000;
export const DT_CENTER = 0x00000001;
export const DT_RIGHT = 0x00000002;
export const DT_VCENTER = 0x00000004;
export const DT_BOTTOM = 0x00000008;
export const DT_WORDBREAK = 0x00000010;
export const DT_SINGLELINE = 0x00000020;
export const DT_EXPANDTABS = 0x00000040;
export const DT_TABSTOP = 0x00000080;
export const DT_NOCLIP = 0x00000100;
export const DT_EXTERNALLEADING = 0x00000200;
export const DT_CALCRECT = 0x00000400;
export const DT_NOPREFIX = 0x00000800;  // NOTE: Please use this flag, or a '&' character will become an underline '_'
export const DT_INTERNAL = 0x00001000;
export const DT_EDITCONTROL = 0x00002000;
export const DT_PATH_ELLIPSIS = 0x00004000;
export const DT_END_ELLIPSIS = 0x00008000;
export const DT_MODIFYSTRING = 0x00010000;  // do not use
export const DT_RTLREADING = 0x00020000;
export const DT_WORD_ELLIPSIS = 0x00040000;
export const DT_NOFULLWIDTHCHARBREAK = 0x00080000;
export const DT_HIDEPREFIX = 0x00100000;
export const DT_PREFIXONLY = 0x00200000;

// Used in AppendMenuItem() and AppendTo()
// For more information, see: http://msdn.microsoft.com/en-us/library/ms647616(VS.85).aspx
export const MF_SEPARATOR = 0x00000800;
export const MF_ENABLED = 0x00000000;
export const MF_GRAYED = 0x00000001;
export const MF_DISABLED = 0x00000002;
export const MF_UNCHECKED = 0x00000000;
export const MF_CHECKED = 0x00000008;
export const MF_STRING = 0x00000000;
//var MF_BITMAP = 0x00000004;  // do not use
//var MF_OWNERDRAW = 0x00000100;  // do not use
//var MF_POPUP = 0x00000010; // do not use
export const MF_MENUBARBREAK = 0x00000020;
export const MF_MENUBREAK = 0x00000040;

// Used in TrackPopupMenu()
// For more information, see: http://msdn.microsoft.com/en-us/library/ms648002(VS.85).aspx
export const TPM_LEFTALIGN = 0x0000;
export const TPM_CENTERALIGN = 0x0004;
export const TPM_RIGHTALIGN = 0x0008;
export const TPM_TOPALIGN = 0x0000;
export const TPM_VCENTERALIGN = 0x0010;
export const TPM_BOTTOMALIGN = 0x0020;
export const TPM_HORIZONTAL = 0x0000;     /* Horz alignment matters more */
export const TPM_VERTICAL = 0x0040;     /* Vert alignment matters more */
// Animations
export const TPM_HORPOSANIMATION = 0x0400;
export const TPM_HORNEGANIMATION = 0x0800;
export const TPM_VERPOSANIMATION = 0x1000;
export const TPM_VERNEGANIMATION = 0x2000;
export const TPM_NOANIMATION = 0x4000;

// Mask for mouse callbacks
export const MK_LBUTTON = 0x0001;
export const MK_RBUTTON = 0x0002;
export const MK_SHIFT = 0x0004; // The SHIFT key is down.
export const MK_CONTROL = 0x0008; // The CTRL key is down.
export const MK_MBUTTON = 0x0010;
export const MK_XBUTTON1 = 0x0020;
export const MK_XBUTTON2 = 0x0040;

// Used in window.SetCursor()
export const IDC_ARROW = 32512;
export const IDC_IBEAM = 32513;
export const IDC_WAIT = 32514;
export const IDC_CROSS = 32515;
export const IDC_UPARROW = 32516;
export const IDC_SIZE = 32640;
export const IDC_ICON = 32641;
export const IDC_SIZENWSE = 32642;
export const IDC_SIZENESW = 32643;
export const IDC_SIZEWE = 32644;
export const IDC_SIZENS = 32645;
export const IDC_SIZEALL = 32646;
export const IDC_NO = 32648;
export const IDC_APPSTARTING = 32650;
export const IDC_HAND = 32649;
export const IDC_HELP = 32651;

// Used in utils.Glob()
// For more information, see: http://msdn.microsoft.com/en-us/library/ee332330%28VS.85%29.aspx
export const FILE_ATTRIBUTE_READONLY = 0x00000001;
export const FILE_ATTRIBUTE_HIDDEN = 0x00000002;
export const FILE_ATTRIBUTE_SYSTEM = 0x00000004;
export const FILE_ATTRIBUTE_DIRECTORY = 0x00000010;
export const FILE_ATTRIBUTE_ARCHIVE = 0x00000020;
//var FILE_ATTRIBUTE_DEVICE            = 0x00000040; // do not use
export const FILE_ATTRIBUTE_NORMAL = 0x00000080;
export const FILE_ATTRIBUTE_TEMPORARY = 0x00000100;
export const FILE_ATTRIBUTE_SPARSE_FILE = 0x00000200;
export const FILE_ATTRIBUTE_REPARSE_POINT = 0x00000400;
export const FILE_ATTRIBUTE_COMPRESSED = 0x00000800;
export const FILE_ATTRIBUTE_OFFLINE = 0x00001000;
export const FILE_ATTRIBUTE_NOT_CONTENT_INDEXED = 0x00002000;
export const FILE_ATTRIBUTE_ENCRYPTED = 0x00004000;
//var FILE_ATTRIBUTE_VIRTUAL           = 0x00010000; // do not use

// With window.DlgCode, can be combined.
// If you don't know what they mean, igonre them.
export const DLGC_WANTARROWS = 0x0001;     /* Control wants arrow keys         */
export const DLGC_WANTTAB = 0x0002;     /* Control wants tab keys           */
export const DLGC_WANTALLKEYS = 0x0004;     /* Control wants all keys           */
export const DLGC_WANTMESSAGE = 0x0004;     /* Pass message to control          */
export const DLGC_HASSETSEL = 0x0008;     /* Understands EM_SETSEL message    */
export const DLGC_DEFPUSHBUTTON = 0x0010;     /* Default pushbutton               */
export const DLGC_UNDEFPUSHBUTTON = 0x0020;     /* Non-default pushbutton           */
export const DLGC_RADIOBUTTON = 0x0040;     /* Radio button                     */
export const DLGC_WANTCHARS = 0x0080;     /* Want WM_CHAR messages            */
export const DLGC_STATIC = 0x0100;     /* Static item: don't include       */
export const DLGC_BUTTON = 0x2000;     /* Button item: can be checked      */

// Used with utils.IsKeyPressed()
export const VK_BACK = 0x08;
export const VK_TAB = 0x09;
export const VK_RETURN = 0x0D;
export const VK_SHIFT = 0x10;
export const VK_CONTROL = 0x11;
export const VK_ALT = 0x12;
export const VK_ESCAPE = 0x1B;
export const VK_PGUP = 0x21;
export const VK_PGDN = 0x22;
export const VK_END = 0x23;
export const VK_HOME = 0x24;
export const VK_LEFT = 0x25;
export const VK_UP = 0x26;
export const VK_RIGHT = 0x27;
export const VK_DOWN = 0x28;
export const VK_INSERT = 0x2D;
export const VK_DELETE = 0x2E;
export const VK_SPACEBAR = 0x20;

// Used in IFbTooltip.GetDelayTime() and IFbTooltip.SetDelayTime()
// For more information, see: http://msdn.microsoft.com/en-us/library/bb760404(VS.85).aspx
export const TTDT_AUTOMATIC = 0;
export const TTDT_RESHOW = 1;
export const TTDT_AUTOPOP = 2;
export const TTDT_INITIAL = 3;

// Used in gdi.Font(), can be combined
// For more information, see: http://msdn.microsoft.com/en-us/library/ms534124(VS.85).aspx
export const FontStyle = {
	Regular: 0,
	Bold: 1,
	Italic: 2,
	BoldItalic: 3,
	Underline: 4,
	Strikeout: 8
};

// Used in SetTextRenderingHint()
// For more information, see: http://msdn.microsoft.com/en-us/library/ms534404(VS.85).aspx
export const TextRenderingHint = {
	SystemDefault: 0,
	SingleBitPerPixelGridFit: 1,
	SingleBitPerPixel: 2,
	AntiAliasGridFit: 3,
	AntiAlias: 4,
	ClearTypeGridFit: 5
};

// Used in SetSmoothingMode()
// For more information, see: http://msdn.microsoft.com/en-us/library/ms534173(VS.85).aspx
export const SmoothingMode = {
	Invalid: -1,
	Default: 0,
	HighSpeed: 1,
	HighQuality: 2,
	None: 3,
	AntiAlias: 4
};

// Used in SetInterpolationMode()
// For more information, see: http://msdn.microsoft.com/en-us/library/ms534141(VS.85).aspx
export const InterpolationMode = {
	Invalid: -1,
	Default: 0,
	LowQuality: 1,
	HighQuality: 2,
	Bilinear: 3,
	Bicubic: 4,
	NearestNeighbor: 5,
	HighQualityBilinear: 6,
	HighQualityBicubic: 7
};

// Used in RotateFlip()
// For more information, see: http://msdn.microsoft.com/en-us/library/ms534171(VS.85).aspx
export const RotateFlipType = {
	RotateNoneFlipNone: 0,
	Rotate90FlipNone: 1,
	Rotate180FlipNone: 2,
	Rotate270FlipNone: 3,

	RotateNoneFlipX: 4,
	Rotate90FlipX: 5,
	Rotate180FlipX: 6,
	Rotate270FlipX: 7,

	RotateNoneFlipY: 6,
	Rotate90FlipY: 7,
	Rotate180FlipY: 4,
	Rotate270FlipY: 5,

	RotateNoneFlipXY: 2,
	Rotate90FlipXY: 3,
	Rotate180FlipXY: 0,
	Rotate270FlipXY: 1
};

// h_align/v_align:
// http://msdn.microsoft.com/en-us/library/ms534177(VS.85).aspx
export const StringAlignment = {
	Near: 0,
	Center: 1,
	Far: 2
};

// trimming:
// http://msdn.microsoft.com/en-us/library/ms534403(VS.85).aspx
export const StringTrimming = {
	None: 0,
	Character: 1,
	Word: 2,
	EllipsisCharacter: 3,
	EllipsisWord: 4,
	EllipsisPath: 5
};

// flags, can be combined of:
// http://msdn.microsoft.com/en-us/library/ms534181(VS.85).aspx
export const StringFormatFlags = {
	DirectionRightToLeft: 0x00000001,
	DirectionVertical: 0x00000002,
	NoFitBlackBox: 0x00000004,
	DisplayFormatControl: 0x00000020,
	NoFontFallback: 0x00000400,
	MeasureTrailingSpaces: 0x00000800,
	NoWrap: 0x00001000,
	LineLimit: 0x00002000,
	NoClip: 0x00004000
};

// Used in utils.GetAlbumArt()
export const AlbumArtId = {
	front: 0,
	back: 1,
	disc: 2,
	icon: 3,
	artist: 4
};

// Used in window.GetColourCUI()
export const ColourTypeCUI = {
	text: 0,
	selection_text: 1,
	inactive_selection_text: 2,
	background: 3,
	selection_background: 4,
	inactive_selection_background: 5,
	active_item_frame: 6
};

// Used in window.GetFontCUI()
export const FontTypeCUI = {
	items: 0,
	labels: 1
};

// Used in window.GetColourDUI()
export const ColourTypeDUI = {
	text: 0,
	background: 1,
	highlight: 2,
	selection: 3
};

// Used in window.GetFontDUI()
export const FontTypeDUI = {
	defaults: 0,
	tabs: 1,
	lists: 2,
	playlists: 3,
	statusbar: 4,
	console: 5
};

/*
SupportColourFlagCUI = {
		text: 0x0,
		selection_text: 0x2,
		inactive_selection_text: 0x4,
		background: 0x8,
		selection_background: 0x10;
		inactive_selection_background: 0x20,
		active_item_frame: 0x40,
		group_foreground: 0x80,
		group_background: 0x100,
		colour_flag_all: 0x1ff
};

=== Colours ===
Used in GetColourCUI() as client_guid
NG Playlist: "{C882D3AC-C014-44DF-9C7E-2DADF37645A0}" Support Bits: 0x000001ff
Columns Playlist: "{0CF29D60-1262-4F55-A6E1-BC4AE6579D19}" Support Bits: 0x000001ff
Item Details: "{4E20CEED-42F6-4743-8EB3-610454457E19}" Support Bits: 0x00000009
Album List: "{DA66E8F3-D210-4AD2-89D4-9B2CC58D0235}" Support Bits: 0x00000049
Filter Panel: "{4D6774AF-C292-44AC-8A8F-3B0855DCBDF4}" Support Bits: 0x000001ff
Biography View: "{1CE33A5C-1D79-48F7-82EF-089EC49A9CA3}" Support Bits: 0x00000059
Artwork View: "{E32DCBA9-A2BF-4901-AB43-228628071410}" Support Bits: 0x00000008
Playlist Switcher: "{EB38A997-3B5F-4126-8746-262AA9C1F94B}" Support Bits: 0x000001ff
Item Properties: "{862F8A37-16E0-4A74-B27E-2B73DB567D0F}" Support Bits: 0x000001ff

=== Fonts ===
Used in GetFontCUI() as client_guid
Album List: "{06B856CC-86E7-4459-A75C-2DAB5B33B8BB}"
Item Properties: Group Titles: "{AF5A96A6-96ED-468F-8BA1-C22533C53491}"
Columns Playlist: Items: "{82196D79-69BC-4041-8E2A-E3B4406BB6FC}"
NG Playlist: Group Titles: "{FB127FFA-1B35-4572-9C1A-4B96A5C5D537}"
NG Playlist: Column Titles: "{30FBD64C-2031-4F0B-A937-F21671A2E195}"
Playlist Switcher: "{70A5C273-67AB-4BB6-B61C-F7975A6871FD}"
Filter Panel: Column Titles: "{FCA8752B-C064-41C4-9BE3-E125C7C7FC34}"
Columns Playlist: Column Titles: "{C0D3B76C-324D-46D3-BB3C-E81C7D3BCB85}"
Tab Stack: "{6F000FC4-3F86-4FC5-80EA-F7AA4D9551E6}"
Console: "{26059FEB-488B-4CE1-824E-4DF113B4558E}"
Biography View: "{F692FE36-D0CB-40A9-A53E-1492D6EFAC65}"
NG Playlist: Items: "{19F8E0B3-E822-4F07-B200-D4A67E4872F9}"
Playlist Tabs: "{942C36A4-4E28-4CEA-9644-F223C9A838EC}"
Status Bar: "{B9D5EA18-5827-40BE-A896-302A71BCAA9C}"
Item Details: "{77F3FA70-E39C-46F8-8E8A-6ECC64DDE234}"
Item Properties: Column Titles: "{7B9DF268-4ECC-4E10-A308-E145DA9692A5}"
Item Properties: Items: "{755FBB3D-A8D4-46F3-B0BA-005B0A10A01A}"
Filter Panel: Items: "{D93F1EF3-4AEE-4632-B5BF-0220CEC76DED}"
*/
