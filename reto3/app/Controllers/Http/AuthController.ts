import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async login({auth,request,response}: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        try {
            const token = await auth.use('api').attempt(email,password, {
                expiresIn: '30 mins',
            })
            return {
                token,
                'msg': 'Inicio de sesion de usuario correcto'
            }
        }
        catch(error) {
            return response.unauthorized('Invalid Credentials')
        }
    }


    public async register({request,auth}: HttpContextContract) {
        const name = request.input('name')
        const email = request.input('email')
        const password = request.input('password')

        const user = new User()
        user.email = email
        user.password = password
        user.name = name
        await user.save()

        const token = await auth.use('api').login(user,{
            expiresIn: '10 days',
        })

        return {
            token,
            'msg': 'Usuario registrado correctamente'
        }
    }

    public async listarTodo()
}
