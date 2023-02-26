import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async store({request}: HttpContextContract) {
        const book = new Book()
        book.title = request.input('title')
        book.author = request.input('author')
        book.editorial = request.input('editorial')
        book.format = request.input('format')
        book.pages = request.input('pages')
        book.iduser = request.input('iduser')
        await book.save()
        return {
            'Libro': book,
            'msg': 'Registro ingresado correctamente',
            'estado': 200
        }
    }

    public async index() {
        const books = await Book.query()
        return books;
    }

    public async show({params}: HttpContextContract) {
        try {
            const book = await Book.find(params.id)
            if (book) {
                return book
            }
            else {
                return ('Registro no existe')
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    public async update({request,params,auth}: HttpContextContract) {
        if (auth.user?.id != 0 && auth.user?.id != 1) {
            return {
                'msg':'Credenciales no validas'
            }
        }
        const book = await Book.find(params.id)
        if (book) {
            book.title = request.input('title')
            book.author = request.input('author')
            book.editorial = request.input('editorial')
            book.format = request.input('format')
            book.pages = request.input('pages')
            book.iduser = request.input('iduser')

            if (await book.save()) {
                return {
                    'msg': 'Actualizado correctamente',
                    book
                }
            }
            return ({
                'msg': 'No se pudo actualizar',
                'estado': 401
            })
        }
        return ({
            'msg': 'Registro no encontrado',
            'estado': 401
        })
    }

    public async eliminarLibro({params,auth}: HttpContextContract) {
        if (auth.user?.id != 0 && auth.user?.id != 1) {
            return {
                'msg':'Credenciales no validas'
            }
        }
        const book = await Book.find(params.id)
        if (book) {
            await book.delete()
            return {
                'msg': 'Actualizado correctamente',
                book
            }
            
        }
        return ({
            'msg': 'Registro no encontrado',
            'estado': 401
        })
    }
}
