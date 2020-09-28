**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / "api/middlewares/authentication"

# Module: "api/middlewares/authentication"

## Index

### Classes

* [User](../classes/_api_middlewares_authentication_.user.md)

### Functions

* [expressAuthentication](_api_middlewares_authentication_.md#expressauthentication)

## Functions

### expressAuthentication

▸ `Const`**expressAuthentication**(`req`: express.Request, `securityName`: string, `scopes?`: string[]): Promise\<[User](../classes/_api_middlewares_authentication_.user.md)>

*Defined in [server/api/middlewares/authentication.ts:9](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/middlewares/authentication.ts#L9)*

#### Parameters:

Name | Type |
------ | ------ |
`req` | express.Request |
`securityName` | string |
`scopes?` | string[] |

**Returns:** Promise\<[User](../classes/_api_middlewares_authentication_.user.md)>
