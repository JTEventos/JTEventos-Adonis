'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evento extends Model {
    static get createdAtColumn() {
      return null
    }

    static get updatedAtColumn() {
      return null
    }

    static get dates () {
        return super.dates.concat(['data_inicio', 'data_fim'])
      }

    static formatDates (field, value) {
        if (field === 'data_inicio' || field === 'data_fim' ) {
            return value.format('DD-MM-YYYY HH:mm:ss')
        }
        return super.formatDates(field, value)
    }

    cliente() {
        return this.hasOne('App/Models/Cliente')
    }

}

module.exports = Evento
