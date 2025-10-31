import { User } from '../models/user.models.js';
import { UserDataBaseRepository } from '../repository/user.repository.js';

const database = new UserDataBaseRepository('database/users.db.json');

export const UserController = {
  getById: async (req, res) => {
    const id = req.params.id;
    console.log(`ID enviado x parametro -> ${id}`);

    try {
      const responseData = await database.getById(id);

      res.json({
        status: 200,
        OK: true,
        message: 'Existe el usuario',
        playload: responseData,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: `No existe usuario para ID -> ${id}`,
      });
      return;
    }
  },

  createUser: async (req, res) => {
    const { id, mail, password, name } = req.body;

    const newUser = new User(id, mail, password, name);
    const result = await database.createUser(newUser);

    res.json({
      status: 200,
      OK: true,
      message: 'Usuario creado',
      payload: result,
    });
    return;
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await database.getById(id);

      database.deleteUser(user);

      res.json({
        status: 200,
        OK: true,
        message: `Usuario ID -> ${user.id} eliminado de la base de datos`,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
      return;
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { mail, password, name } = req.body;

    try {
      const user = await database.getById(id);

      user.mail = mail ?? user.mail;
      user.password = password ?? user.password;
      user.name = name ?? user.name;

      const { oldDataUser, newDataUser } = await database.updateUser(user);

      res.json({
        status: 200,
        OK: true,
        oldDataUser,
        newDataUser,
      });
    } catch (error) {
      res.json({
        status: 400,
        OK: false,
        message: error.message,
      });
      return;
    }
  },
};
