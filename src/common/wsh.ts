/**
 * Not a complete interface of `FileSystemObject`
 * @see
 */
interface FileSystemObject {
	BuildPath: (path: string, name: string) => string;
	CopyFile: (src: string, dst: string, overwrite?: boolean) => boolean;
	CopyFolder: (src: string, dst: string, overwrite?: boolean) => boolean;
	CreateFolder: (foldername: string) => void;
	CreateTextFile: (filename: string, overwrite?: boolean, unicode?: boolean) => void;
	DeleteFile: (filespec: string, force?: boolean) => void;
	DeleteFolder: (folderspec: string, force?: boolean) => void;
	DriveExists: () => boolean;
	FileExists: (filespec: string) => boolean;
	FolderExists: (folderspec: string) => boolean;
	GetAbsolutePathName: (pathspec: string) => string;
	GetBaseName: (path: string) => string;
	GetDrive: () => string;
	GetExtensionName: (path: string) => string;
	GetFile: () => File;
	GetFileName: () => string;
	GetFolder: () => string;
	GetSpecialFolder(): string;
	MoveFile(): void;
	MoveFolder(): void;
	OpenTextFile(): void;
	GetParentFolderName(): string;
	GetTempName(): string;
	GetDriveName(): string;
}

interface File { }

export const fso: FileSystemObject = new ActiveXObject("Scripting.FileSystemObject");
