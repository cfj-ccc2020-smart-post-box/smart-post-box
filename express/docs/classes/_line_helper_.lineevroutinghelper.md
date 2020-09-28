**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / ["line/helper"](../modules/_line_helper_.md) / LineEvRoutingHelper

# Class: LineEvRoutingHelper

## Hierarchy

* **LineEvRoutingHelper**

## Index

### Properties

* [msgTasks](_line_helper_.lineevroutinghelper.md#msgtasks)

### Methods

* [hears](_line_helper_.lineevroutinghelper.md#hears)
* [msgEv](_line_helper_.lineevroutinghelper.md#msgev)
* [msgEvHandler](_line_helper_.lineevroutinghelper.md#msgevhandler)

## Properties

### msgTasks

• `Private` **msgTasks**: [MsgTask](../modules/_line_interface_.md#msgtask)[] = []

*Defined in [server/line/helper.ts:21](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/helper.ts#L21)*

## Methods

### hears

▸ **hears**(`event`: line.WebhookEvent): Promise\<void>

*Defined in [server/line/helper.ts:15](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/helper.ts#L15)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | line.WebhookEvent |

**Returns:** Promise\<void>

___

### msgEv

▸ **msgEv**(`msgTask`: [MsgTask](../modules/_line_interface_.md#msgtask)): void

*Defined in [server/line/helper.ts:23](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/helper.ts#L23)*

#### Parameters:

Name | Type |
------ | ------ |
`msgTask` | [MsgTask](../modules/_line_interface_.md#msgtask) |

**Returns:** void

___

### msgEvHandler

▸ `Private`**msgEvHandler**(`event`: any): Promise\<void>

*Defined in [server/line/helper.ts:27](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/helper.ts#L27)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | any |

**Returns:** Promise\<void>
