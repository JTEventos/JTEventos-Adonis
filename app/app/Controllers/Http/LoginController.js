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

        console.log(usuario.usuario)
        console.log(usuario.senha)

        if (usuario.usuario == "admin" && usuario.senha == "12345") {
            console.log("Logado com sucesso!")
            response.redirect('/eventos')
        } else {
            console.log("Usuário ou senha inválidos")
        }


        //session.put('usuario', 'Fulano')
        //response.redirect('back')
    }

    async logout({response, session}) {
        let usuario = session.get('usuario')
        if (usuario) {
            session.clear();
        }
        response.redirect('back')
    }
}

module.exports = LoginController
