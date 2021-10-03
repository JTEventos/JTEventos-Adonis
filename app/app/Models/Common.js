'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Common extends Model {
  static validaSucesso(params, session, desc) {
    if (params.id) {
      session.flash({ notificacao: `${desc} alterado com sucesso!` })
    } else {
      session.flash({ notificacao: `${desc} cadastrado com sucesso!` })
    }
  }

  static validaCamposObrigatorios(session, response) {
    session.flash({ notificacao: 'Preencha todos os campos obrigatórios antes de salvar o registro.' })
    return response.redirect('back')
  }

  static registroDuplicado(session, response, desc) {
    session.flash({ notificacao: `Este ${desc} já foi utilizado em outro registro. Por favor, refaça a operação.` })
    return response.redirect('back')
  }

  static formatFields(value) {
    if (value == null || value == undefined) {
      return value = ''
    }
  }

  static registroInvalido(session, response, desc, route) {
    session.flash({ atencao: `${desc} não localizado. Por favor, selecione um registro válido.` })
    return response.redirect(`${route}`)
  }
}

module.exports = Common
