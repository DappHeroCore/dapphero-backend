import { NamingStrategyInterface } from 'typeorm'
import { Table } from 'typeorm/schema-builder/table/Table'
import { camelCase, snakeCase, titleCase } from 'typeorm/util/StringUtils'
import { RandomGenerator } from 'typeorm/util/RandomGenerator'

/**
 * Naming strategy that is used by default.
 */
export default class DefaultNamingStrategy implements NamingStrategyInterface {
  /**
   * Normalizes table name.
   *
   * @param targetName Name of the target entity that can be used to generate a table name.
   * @param userSpecifiedName For example if user specified a table name in a decorator, e.g. @Entity("name")
   */
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName || snakeCase(targetName)
  }

  /**
   * Creates a table name for a junction table of a closure table.
   *
   * @param originalClosureTableName Name of the closure table which owns this junction table.
   */
  closureJunctionTableName(originalClosureTableName: string): string {
    return originalClosureTableName + '_closure'
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[]
  ): string {
    // todo: simplify
    if (embeddedPrefixes.length) {
      return (
        camelCase(embeddedPrefixes.join('_')) +
        (customName ? titleCase(customName) : titleCase(propertyName))
      )
    }

    return customName || propertyName
  }

  relationName(propertyName: string): string {
    return propertyName
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = `${replacedTableName}_${clonedColumnNames.join('_')}`
    return 'PK_' + RandomGenerator.sha1(key).substr(0, 27)
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[]
  ): string {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = `${replacedTableName}_${clonedColumnNames.join('_')}`
    return 'UQ_' + RandomGenerator.sha1(key).substr(0, 27)
  }

  relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string
  ): string {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    let key = `${replacedTableName}_${clonedColumnNames.join('_')}`
    if (where) {
      key += `_${where}`
    }

    return 'REL_' + RandomGenerator.sha1(key).substr(0, 26)
  }

  defaultConstraintName(
    tableOrName: Table | string,
    columnName: string
  ): string {
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = `${replacedTableName}_${columnName}`
    return 'DF_' + RandomGenerator.sha1(key).substr(0, 27)
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[]
  ): string {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = `${replacedTableName}_${clonedColumnNames.join('_')}`
    return 'FK_' + RandomGenerator.sha1(key).substr(0, 27)
  }

  indexName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string
  ): string {
    // sort incoming column names to avoid issue when ["id", "name"] and ["name", "id"] arrays
    const clonedColumnNames = [...columnNames]
    clonedColumnNames.sort()
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    let key = `${replacedTableName}_${clonedColumnNames.join('_')}`
    if (where) {
      key += `_${where}`
    }

    return 'IDX_' + RandomGenerator.sha1(key).substr(0, 26)
  }

  checkConstraintName(tableOrName: Table | string, expression: string): string {
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = `${replacedTableName}_${expression}`
    return 'CHK_' + RandomGenerator.sha1(key).substr(0, 26)
  }

  exclusionConstraintName(
    tableOrName: Table | string,
    expression: string
  ): string {
    const tableName =
      tableOrName instanceof Table ? tableOrName.name : tableOrName
    const replacedTableName = tableName.replace('.', '_')
    const key = `${replacedTableName}_${expression}`
    return 'XCL_' + RandomGenerator.sha1(key).substr(0, 26)
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return camelCase(relationName + '_' + referencedColumnName)
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string
  ): string {
    return snakeCase(
      firstTableName +
        '_' +
        firstPropertyName.replace(/\./gi, '_') +
        '_' +
        secondTableName
    )
  }

  joinTableColumnDuplicationPrefix(columnName: string, index: number): string {
    return columnName + '_' + index
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string
  ): string {
    return camelCase(tableName + '_' + (columnName || propertyName))
  }

  joinTableInverseColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string
  ): string {
    return this.joinTableColumnName(tableName, propertyName, columnName)
  }

  /**
   * Adds globally set prefix to the table name.
   * This method is executed no matter if prefix was set or not.
   * Table name is either user's given table name, either name generated from entity target.
   * Note that table name comes here already normalized by #tableName method.
   */
  prefixTableName(prefix: string, tableName: string): string {
    return prefix + tableName
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return alias + '_' + propertyPath.replace('.', '_')
  }
}
