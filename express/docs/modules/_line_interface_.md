**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / "line/interface"

# Module: "line/interface"

## Index

### Classes

* [MsgTypeAudio](../classes/_line_interface_.msgtypeaudio.md)
* [MsgTypeFile](../classes/_line_interface_.msgtypefile.md)
* [MsgTypeImage](../classes/_line_interface_.msgtypeimage.md)
* [MsgTypeLocation](../classes/_line_interface_.msgtypelocation.md)
* [MsgTypeSticker](../classes/_line_interface_.msgtypesticker.md)
* [MsgTypeText](../classes/_line_interface_.msgtypetext.md)
* [MsgTypeVideo](../classes/_line_interface_.msgtypevideo.md)

### Type aliases

* [ContentProvider](_line_interface_.md#contentprovider)
* [Media](_line_interface_.md#media)
* [MinMax](_line_interface_.md#minmax)
* [MsgTask](_line_interface_.md#msgtask)
* [Source](_line_interface_.md#source)
* [StickerResourceType](_line_interface_.md#stickerresourcetype)
* [Task](_line_interface_.md#task)

## Type aliases

### ContentProvider

Ƭ  **ContentProvider**: \"line\" \| \"external\"

*Defined in [server/line/interface.ts:16](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/interface.ts#L16)*

___

### Media

Ƭ  **Media**: { contentProvider?: [ContentProvider](_line_interface_.md#contentprovider) ; duration?: [MinMax](_line_interface_.md#minmax)  }

*Defined in [server/line/interface.ts:23](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/interface.ts#L23)*

#### Type declaration:

Name | Type |
------ | ------ |
`contentProvider?` | [ContentProvider](_line_interface_.md#contentprovider) |
`duration?` | [MinMax](_line_interface_.md#minmax) |

___

### MinMax

Ƭ  **MinMax**: { max?: number ; min?: number  }

*Defined in [server/line/interface.ts:18](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/interface.ts#L18)*

#### Type declaration:

Name | Type |
------ | ------ |
`max?` | number |
`min?` | number |

___

### MsgTask

Ƭ  **MsgTask**: { source?: [Source](_line_interface_.md#source) ; task: [Task](_line_interface_.md#task) ; type?: [MsgTypeText](../classes/_line_interface_.msgtypetext.md) \| [MsgTypeImage](../classes/_line_interface_.msgtypeimage.md) \| [MsgTypeVideo](../classes/_line_interface_.msgtypevideo.md) \| [MsgTypeAudio](../classes/_line_interface_.msgtypeaudio.md) \| [MsgTypeFile](../classes/_line_interface_.msgtypefile.md) \| [MsgTypeLocation](../classes/_line_interface_.msgtypelocation.md) \| [MsgTypeSticker](../classes/_line_interface_.msgtypesticker.md)  }

*Defined in [server/line/interface.ts:1](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/interface.ts#L1)*

#### Type declaration:

Name | Type |
------ | ------ |
`source?` | [Source](_line_interface_.md#source) |
`task` | [Task](_line_interface_.md#task) |
`type?` | [MsgTypeText](../classes/_line_interface_.msgtypetext.md) \| [MsgTypeImage](../classes/_line_interface_.msgtypeimage.md) \| [MsgTypeVideo](../classes/_line_interface_.msgtypevideo.md) \| [MsgTypeAudio](../classes/_line_interface_.msgtypeaudio.md) \| [MsgTypeFile](../classes/_line_interface_.msgtypefile.md) \| [MsgTypeLocation](../classes/_line_interface_.msgtypelocation.md) \| [MsgTypeSticker](../classes/_line_interface_.msgtypesticker.md) |

___

### Source

Ƭ  **Source**: { groupId?: string ; roomId?: string ; type?: \"user\" \| \"group\" \| \"room\" ; userId?: string  }

*Defined in [server/line/interface.ts:9](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/interface.ts#L9)*

#### Type declaration:

Name | Type |
------ | ------ |
`groupId?` | string |
`roomId?` | string |
`type?` | \"user\" \| \"group\" \| \"room\" |
`userId?` | string |

___

### StickerResourceType

Ƭ  **StickerResourceType**: \"STATIC\" \| \"ANIMATION\" \| \"SOUND\" \| \"ANIMATION\_SOUND\" \| \"POPUP\" \| \"POPUP\_SOUND\" \| \"NAME\_TEXT\" \| \"PER\_STICKER\_TEXT\"

*Defined in [server/line/interface.ts:35](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/interface.ts#L35)*

___

### Task

Ƭ  **Task**: (event: any) => void

*Defined in [server/line/interface.ts:7](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/interface.ts#L7)*
