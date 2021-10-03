'use strict'

const { validaCamposObrigatorios, validaSucesso, registroInvalido } = require("../../Models/Common")

const LoginController = use('App/Controllers/Http/LoginController')
const Evento = use('App/Models/Evento')
const Cliente = use('App/Models/Cliente')

class EventoController {

  async listar({ view, session, response }) {
    LoginController.logado(session, response)

    const eventos = await Evento.all()

    return view.render('eventos/listar', { eventos: eventos.toJSON() })
  }

  async cadastrar({ view }) {
    const clientes = await Cliente.all()

    return view.render('eventos/cadastrar', { clientes: clientes.toJSON() })
  }

  async salvar({ params, request, response, session }) {
    let evento = new Evento()

    if (params.id) {
      evento = await Evento.find(params.id)
    }

    evento.id_cliente = request.input('cliente')
    evento.nome_evento = request.input('nome')
    evento.data_inicio = request.input('dt_ini')
    evento.data_fim = request.input('dt_fim')
    evento.lista_convidados = request.input('convidados')

    if (request.input('cliente') == null || request.input('nome') == null || request.input('dt_ini') == null || request.input('dt_fim') == null) {
      validaCamposObrigatorios(session, response)
    } else {
      await evento.save()

      validaSucesso(params, session, 'Evento')
      return response.redirect('/eventos')
    }
  }

  async deletar({ params, session, response }) {
    const evento = await Evento.find(params.id)

    try {
      await evento.delete()
      session.flash({ notificacao: 'Evento removido com sucesso!' })
      return response.redirect('/eventos')
    } catch (err) {
      registroInvalido(session, response, 'Evento', '/eventos')
    }
  }

  async alterar({ session, response, params, view }) {
    const evento = await Evento.find(params.id)

    try {
      return view.render('eventos/alterar', { evento: evento.toJSON() })
    } catch (err) {
      registroInvalido(session, response, 'Evento', '/eventos')
    }
  }

  async detalhar({ session, response, params, view }) {
    const evento = await Evento.find(params.id)

    try {
      return view.render('eventos/detalhar', { evento: evento.toJSON() })
    } catch (err) {
      registroInvalido(session, response, 'Evento', '/eventos')
    }
  }
}

module.exports = EventoController
