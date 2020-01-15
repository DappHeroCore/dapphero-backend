
const __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (let a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j]
  }
  return r
}
exports.__esModule = true
const Table_1 = require('typeorm/schema-builder/table/Table')
const StringUtils_1 = require('typeorm/util/StringUtils')
const RandomGenerator_1 = require('typeorm/util/RandomGenerator')
/**
 * Naming strategy that is used by default.
 */
const DefaultNamingStrategy = /** @class */ (function () {
  function DefaultNamingStrategy() {
  }
  /**
       * Normalizes table name.
       *
       * @param targetName Name of the target entity that can be used to generate a table name.
       * @param userSpecifiedName For example if user specified a table name in a decorator, e.g. @Entity("name")
       */
  DefaultNamingStrategy.prototype.tableName = function (targetName, userSpecifiedName) {
    return userSpecifiedName || StringUtils_1.snakeCase(targetName)
  }
  /**
       * Creates a table name for a junction table of a closure table.
       *
       * @param originalClosureTableName Name of the closure table which owns this junction table.
       */
  DefaultNamingStrategy.prototype.closureJunctionTableName = function (originalClosureTableName) {
    return originalClosureTableName + '_closure'
  }
  DefaultNamingStrategy.prototype.columnName = function (propertyName, customName, embeddedPrefixes) {
    if (embeddedPrefixes.length) {
      return StringUtils_1.snakeCase(embeddedPrefixes.join('_')) + (customName ? StringUtils_1.snakeCase(customName) : StringUtils_1.snakeCase(propertyName))
    }
    return customName || propertyName
  }
  DefaultNamingStrategy.prototype.relationName = function (propertyName) {
    return propertyName
  }
  DefaultNamingStrategy.prototype.primaryKeyName = function (tableOrName, columnNames) {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = __spreadArrays(columnNames)
    clonedColumnNames.sort()
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = replacedTableName + '_' + clonedColumnNames.join('_')
    return 'PK_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 27)
  }
  DefaultNamingStrategy.prototype.uniqueConstraintName = function (tableOrName, columnNames) {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = __spreadArrays(columnNames)
    clonedColumnNames.sort()
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = replacedTableName + '_' + clonedColumnNames.join('_')
    return 'UQ_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 27)
  }
  DefaultNamingStrategy.prototype.relationConstraintName = function (tableOrName, columnNames, where) {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = __spreadArrays(columnNames)
    clonedColumnNames.sort()
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    let key = replacedTableName + '_' + clonedColumnNames.join('_')
    if (where) {
      key += '_' + where
    }
    return 'REL_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 26)
  }
  DefaultNamingStrategy.prototype.defaultConstraintName = function (tableOrName, columnName) {
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = replacedTableName + '_' + columnName
    return 'DF_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 27)
  }
  DefaultNamingStrategy.prototype.foreignKeyName = function (tableOrName, columnNames, _referencedTablePath, _referencedColumnNames) {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = __spreadArrays(columnNames)
    clonedColumnNames.sort()
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = replacedTableName + '_' + clonedColumnNames.join('_')
    return 'FK_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 27)
  }
  DefaultNamingStrategy.prototype.indexName = function (tableOrName, columnNames, where) {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = __spreadArrays(columnNames)
    clonedColumnNames.sort()
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    let key = replacedTableName + '_' + clonedColumnNames.join('_')
    if (where) {
      key += '_' + where
    }
    return 'IDX_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 26)
  }
  DefaultNamingStrategy.prototype.checkConstraintName = function (tableOrName, expression) {
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = replacedTableName + '_' + expression
    return 'CHK_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 26)
  }
  DefaultNamingStrategy.prototype.exclusionConstraintName = function (tableOrName, expression) {
    const tableName = tableOrName instanceof Table_1.Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = replacedTableName + '_' + expression
    return 'XCL_' + RandomGenerator_1.RandomGenerator.sha1(key).substr(0, 26)
  }
  DefaultNamingStrategy.prototype.joinColumnName = function (relationName, referencedColumnName) {
    return StringUtils_1.snakeCase(relationName + '_' + referencedColumnName)
  }
  DefaultNamingStrategy.prototype.joinTableName = function (firstTableName, secondTableName, firstPropertyName, secondPropertyName) {
    return StringUtils_1.snakeCase(firstTableName + '_' + firstPropertyName.replace(/\./gi, '_') + '_' + secondTableName)
  }
  DefaultNamingStrategy.prototype.joinTableColumnDuplicationPrefix = function (columnName, index) {
    return columnName + '_' + index
  }
  DefaultNamingStrategy.prototype.joinTableColumnName = function (tableName, propertyName, columnName) {
    return StringUtils_1.snakeCase(tableName + '_' + (columnName || propertyName))
  }
  DefaultNamingStrategy.prototype.joinTableInverseColumnName = function (tableName, propertyName, columnName) {
    return this.joinTableColumnName(tableName, propertyName, columnName)
  }
  /**
       * Adds globally set prefix to the table name.
       * This method is executed no matter if prefix was set or not.
       * Table name is either user's given table name, either name generated from entity target.
       * Note that table name comes here already normalized by #tableName method.
       */
  DefaultNamingStrategy.prototype.prefixTableName = function (prefix, tableName) {
    return prefix + tableName
  }
  DefaultNamingStrategy.prototype.eagerJoinRelationAlias = function (alias, propertyPath) {
    return alias + '_' + propertyPath.replace('.', '_')
  }
  return DefaultNamingStrategy
})()
exports.default = DefaultNamingStrategy
