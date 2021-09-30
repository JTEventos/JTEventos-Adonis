'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cliente extends Model {
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  static formatFields(value) {
    if (value == null || value == undefined) {
      return value = ''
    }
  }
}

module.exports = Cliente
