**smart-post-box-express**

> [README](../README.md) / [Globals](../globals.md) / ["api/entities/users-lines.entity"](../modules/_api_entities_users_lines_entity_.md) / UsersLinesEntity

# Class: UsersLinesEntity

## Hierarchy

* BaseEntity

  ↳ **UsersLinesEntity**

## Index

### Properties

* [created](_api_entities_users_lines_entity_.userslinesentity.md#created)
* [iconUrl](_api_entities_users_lines_entity_.userslinesentity.md#iconurl)
* [id](_api_entities_users_lines_entity_.userslinesentity.md#id)
* [lineId](_api_entities_users_lines_entity_.userslinesentity.md#lineid)
* [linkCode](_api_entities_users_lines_entity_.userslinesentity.md#linkcode)
* [linked](_api_entities_users_lines_entity_.userslinesentity.md#linked)
* [name](_api_entities_users_lines_entity_.userslinesentity.md#name)
* [updated](_api_entities_users_lines_entity_.userslinesentity.md#updated)
* [userId](_api_entities_users_lines_entity_.userslinesentity.md#userid)
* [using](_api_entities_users_lines_entity_.userslinesentity.md#using)
* [target](_api_entities_users_lines_entity_.userslinesentity.md#target)

### Methods

* [hasId](_api_entities_users_lines_entity_.userslinesentity.md#hasid)
* [recover](_api_entities_users_lines_entity_.userslinesentity.md#recover)
* [reload](_api_entities_users_lines_entity_.userslinesentity.md#reload)
* [remove](_api_entities_users_lines_entity_.userslinesentity.md#remove)
* [save](_api_entities_users_lines_entity_.userslinesentity.md#save)
* [softRemove](_api_entities_users_lines_entity_.userslinesentity.md#softremove)
* [clear](_api_entities_users_lines_entity_.userslinesentity.md#clear)
* [count](_api_entities_users_lines_entity_.userslinesentity.md#count)
* [create](_api_entities_users_lines_entity_.userslinesentity.md#create)
* [createQueryBuilder](_api_entities_users_lines_entity_.userslinesentity.md#createquerybuilder)
* [delete](_api_entities_users_lines_entity_.userslinesentity.md#delete)
* [find](_api_entities_users_lines_entity_.userslinesentity.md#find)
* [findAndCount](_api_entities_users_lines_entity_.userslinesentity.md#findandcount)
* [findByIds](_api_entities_users_lines_entity_.userslinesentity.md#findbyids)
* [findOne](_api_entities_users_lines_entity_.userslinesentity.md#findone)
* [findOneOrFail](_api_entities_users_lines_entity_.userslinesentity.md#findoneorfail)
* [getId](_api_entities_users_lines_entity_.userslinesentity.md#getid)
* [getRepository](_api_entities_users_lines_entity_.userslinesentity.md#getrepository)
* [hasId](_api_entities_users_lines_entity_.userslinesentity.md#hasid)
* [insert](_api_entities_users_lines_entity_.userslinesentity.md#insert)
* [merge](_api_entities_users_lines_entity_.userslinesentity.md#merge)
* [preload](_api_entities_users_lines_entity_.userslinesentity.md#preload)
* [query](_api_entities_users_lines_entity_.userslinesentity.md#query)
* [remove](_api_entities_users_lines_entity_.userslinesentity.md#remove)
* [save](_api_entities_users_lines_entity_.userslinesentity.md#save)
* [softRemove](_api_entities_users_lines_entity_.userslinesentity.md#softremove)
* [update](_api_entities_users_lines_entity_.userslinesentity.md#update)
* [useConnection](_api_entities_users_lines_entity_.userslinesentity.md#useconnection)

## Properties

### created

• `Optional` `Readonly` **created**: Date

*Defined in [server/api/entities/users-lines.entity.ts:39](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L39)*

___

### iconUrl

•  **iconUrl**: string

*Defined in [server/api/entities/users-lines.entity.ts:24](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L24)*

___

### id

• `Readonly` **id**: number

*Defined in [server/api/entities/users-lines.entity.ts:15](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L15)*

___

### lineId

•  **lineId**: string

*Defined in [server/api/entities/users-lines.entity.ts:27](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L27)*

___

### linkCode

•  **linkCode**: string

*Defined in [server/api/entities/users-lines.entity.ts:30](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L30)*

___

### linked

•  **linked**: boolean

*Defined in [server/api/entities/users-lines.entity.ts:33](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L33)*

___

### name

•  **name**: string

*Defined in [server/api/entities/users-lines.entity.ts:21](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L21)*

___

### updated

• `Optional` `Readonly` **updated**: Date

*Defined in [server/api/entities/users-lines.entity.ts:42](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L42)*

___

### userId

•  **userId**: number

*Defined in [server/api/entities/users-lines.entity.ts:18](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L18)*

___

### using

•  **using**: boolean

*Defined in [server/api/entities/users-lines.entity.ts:36](https://github.com/waricoma/cow-stack/blob/eeb25f2/express/server/api/entities/users-lines.entity.ts#L36)*

___

### target

▪ `Static` `Readonly` **target**: Function \| string

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[target](_api_entities_users_lines_entity_.userslinesentity.md#target)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:63*

Returns object that is managed by this repository.
If this repository manages entity from schema,
then it returns a name of that schema instead.

## Methods

### hasId

▸ **hasId**(): boolean

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[hasId](_api_entities_users_lines_entity_.userslinesentity.md#hasid)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:28*

Checks if entity has an id.
If entity composite compose ids, it will check them all.

**Returns:** boolean

___

### recover

▸ **recover**(`options?`: SaveOptions): Promise\<this>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[recover](_api_entities_users_lines_entity_.userslinesentity.md#recover)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:45*

Recovers a given entity in the database.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | SaveOptions |

**Returns:** Promise\<this>

___

### reload

▸ **reload**(): Promise\<void>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[reload](_api_entities_users_lines_entity_.userslinesentity.md#reload)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:49*

Reloads entity data from the database.

**Returns:** Promise\<void>

___

### remove

▸ **remove**(`options?`: RemoveOptions): Promise\<this>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[remove](_api_entities_users_lines_entity_.userslinesentity.md#remove)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:37*

Removes current entity from the database.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | RemoveOptions |

**Returns:** Promise\<this>

___

### save

▸ **save**(`options?`: SaveOptions): Promise\<this>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[save](_api_entities_users_lines_entity_.userslinesentity.md#save)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:33*

Saves current entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | SaveOptions |

**Returns:** Promise\<this>

___

### softRemove

▸ **softRemove**(`options?`: SaveOptions): Promise\<this>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[softRemove](_api_entities_users_lines_entity_.userslinesentity.md#softremove)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:41*

Records the delete date of current entity.

#### Parameters:

Name | Type |
------ | ------ |
`options?` | SaveOptions |

**Returns:** Promise\<this>

___

### clear

▸ `Static`**clear**\<T>(`this`: ObjectType\<T>): Promise\<void>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[clear](_api_entities_users_lines_entity_.userslinesentity.md#clear)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:222*

Clears all the data from the given table/collection (truncates/drops it).

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |

**Returns:** Promise\<void>

___

### count

▸ `Static`**count**\<T>(`this`: ObjectType\<T>, `options?`: FindManyOptions\<T>): Promise\<number>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[count](_api_entities_users_lines_entity_.userslinesentity.md#count)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:155*

Counts entities that match given options.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`options?` | FindManyOptions\<T> |

**Returns:** Promise\<number>

▸ `Static`**count**\<T>(`this`: ObjectType\<T>, `conditions?`: FindConditions\<T>): Promise\<number>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[count](_api_entities_users_lines_entity_.userslinesentity.md#count)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:159*

Counts entities that match given conditions.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`conditions?` | FindConditions\<T> |

**Returns:** Promise\<number>

___

### create

▸ `Static`**create**\<T>(`this`: ObjectType\<T>): T

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[create](_api_entities_users_lines_entity_.userslinesentity.md#create)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:80*

Creates a new entity instance.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |

**Returns:** T

▸ `Static`**create**\<T>(`this`: ObjectType\<T>, `entityLikeArray`: DeepPartial\<T>[]): T[]

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[create](_api_entities_users_lines_entity_.userslinesentity.md#create)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:85*

Creates a new entities and copies all entity properties from given objects into their new entities.
Note that it copies only properties that present in entity schema.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entityLikeArray` | DeepPartial\<T>[] |

**Returns:** T[]

▸ `Static`**create**\<T>(`this`: ObjectType\<T>, `entityLike`: DeepPartial\<T>): T

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[create](_api_entities_users_lines_entity_.userslinesentity.md#create)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:90*

Creates a new entity instance and copies all entity properties from this object into a new entity.
Note that it copies only properties that present in entity schema.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entityLike` | DeepPartial\<T> |

**Returns:** T

___

### createQueryBuilder

▸ `Static`**createQueryBuilder**\<T>(`this`: ObjectType\<T>, `alias?`: string): SelectQueryBuilder\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[createQueryBuilder](_api_entities_users_lines_entity_.userslinesentity.md#createquerybuilder)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:76*

Creates a new query builder that can be used to build a sql query.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`alias?` | string |

**Returns:** SelectQueryBuilder\<T>

___

### delete

▸ `Static`**delete**\<T>(`this`: ObjectType\<T>, `criteria`: string \| string[] \| number \| number[] \| Date \| Date[] \| ObjectID \| ObjectID[] \| FindConditions\<T>, `options?`: RemoveOptions): Promise\<DeleteResult>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[delete](_api_entities_users_lines_entity_.userslinesentity.md#delete)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:151*

Deletes entities by a given criteria.
Unlike remove method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient DELETE query.
Does not check if entity exist in the database.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`criteria` | string \| string[] \| number \| number[] \| Date \| Date[] \| ObjectID \| ObjectID[] \| FindConditions\<T> |
`options?` | RemoveOptions |

**Returns:** Promise\<DeleteResult>

___

### find

▸ `Static`**find**\<T>(`this`: ObjectType\<T>, `options?`: FindManyOptions\<T>): Promise\<T[]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[find](_api_entities_users_lines_entity_.userslinesentity.md#find)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:163*

Finds entities that match given options.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`options?` | FindManyOptions\<T> |

**Returns:** Promise\<T[]>

▸ `Static`**find**\<T>(`this`: ObjectType\<T>, `conditions?`: FindConditions\<T>): Promise\<T[]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[find](_api_entities_users_lines_entity_.userslinesentity.md#find)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:167*

Finds entities that match given conditions.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`conditions?` | FindConditions\<T> |

**Returns:** Promise\<T[]>

___

### findAndCount

▸ `Static`**findAndCount**\<T>(`this`: ObjectType\<T>, `options?`: FindManyOptions\<T>): Promise\<[T[], number]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findAndCount](_api_entities_users_lines_entity_.userslinesentity.md#findandcount)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:173*

Finds entities that match given find options.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`options?` | FindManyOptions\<T> |

**Returns:** Promise\<[T[], number]>

▸ `Static`**findAndCount**\<T>(`this`: ObjectType\<T>, `conditions?`: FindConditions\<T>): Promise\<[T[], number]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findAndCount](_api_entities_users_lines_entity_.userslinesentity.md#findandcount)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:179*

Finds entities that match given conditions.
Also counts all entities that match given conditions,
but ignores pagination settings (from and take options).

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`conditions?` | FindConditions\<T> |

**Returns:** Promise\<[T[], number]>

___

### findByIds

▸ `Static`**findByIds**\<T>(`this`: ObjectType\<T>, `ids`: any[], `options?`: FindManyOptions\<T>): Promise\<T[]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findByIds](_api_entities_users_lines_entity_.userslinesentity.md#findbyids)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:184*

Finds entities by ids.
Optionally find options can be applied.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`ids` | any[] |
`options?` | FindManyOptions\<T> |

**Returns:** Promise\<T[]>

▸ `Static`**findByIds**\<T>(`this`: ObjectType\<T>, `ids`: any[], `conditions?`: FindConditions\<T>): Promise\<T[]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findByIds](_api_entities_users_lines_entity_.userslinesentity.md#findbyids)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:189*

Finds entities by ids.
Optionally conditions can be applied.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`ids` | any[] |
`conditions?` | FindConditions\<T> |

**Returns:** Promise\<T[]>

___

### findOne

▸ `Static`**findOne**\<T>(`this`: ObjectType\<T>, `id?`: string \| number \| Date \| ObjectID, `options?`: FindOneOptions\<T>): Promise\<T \| undefined>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findOne](_api_entities_users_lines_entity_.userslinesentity.md#findone)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:193*

Finds first entity that matches given options.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`id?` | string \| number \| Date \| ObjectID |
`options?` | FindOneOptions\<T> |

**Returns:** Promise\<T \| undefined>

▸ `Static`**findOne**\<T>(`this`: ObjectType\<T>, `options?`: FindOneOptions\<T>): Promise\<T \| undefined>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findOne](_api_entities_users_lines_entity_.userslinesentity.md#findone)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:197*

Finds first entity that matches given options.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`options?` | FindOneOptions\<T> |

**Returns:** Promise\<T \| undefined>

▸ `Static`**findOne**\<T>(`this`: ObjectType\<T>, `conditions?`: FindConditions\<T>, `options?`: FindOneOptions\<T>): Promise\<T \| undefined>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findOne](_api_entities_users_lines_entity_.userslinesentity.md#findone)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:201*

Finds first entity that matches given conditions.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`conditions?` | FindConditions\<T> |
`options?` | FindOneOptions\<T> |

**Returns:** Promise\<T \| undefined>

___

### findOneOrFail

▸ `Static`**findOneOrFail**\<T>(`this`: ObjectType\<T>, `id?`: string \| number \| Date \| ObjectID, `options?`: FindOneOptions\<T>): Promise\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findOneOrFail](_api_entities_users_lines_entity_.userslinesentity.md#findoneorfail)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:205*

Finds first entity that matches given options.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`id?` | string \| number \| Date \| ObjectID |
`options?` | FindOneOptions\<T> |

**Returns:** Promise\<T>

▸ `Static`**findOneOrFail**\<T>(`this`: ObjectType\<T>, `options?`: FindOneOptions\<T>): Promise\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findOneOrFail](_api_entities_users_lines_entity_.userslinesentity.md#findoneorfail)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:209*

Finds first entity that matches given options.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`options?` | FindOneOptions\<T> |

**Returns:** Promise\<T>

▸ `Static`**findOneOrFail**\<T>(`this`: ObjectType\<T>, `conditions?`: FindConditions\<T>, `options?`: FindOneOptions\<T>): Promise\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[findOneOrFail](_api_entities_users_lines_entity_.userslinesentity.md#findoneorfail)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:213*

Finds first entity that matches given conditions.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`conditions?` | FindConditions\<T> |
`options?` | FindOneOptions\<T> |

**Returns:** Promise\<T>

___

### getId

▸ `Static`**getId**\<T>(`this`: ObjectType\<T>, `entity`: T): any

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[getId](_api_entities_users_lines_entity_.userslinesentity.md#getid)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:72*

Gets entity mixed id.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entity` | T |

**Returns:** any

___

### getRepository

▸ `Static`**getRepository**\<T>(`this`: ObjectType\<T>): Repository\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[getRepository](_api_entities_users_lines_entity_.userslinesentity.md#getrepository)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:57*

Gets current entity's Repository.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |

**Returns:** Repository\<T>

___

### hasId

▸ `Static`**hasId**(`entity`: BaseEntity): boolean

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[hasId](_api_entities_users_lines_entity_.userslinesentity.md#hasid)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:68*

Checks entity has an id.
If entity composite compose ids, it will check them all.

#### Parameters:

Name | Type |
------ | ------ |
`entity` | BaseEntity |

**Returns:** boolean

___

### insert

▸ `Static`**insert**\<T>(`this`: ObjectType\<T>, `entity`: QueryDeepPartialEntity\<T> \| QueryDeepPartialEntity\<T>[], `options?`: SaveOptions): Promise\<InsertResult>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[insert](_api_entities_users_lines_entity_.userslinesentity.md#insert)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:137*

Inserts a given entity into the database.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient INSERT query.
Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entity` | QueryDeepPartialEntity\<T> \| QueryDeepPartialEntity\<T>[] |
`options?` | SaveOptions |

**Returns:** Promise\<InsertResult>

___

### merge

▸ `Static`**merge**\<T>(`this`: ObjectType\<T>, `mergeIntoEntity`: T, ...`entityLikes`: DeepPartial\<T>[]): T

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[merge](_api_entities_users_lines_entity_.userslinesentity.md#merge)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:94*

Merges multiple entities (or entity-like objects) into a given entity.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`mergeIntoEntity` | T |
`...entityLikes` | DeepPartial\<T>[] |

**Returns:** T

___

### preload

▸ `Static`**preload**\<T>(`this`: ObjectType\<T>, `entityLike`: DeepPartial\<T>): Promise\<T \| undefined>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[preload](_api_entities_users_lines_entity_.userslinesentity.md#preload)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:104*

Creates a new entity from the given plain javascript object. If entity already exist in the database, then
it loads it (and everything related to it), replaces all values with the new ones from the given object
and returns this new entity. This new entity is actually a loaded from the db entity with all properties
replaced from the new object.

Note that given entity-like object must have an entity id / primary key to find entity by.
Returns undefined if entity with given id was not found.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entityLike` | DeepPartial\<T> |

**Returns:** Promise\<T \| undefined>

___

### query

▸ `Static`**query**\<T>(`this`: ObjectType\<T>, `query`: string, `parameters?`: any[]): Promise\<any>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[query](_api_entities_users_lines_entity_.userslinesentity.md#query)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:218*

Executes a raw SQL query and returns a raw database results.
Raw query execution is supported only by relational databases (MongoDB is not supported).

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`query` | string |
`parameters?` | any[] |

**Returns:** Promise\<any>

___

### remove

▸ `Static`**remove**\<T>(`this`: ObjectType\<T>, `entities`: T[], `options?`: RemoveOptions): Promise\<T[]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[remove](_api_entities_users_lines_entity_.userslinesentity.md#remove)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:118*

Removes a given entities from the database.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entities` | T[] |
`options?` | RemoveOptions |

**Returns:** Promise\<T[]>

▸ `Static`**remove**\<T>(`this`: ObjectType\<T>, `entity`: T, `options?`: RemoveOptions): Promise\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[remove](_api_entities_users_lines_entity_.userslinesentity.md#remove)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:122*

Removes a given entity from the database.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entity` | T |
`options?` | RemoveOptions |

**Returns:** Promise\<T>

___

### save

▸ `Static`**save**\<T>(`this`: ObjectType\<T>, `entities`: T[], `options?`: SaveOptions): Promise\<T[]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[save](_api_entities_users_lines_entity_.userslinesentity.md#save)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:109*

Saves all given entities in the database.
If entities do not exist in the database then inserts, otherwise updates.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entities` | T[] |
`options?` | SaveOptions |

**Returns:** Promise\<T[]>

▸ `Static`**save**\<T>(`this`: ObjectType\<T>, `entity`: T, `options?`: SaveOptions): Promise\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[save](_api_entities_users_lines_entity_.userslinesentity.md#save)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:114*

Saves a given entity in the database.
If entity does not exist in the database then inserts, otherwise updates.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entity` | T |
`options?` | SaveOptions |

**Returns:** Promise\<T>

___

### softRemove

▸ `Static`**softRemove**\<T>(`this`: ObjectType\<T>, `entities`: T[], `options?`: SaveOptions): Promise\<T[]>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[softRemove](_api_entities_users_lines_entity_.userslinesentity.md#softremove)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:126*

Records the delete date of all given entities.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entities` | T[] |
`options?` | SaveOptions |

**Returns:** Promise\<T[]>

▸ `Static`**softRemove**\<T>(`this`: ObjectType\<T>, `entity`: T, `options?`: SaveOptions): Promise\<T>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[softRemove](_api_entities_users_lines_entity_.userslinesentity.md#softremove)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:130*

Records the delete date of a given entity.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`entity` | T |
`options?` | SaveOptions |

**Returns:** Promise\<T>

___

### update

▸ `Static`**update**\<T>(`this`: ObjectType\<T>, `criteria`: string \| string[] \| number \| number[] \| Date \| Date[] \| ObjectID \| ObjectID[] \| FindConditions\<T>, `partialEntity`: QueryDeepPartialEntity\<T>, `options?`: SaveOptions): Promise\<UpdateResult>

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[update](_api_entities_users_lines_entity_.userslinesentity.md#update)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:144*

Updates entity partially. Entity can be found by a given conditions.
Unlike save method executes a primitive operation without cascades, relations and other operations included.
Executes fast and efficient UPDATE query.
Does not check if entity exist in the database.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | BaseEntity |

#### Parameters:

Name | Type |
------ | ------ |
`this` | ObjectType\<T> |
`criteria` | string \| string[] \| number \| number[] \| Date \| Date[] \| ObjectID \| ObjectID[] \| FindConditions\<T> |
`partialEntity` | QueryDeepPartialEntity\<T> |
`options?` | SaveOptions |

**Returns:** Promise\<UpdateResult>

___

### useConnection

▸ `Static`**useConnection**(`connection`: Connection): void

*Inherited from [UsersLinesEntity](_api_entities_users_lines_entity_.userslinesentity.md).[useConnection](_api_entities_users_lines_entity_.userslinesentity.md#useconnection)*

*Defined in node_modules/typeorm/repository/BaseEntity.d.ts:53*

Sets connection to be used by entity.

#### Parameters:

Name | Type |
------ | ------ |
`connection` | Connection |

**Returns:** void
