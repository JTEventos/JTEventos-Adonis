'use strict'

const LoginController = use('App/Controllers/Http/LoginController')
const Usuario = use('App/Models/Usuario')

class UsuarioController {
  async listar({ view, session, response }) {
    LoginController.logado(session, response)

    const usuarios = await Usuario.all();

    return view.render('usuarios/listar', { usuarios: usuarios.toJSON() })
  }

  async cadastrar({ view }) {
    return view.render('usuarios/cadastrar')
  }

  async salvar({ params, request, response, session }) {
    let usuario = new Usuario()

    if (params.id) {
      usuario = await Usuario.find(params.id)
    }

    usuario.nome = request.input('nome')
    usuario.usuario = request.input('usuario')
    usuario.senha = request.input('senha')

    if (request.input('senha') != request.input('cnf_senha')) {
      session.flash({ notificacao: 'As senhas devem ser iguais.' })
      return response.redirect('/usuarios/cadastrar')
    } else {
      await usuario.save()

      if (params.id) {
        session.flash({ notificacao: 'Usuário alterado com sucesso!' })
      } else {
        session.flash({ notificacao: 'Usuário cadastrado com sucesso!' })
      }

      return response.redirect('/usuarios')
    }
  }

  async alterar({ params, view }) {
    const usuario = await Usuario.find(params.id)

    return view.render('usuarios/alterar', { usuario: usuario.toJSON() })
  }

  async detalhar({ params, view }) {
    const usuario = await Usuario.find(params.id)

    return view.render('usuarios/detalhar', { usuario: usuario.toJSON() })
  }
}

module.exports = UsuarioController
