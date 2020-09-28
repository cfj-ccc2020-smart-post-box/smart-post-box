**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / ["api/models/users-lines.model"](../modules/_api_models_users_lines_model_.md) / UsersLinesModel

# Class: UsersLinesModel

## Hierarchy

* **UsersLinesModel**

## Index

### Constructors

* [constructor](_api_models_users_lines_model_.userslinesmodel.md#constructor)

### Properties

* [client](_api_models_users_lines_model_.userslinesmodel.md#client)

### Methods

* [closeUserFromLine](_api_models_users_lines_model_.userslinesmodel.md#closeuserfromline)
* [createNewUserFromLine](_api_models_users_lines_model_.userslinesmodel.md#createnewuserfromline)
* [getProfile](_api_models_users_lines_model_.userslinesmodel.md#getprofile)
* [getUsersList](_api_models_users_lines_model_.userslinesmodel.md#getuserslist)

## Constructors

### constructor

\+ **new UsersLinesModel**(`client?`: Client): [UsersLinesModel](_api_models_users_lines_model_.userslinesmodel.md)

*Defined in [server/api/models/users-lines.model.ts:7](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/models/users-lines.model.ts#L7)*

#### Parameters:

Name | Type |
------ | ------ |
`client?` | Client |

**Returns:** [UsersLinesModel](_api_models_users_lines_model_.userslinesmodel.md)

## Properties

### client

• `Readonly` **client**: Client

*Defined in [server/api/models/users-lines.model.ts:7](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/models/users-lines.model.ts#L7)*

## Methods

### closeUserFromLine

▸ **closeUserFromLine**(`lineId`: string): Promise\<[UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md)>

*Defined in [server/api/models/users-lines.model.ts:49](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/models/users-lines.model.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`lineId` | string |

**Returns:** Promise\<[UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md)>

___

### createNewUserFromLine

▸ **createNewUserFromLine**(`lineId`: string): Promise\<[UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md)>

*Defined in [server/api/models/users-lines.model.ts:23](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/models/users-lines.model.ts#L23)*

#### Parameters:

Name | Type |
------ | ------ |
`lineId` | string |

**Returns:** Promise\<[UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md)>

___

### getProfile

▸ **getProfile**(`lineId`: string): Promise\<line.Profile>

*Defined in [server/api/models/users-lines.model.ts:13](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/models/users-lines.model.ts#L13)*

#### Parameters:

Name | Type |
------ | ------ |
`lineId` | string |

**Returns:** Promise\<line.Profile>

___

### getUsersList

▸ **getUsersList**(): Promise\<[UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md)[]>

*Defined in [server/api/models/users-lines.model.ts:61](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/models/users-lines.model.ts#L61)*

**Returns:** Promise\<[UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md)[]>
