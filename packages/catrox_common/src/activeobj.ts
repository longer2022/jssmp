interface FileSystemObject {
  Drives: string;
  Name: string;
  Path: string;
  Size: number;
  Type: string;
  BuildPath: (path: string, name: string) => string;
  CopyFile: () => any;
  CopyFolder: () => any;
  CreateFolder: () => any;
  CreateTextFile: () => any;
  DeleteFile: () => any;
  DeleteFolder: () => any;
  DriveExists: () => boolean;
  FileExists: () => boolean;
  FolderExists: () => boolean;
  GetAbsolutePathName: () => string;
  GetBaseName: () => string;
  GetDrive: () => string;
  GetExtensionName: () => string;
  GetFile: () => object;
  GetFileName: () => string;
  GetFolder: () => string;
}

class ActiveObjMgr {
  _fso: ActiveXObject;
  get fso() {
    return (this._fso || (this._fso = new ActiveXObject("Scripting.FileSystemObject"))) as FileSystemObject;
  }
}

export const activeObjects = new ActiveObjMgr();
