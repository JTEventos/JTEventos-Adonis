'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Usuario extends Model {
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  static validaUsuario(session, response, usuario, desc) {
    if (usuario.id == 1) {
      session.flash({ atencao: `Não é possível ${desc} as informações do usuário Administrador.` })
      return response.redirect('/usuarios')
    }
  }

  static validaSenha(session, response) {
    session.flash({ notificacao: 'As senhas devem ser iguais.' })
    return response.redirect('back')
  }
}

module.exports = Usuario
