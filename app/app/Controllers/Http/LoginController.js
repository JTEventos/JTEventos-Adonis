'use strict'

const Usuario = require("../../Models/Usuario")

class LoginController {
    async index({view, session}) {
        let usuario = session.get('usuario')
        return view.render('login', {user: usuario})
    }

    async login({request, response, session}) {
        const usuario = new Usuario;
        usuario.usuario = request.input('usuario')
        usuario.senha = request.input('senha')
        usuario.nome = 'Administrador'

        //console.log(usuario.usuario)
        //console.log(usuario.senha)

        if (usuario.usuario == "admin" && usuario.senha == "12345") {
            console.log("Logado com sucesso!")
            session.put('nome', usuario.nome)
            session.put('logado', true)
            return response.redirect('/eventos')
        } else {
            session.flash({
                notificacao: "Usuário ou senha inválidos!"
            })
            return response.redirect('back')
        }
    }

    async logout({response, session}) {
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
