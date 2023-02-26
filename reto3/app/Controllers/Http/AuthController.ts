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
        const surname = request.input('surname')
        const perfil = request.input('perfil')
        const type = request.input('type')
        const identity = request.input('identity')
        const address = request.input('address')
        const barrio = request.input('barrio')
        const municipio = request.input('municipio')
        const departamento = request.input('departamento')
        const email = request.input('email')
        const password = request.input('password')

        console.log(surname)

        const user = new User()
        user.email = email
        user.password = password
        user.name = name
        user.surname = surname
        user.perfil = perfil
        user.type = type
        user.identity = identity
        user.address = address
        user.barrio = barrio
        user.municipio = municipio
        user.departamento = departamento
        await user.save()

        const token = await auth.use('api').login(user,{
            expiresIn: '10 days',
        })

        return {
            token,
            'msg': 'Usuario registrado correctamente'
        }
    }

    public async listarTodo({auth}: HttpContextContract) {
        if (auth.user?.perfil == 0) {
            const users = await User.all()
            return users;
        }
        return {
            'msg':'Credenciales no validas'
        }
    }

    public async listarId({params,auth}: HttpContextContract) {
        if (auth.user?.perfil == 0) {
            const search = params.id
            const user = await User.find(search)
            if (user) { 
                return user
            }
            else {
                return {
                    'msg':'Registro no existente'
                }
            }
        }
        return {
            'msg':'Credenciales no validas'
        }
    }

    public async editarUsuario({request,params,auth}: HttpContextContract) {
        if (auth.user?.perfil == 0) {
            const search = params.id;
            const name = request.input('name')
            const surname = request.input('surname')
            const perfil = request.input('perfil')
            const type = request.input('type')
            const identity = request.input('identity')
            const address = request.input('address')
            const barrio = request.input('barrio')
            const municipio = request.input('municipio')
            const departamento = request.input('departamento')
            const email = request.input('email')
            const password = request.input('password')

            const user = await User.find(search)
            if (user) {
                user.email = email
                user.password = password
                user.name = name
                user.surname = surname
                user.perfil = perfil
                user.type = type
                user.identity = identity
                user.address = address
                user.barrio = barrio
                user.municipio = municipio
                user.departamento = departamento

                if (await user.save()) {
                    return {
                        'msg':'Actualizado correctamente'
                    }
                }
                return {
                    'msg':'No se pudo actualizar',
                    'status':401
                }
            }
            return {
                'msg':'Usuario no existente'
            }
        }
        return {
            'msg':'Credenciales no validas'
        }
    }

    public async eliminarUsuario({params,auth}: HttpContextContract) {
        if (auth.user?.perfil == 0) {
            const search = params.id
            const user = await User.find(search)
            if (user) { 
                await user.delete()
                return {
                    'msg':'Usuario eliminado'
                }
            }
            else {
                return {
                    'msg':'Registro no existente'
                }
            }
        }
        return {
            'msg':'Credenciales no validas'
        }
    }
}
