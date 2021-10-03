'use strict'

const { validaSucesso, validaCamposObrigatorios, registroDuplicado } = require("../../Models/Common");
const { validaUsuario, validaSenha } = require("../../Models/Usuario");

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

    if (request.input('nome') == null || request.input('usuario') == null || request.input('senha') == null) {
      validaCamposObrigatorios(session, response)
    } else if (request.input('senha') != request.input('cnf_senha')) {
      validaSenha(session, response)
    } else {
      try {
        await usuario.save()

        validaSucesso(params, session, 'Usuário')
        return response.redirect('/usuarios')
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          registroDuplicado(session, response, 'username')
        }
      }
    }
  }

  async alterar({ session, response, params, view }) {
    const usuario = await Usuario.find(params.id)

    validaUsuario(session, response, usuario, 'alterar')
    return view.render('usuarios/alterar', { usuario: usuario.toJSON() })
  }

  async detalhar({ session, response, params, view }) {
    const usuario = await Usuario.find(params.id)

    validaUsuario(session, response, usuario, 'detalhar')
    return view.render('usuarios/detalhar', { usuario: usuario.toJSON() })
  }
}

module.exports = UsuarioController
