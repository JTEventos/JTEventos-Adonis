'use strict'

const LoginController = use('App/Controllers/Http/LoginController')
const Cliente = use('App/Models/Cliente')

class ClienteController {
  async listar({ view, session, response }) {
    LoginController.logado(session, response)

    const clientes = await Cliente.all();

    return view.render('clientes/listar', { clientes: clientes.toJSON() })
  }

  async cadastrar({view}) {
    return view.render('clientes/cadastrar')
  }

  async salvar({request, response}) {
    const cliente = new Cliente()

    cliente.nome = request.input('nome')
    cliente.cpf = request.input('cpf')
    cliente.email = request.input('email')
    cliente.tel_celular = request.input('tel_celular')
    cliente.tel_fixo = request.input('tel_fixo')
    cliente.cep = request.input('cep')
    cliente.logradouro = request.input('logradouro')
    cliente.numero = request.input('numero')
    cliente.complemento = request.input('complemento')
    cliente.bairro = request.input('bairro')
    cliente.cidade = request.input('cidade')
    cliente.estado = request.input('estado')

    await cliente.save()
    return response.redirect('/clientes')
  }
}

module.exports = ClienteController
