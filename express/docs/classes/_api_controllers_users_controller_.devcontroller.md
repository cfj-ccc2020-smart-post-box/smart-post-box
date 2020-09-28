**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / ["api/controllers/users/controller"](../modules/_api_controllers_users_controller_.md) / DevController

# Class: DevController

## Hierarchy

* Controller

  ↳ **DevController**

## Index

### Methods

* [getHeader](_api_controllers_users_controller_.devcontroller.md#getheader)
* [getHeaders](_api_controllers_users_controller_.devcontroller.md#getheaders)
* [getStatus](_api_controllers_users_controller_.devcontroller.md#getstatus)
* [getUsersList](_api_controllers_users_controller_.devcontroller.md#getuserslist)
* [setHeader](_api_controllers_users_controller_.devcontroller.md#setheader)
* [setStatus](_api_controllers_users_controller_.devcontroller.md#setstatus)

## Methods

### getHeader

▸ **getHeader**(`name`: string): string \| undefined

*Inherited from [DevController](_api_controllers_users_controller_.devcontroller.md).[getHeader](_api_controllers_users_controller_.devcontroller.md#getheader)*

*Defined in node_modules/tsoa/dist/interfaces/controller.d.ts:7*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |

**Returns:** string \| undefined

___

### getHeaders

▸ **getHeaders**(): object

*Inherited from [DevController](_api_controllers_users_controller_.devcontroller.md).[getHeaders](_api_controllers_users_controller_.devcontroller.md#getheaders)*

*Defined in node_modules/tsoa/dist/interfaces/controller.d.ts:8*

**Returns:** object

___

### getStatus

▸ **getStatus**(): number \| undefined

*Inherited from [DevController](_api_controllers_users_controller_.devcontroller.md).[getStatus](_api_controllers_users_controller_.devcontroller.md#getstatus)*

*Defined in node_modules/tsoa/dist/interfaces/controller.d.ts:5*

**Returns:** number \| undefined

___

### getUsersList

▸ **getUsersList**(): Promise\<{ iconUrl: string ; name: string  }[]>

*Defined in [server/api/controllers/users/controller.ts:11](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/controllers/users/controller.ts#L11)*

**Returns:** Promise\<{ iconUrl: string ; name: string  }[]>

___

### setHeader

▸ **setHeader**(`name`: string, `value?`: string): void

*Inherited from [DevController](_api_controllers_users_controller_.devcontroller.md).[setHeader](_api_controllers_users_controller_.devcontroller.md#setheader)*

*Defined in node_modules/tsoa/dist/interfaces/controller.d.ts:6*

#### Parameters:

Name | Type |
------ | ------ |
`name` | string |
`value?` | string |

**Returns:** void

___

### setStatus

▸ **setStatus**(`statusCode`: number): void

*Inherited from [DevController](_api_controllers_users_controller_.devcontroller.md).[setStatus](_api_controllers_users_controller_.devcontroller.md#setstatus)*

*Defined in node_modules/tsoa/dist/interfaces/controller.d.ts:4*

#### Parameters:

Name | Type |
------ | ------ |
`statusCode` | number |

**Returns:** void
