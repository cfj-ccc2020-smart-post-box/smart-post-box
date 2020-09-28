**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / ["api/services/users-lines.service"](../modules/_api_services_users_lines_service_.md) / UsersLinesService

# Class: UsersLinesService

## Hierarchy

* **UsersLinesService**

## Index

### Constructors

* [constructor](_api_services_users_lines_service_.userslinesservice.md#constructor)

### Properties

* [usersLinesModel](_api_services_users_lines_service_.userslinesservice.md#userslinesmodel)

### Methods

* [getUsersList](_api_services_users_lines_service_.userslinesservice.md#getuserslist)
* [replyMsgWhenClosingUser](_api_services_users_lines_service_.userslinesservice.md#replymsgwhenclosinguser)
* [replyMsgWhenSingUpUser](_api_services_users_lines_service_.userslinesservice.md#replymsgwhensingupuser)

## Constructors

### constructor

\+ **new UsersLinesService**(`usersLinesModel`: [UsersLinesModel](_api_models_users_lines_model_.userslinesmodel.md)): [UsersLinesService](_api_services_users_lines_service_.userslinesservice.md)

*Defined in [server/api/services/users-lines.service.ts:6](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/services/users-lines.service.ts#L6)*

#### Parameters:

Name | Type |
------ | ------ |
`usersLinesModel` | [UsersLinesModel](_api_models_users_lines_model_.userslinesmodel.md) |

**Returns:** [UsersLinesService](_api_services_users_lines_service_.userslinesservice.md)

## Properties

### usersLinesModel

• `Readonly` **usersLinesModel**: [UsersLinesModel](_api_models_users_lines_model_.userslinesmodel.md)

*Defined in [server/api/services/users-lines.service.ts:6](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/services/users-lines.service.ts#L6)*

## Methods

### getUsersList

▸ **getUsersList**(): Promise\<{ iconUrl: string ; name: string  }[]>

*Defined in [server/api/services/users-lines.service.ts:51](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/services/users-lines.service.ts#L51)*

**Returns:** Promise\<{ iconUrl: string ; name: string  }[]>

___

### replyMsgWhenClosingUser

▸ **replyMsgWhenClosingUser**(`event`: { source: { userId: string  }  }): Promise\<string>

*Defined in [server/api/services/users-lines.service.ts:29](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/services/users-lines.service.ts#L29)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | { source: { userId: string  }  } |

**Returns:** Promise\<string>

___

### replyMsgWhenSingUpUser

▸ **replyMsgWhenSingUpUser**(`event`: { source: { userId: string  }  }): Promise\<string>

*Defined in [server/api/services/users-lines.service.ts:12](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/services/users-lines.service.ts#L12)*

#### Parameters:

Name | Type |
------ | ------ |
`event` | { source: { userId: string  }  } |

**Returns:** Promise\<string>
