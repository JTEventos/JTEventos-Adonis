'use strict'

const LoginController = use('App/Controllers/Http/LoginController')
const Cliente = use('App/Models/Cliente')

class ClienteController {
  async listar({ view, session, response }) {
    LoginController.logado(session, response)

    const clientes = await Cliente.all();

    return view.render('clientes/listar', { clientes: clientes.toJSON() })
  }

  async cadastrar({ view }) {
    return view.render('clientes/cadastrar')
  }

  async salvar({ params, request, response, session }) {
    let cliente = new Cliente()

    if (params.id) {
      cliente = await Cliente.find(params.id)
    }

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

    if (params.id) {
      session.flash({notificacao: 'Cliente alterado com sucesso!'})
    } else {
      session.flash({notificacao: 'Cliente cadastrado com sucesso!'})
    }

    return response.redirect('/clientes')
  }

  async deletar({ params, session, response }) {
    const cliente = await Cliente.find(params.id)

    await cliente.delete()
    session.flash({ notificacao: 'Cliente removido com sucesso!' })

    return response.redirect('/clientes')
  }

  async alterar({ params, view }) {
    const cliente = await Cliente.find(params.id)

    return view.render('clientes/alterar', { cliente: cliente.toJSON() })
  }

  async detalhar({ params, view }) {
    const cliente = await Cliente.find(params.id)

    return view.render('clientes/detalhar', { cliente: cliente.toJSON() })
  }
}

module.exports = ClienteController
