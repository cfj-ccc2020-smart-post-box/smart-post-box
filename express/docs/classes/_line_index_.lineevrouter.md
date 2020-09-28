**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / ["line/index"](../modules/_line_index_.md) / LineEvRouter

# Class: LineEvRouter

## Hierarchy

* **LineEvRouter**

## Index

### Constructors

* [constructor](_line_index_.lineevrouter.md#constructor)

### Methods

* [hears](_line_index_.lineevrouter.md#hears)

## Constructors

### constructor

\+ **new LineEvRouter**(`config`: ClientConfig): [LineEvRouter](_line_index_.lineevrouter.md)

*Defined in [server/line/index.ts:9](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/index.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`config` | ClientConfig |

**Returns:** [LineEvRouter](_line_index_.lineevrouter.md)

## Methods

### hears

▸ **hears**(`event`: line.WebhookEvent): Promise\<void>

*Defined in [server/line/index.ts:59](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/line/index.ts#L59)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | line.WebhookEvent |

**Returns:** Promise\<void>
