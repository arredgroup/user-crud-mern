const UserController = require('../../controllers/user.controller');
const db = require('../../models/mongodb');
const User = db.user;
describe('Test de User Controller', () => {

    describe('createUser', () => {
        test('Se crea un usuario nuevo', async () => {
            const request = {
                rut: '11111111-1',
                nombre: 'Julian',
                apellido_paterno: 'Mardones',
                apellido_materno: 'Jimenez',
                fecha_nacimiento: '02-02-1989',
                fecha_contratacion: '01-10-2023'
            };
            const userSaveSpy = jest.spyOn(User.prototype, 'save').mockResolvedValueOnce(request);

            await UserController.createUser({body: request}, {
                status: jest.fn()
            });

            expect(userSaveSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('readUsers', () => {
        test('Se consultan usuarios', async () => {
            User.find = jest.fn().mockResolvedValue([]);

            await UserController.readUsers({body: {}}, {
                status: jest.fn()
            });

            expect(User.find).toHaveBeenCalledTimes(1);
        });
    });

    describe('getUserByName', () => {
        test('Se consulta un usuario', async () => {
            User.findOne = jest.fn().mockResolvedValue({});

            await UserController.getUserByName({params: {nombre: 'fake'}}, {
                status: jest.fn()
            });

            expect(User.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('getUserByRut', () => {
        test('Se consulta un usuario por rut', async () => {
            User.findOne = jest.fn().mockResolvedValue({});

            await UserController.getUserByRut({params: {rut: 'fake'}}, {
                status: jest.fn()
            });

            expect(User.findOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateUser', () => {
        test('Se intenta actualizar usuario que no existe', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);
            User.updateOne = jest.fn().mockResolvedValue({});

            await UserController.updateUser({params: {rut: 'fake'}}, {
                status: (codigo) => ({send: (message) => (message)})
            });

            expect(User.findOne).toHaveBeenCalledTimes(1);
            expect(User.updateOne).toHaveBeenCalledTimes(0);
        });
    });

    describe('updateUser', () => {
        test('Se actualiza un usuario', async () => {
            User.findOne = jest.fn().mockResolvedValue({
                rut: '11111111-1',
                nombre: 'Julian',
                apellido_paterno: 'Mardones',
                apellido_materno: 'Jimenez',
                fecha_nacimiento: '02-02-1989',
                fecha_contratacion: '01-10-2023'
            });
            User.updateOne = jest.fn().mockResolvedValue({});

            await UserController.updateUser({params: {rut: 'fake'}, body: {}}, {
                status: (codigo) => ({send: (message) => (message)})
            });

            expect(User.findOne).toHaveBeenCalledTimes(1);
            expect(User.updateOne).toHaveBeenCalledTimes(1);
        });
    });

    describe('deleteUser', () => {
        test('Se elimina un Usuario', async () => {
            User.deleteOne = jest.fn().mockResolvedValue({});

            await UserController.deleteUser({params: {rut: 'fake'}}, {
                status: jest.fn()
            });

            expect(User.deleteOne).toHaveBeenCalledTimes(1);
        });
    });
});