**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / ["common/server"](../modules/_common_server_.md) / ExpressServer

# Class: ExpressServer

## Hierarchy

* **ExpressServer**

## Index

### Constructors

* [constructor](_common_server_.expressserver.md#constructor)

### Properties

* [app](_common_server_.expressserver.md#app)
* [bodyParserMiddleware](_common_server_.expressserver.md#bodyparsermiddleware)
* [bodyParserText](_common_server_.expressserver.md#bodyparsertext)
* [bodyParserUrlEncoded](_common_server_.expressserver.md#bodyparserurlencoded)
* [dbConnection](_common_server_.expressserver.md#dbconnection)

### Methods

* [bodyParserOrLineSignatureParser](_common_server_.expressserver.md#bodyparserorlinesignatureparser)
* [closeDbConnection](_common_server_.expressserver.md#closedbconnection)
* [connectToDB](_common_server_.expressserver.md#connecttodb)
* [handleLineEv](_common_server_.expressserver.md#handlelineev)
* [listen](_common_server_.expressserver.md#listen)
* [setBodyParserOrLineSignatureParser](_common_server_.expressserver.md#setbodyparserorlinesignatureparser)
* [setErrPage](_common_server_.expressserver.md#seterrpage)
* [setNotFoundPage](_common_server_.expressserver.md#setnotfoundpage)
* [setRedirectToHTTPS](_common_server_.expressserver.md#setredirecttohttps)
* [setSlackBolt](_common_server_.expressserver.md#setslackbolt)
* [setSwaggerUI](_common_server_.expressserver.md#setswaggerui)

## Constructors

### constructor

\+ **new ExpressServer**(): [ExpressServer](_common_server_.expressserver.md)

*Defined in [server/common/server.ts:19](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L19)*

**Returns:** [ExpressServer](_common_server_.expressserver.md)

## Properties

### app

• `Private` **app**: Express = express()

*Defined in [server/common/server.ts:18](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L18)*

___

### bodyParserMiddleware

• `Private` **bodyParserMiddleware**: NextHandleFunction = bodyParser.json({ limit: process.env.REQUEST\_LIMIT \|\| '100kb', })

*Defined in [server/common/server.ts:88](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L88)*

___

### bodyParserText

• `Private` **bodyParserText**: NextHandleFunction = bodyParser.text({ limit: process.env.REQUEST\_LIMIT \|\| '100kb', })

*Defined in [server/common/server.ts:97](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L97)*

___

### bodyParserUrlEncoded

• `Private` **bodyParserUrlEncoded**: NextHandleFunction = bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST\_LIMIT \|\| '100kb', })

*Defined in [server/common/server.ts:92](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L92)*

___

### dbConnection

• `Private` **dbConnection**: Connection

*Defined in [server/common/server.ts:19](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L19)*

## Methods

### bodyParserOrLineSignatureParser

▸ `Private`**bodyParserOrLineSignatureParser**(`lineSignatureMiddleware?`: any): function

*Defined in [server/common/server.ts:75](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L75)*

#### Parameters:

Name | Type |
------ | ------ |
`lineSignatureMiddleware?` | any |

**Returns:** function

___

### closeDbConnection

▸ **closeDbConnection**(): Promise\<void>

*Defined in [server/common/server.ts:67](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L67)*

**Returns:** Promise\<void>

___

### connectToDB

▸ **connectToDB**(): Promise\<void>

*Defined in [server/common/server.ts:55](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L55)*

**Returns:** Promise\<void>

___

### handleLineEv

▸ **handleLineEv**(`webHookPath`: string, `config`: ClientConfig): Promise\<void>

*Defined in [server/common/server.ts:101](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L101)*

#### Parameters:

Name | Type |
------ | ------ |
`webHookPath` | string |
`config` | ClientConfig |

**Returns:** Promise\<void>

___

### listen

▸ **listen**(`port`: number): Promise\<void>

*Defined in [server/common/server.ts:196](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L196)*

#### Parameters:

Name | Type |
------ | ------ |
`port` | number |

**Returns:** Promise\<void>

___

### setBodyParserOrLineSignatureParser

▸ **setBodyParserOrLineSignatureParser**(`config?`: MiddlewareConfig): Promise\<void>

*Defined in [server/common/server.ts:71](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L71)*

#### Parameters:

Name | Type |
------ | ------ |
`config?` | MiddlewareConfig |

**Returns:** Promise\<void>

___

### setErrPage

▸ **setErrPage**(): Promise\<void>

*Defined in [server/common/server.ts:156](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L156)*

**Returns:** Promise\<void>

___

### setNotFoundPage

▸ **setNotFoundPage**(): Promise\<void>

*Defined in [server/common/server.ts:138](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L138)*

**Returns:** Promise\<void>

___

### setRedirectToHTTPS

▸ **setRedirectToHTTPS**(): void

*Defined in [server/common/server.ts:186](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L186)*

This system was developed for hosting on dokku.
Dokku has SSL support. It will automatically redirect to https from http.
But, I temporary written this code.

**Returns:** void

___

### setSlackBolt

▸ **setSlackBolt**(`webHookPath`: string, `botToken`: string, `receiverOpts`: { endpoints: { commands: string ; events: string ; interactive: string  } ; signingSecret: string  }): Promise\<void>

*Defined in [server/common/server.ts:112](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L112)*

#### Parameters:

Name | Type |
------ | ------ |
`webHookPath` | string |
`botToken` | string |
`receiverOpts` | { endpoints: { commands: string ; events: string ; interactive: string  } ; signingSecret: string  } |

**Returns:** Promise\<void>

___

### setSwaggerUI

▸ **setSwaggerUI**(): void

*Defined in [server/common/server.ts:51](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/common/server.ts#L51)*

**Returns:** void
