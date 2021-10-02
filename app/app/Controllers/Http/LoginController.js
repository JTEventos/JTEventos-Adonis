'use strict'

const Usuario = use('App/Models/Usuario')

class LoginController {
  async index({ view, session }) {
    let usuario = session.get('logado')
    return view.render('login', { login: true })
  }

  async login({ request, response, session }) {
    const inputUsuario = request.input('usuario')
    const inputSenha = request.input('senha')

    const usuario = await Usuario.
      query()
      .where('usuario', '=', inputUsuario)
      .where('senha', '=', inputSenha)
      .first()

    if (usuario) {
      console.log("Logado com sucesso!")
      session.put('nome', usuario.nome)
      session.put('logado', true)
      return response.redirect('/eventos')
    }

    session.flash({
      notificacao: "Usuário ou senha inválidos!"
    })
    return response.redirect('back')
  }

  async logout({ response, session }) {
    session.clear()
    response.redirect('/')
  }

  static logado(session, response) {
    const logado = session.get('logado')
    if (!logado) {
      return response.status(401).redirect('/401')
    }
  }
}

module.exports = LoginController
