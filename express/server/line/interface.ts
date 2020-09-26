export type MsgTask = {
  task: Task;
  source?: Source;
  type?: MsgTypeText | MsgTypeImage | MsgTypeVideo | MsgTypeAudio | MsgTypeFile | MsgTypeLocation | MsgTypeSticker;
};

export type Task = (event) => void;

export type Source = {
  type?: 'user' | 'group' | 'room';
  userId?: string;
  groupId?: string;
  roomId?: string;
};

export type ContentProvider = 'line' | 'external';

export type MinMax = {
  min?: number;
  max?: number;
};

export type Media = {
  contentProvider?: ContentProvider;
  duration?: MinMax;
};

export class MsgTypeText {
  constructor(text?: RegExp) {
    this.text = text;
  }
  public text?: RegExp;
}

export type StickerResourceType =
  | 'STATIC'
  | 'ANIMATION'
  | 'SOUND'
  | 'ANIMATION_SOUND'
  | 'POPUP'
  | 'POPUP_SOUND'
  | 'NAME_TEXT'
  | 'PER_STICKER_TEXT';

export class MsgTypeImage {
  constructor(contentProvider?: ContentProvider) {
    this.contentProvider = contentProvider;
  }
  public contentProvider?: ContentProvider;
}

export class MsgTypeVideo {
  constructor(media?: Media) {
    this.media = media;
  }
  public media: Media;
}

export class MsgTypeAudio {
  constructor(media?: Media) {
    this.media = media;
  }
  public media: Media;
}

export class MsgTypeFile {
  constructor(fileName?: RegExp, fileSize?: MinMax) {
    this.fileName = fileName;
    this.fileSize = fileSize;
  }
  public fileName?: RegExp;
  public fileSize?: MinMax;
}

export class MsgTypeLocation {
  constructor(title?: RegExp, address?: RegExp, latitude?: MinMax, longitude?: MinMax) {
    this.title = title;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
  public title?: RegExp;
  public address?: RegExp;
  public latitude?: MinMax;
  public longitude?: MinMax;
}

export class MsgTypeSticker {
  constructor(packageId?: RegExp, stickerId?: RegExp, stickerResourceType?: StickerResourceType) {
    this.packageId = packageId;
    this.stickerId = stickerId;
    this.stickerResourceType = stickerResourceType;
  }
  public packageId?: RegExp;
  public stickerId?: RegExp;
  public stickerResourceType?: StickerResourceType;
}
