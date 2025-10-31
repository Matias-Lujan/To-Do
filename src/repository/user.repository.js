import fs from 'fs/promises';
import { User } from '../models/user.models.js';

export class UserDataBaseRepository {
  constructor(path) {
    this.path = path;
  }

  async getAllData() {
    const data = await fs.readFile(this.path, { encoding: 'utf8' });
    return await JSON.parse(data);
  }

  async getById(id) {
    let data = await this.getAllData();
    if (!data) throw error('No hay datos');

    const filteredData = data.filter((user) => user.id == id);
    if (!filteredData || filteredData.length === 0)
      throw error(`No existe el usuario ID -> ${idParam}`);
    const objectPlain = filteredData[0];

    const user = new User(objectPlain.id, objectPlain.mail, objectPlain.password, objectPlain.name);

    return user;
  }

  async createUser(user) {
    let data = await this.getAllData();

    data.push(user);

    await fs.writeFile(this.path, JSON.stringify(data, null, 2));

    return {
      id: user.id,
    };
  }

  async deleteUser(user) {
    const { id } = user;

    let data = await this.getAllData();

    const filteredData = data.filter((user) => user.id !== id);

    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

    return {
      idUser: id,
    };
  }

  async updateUser(user) {
    const { id } = user;

    let data = await this.getAllData();
    const filteredData = data.filter((user) => user.id !== id);
    const oldDataUser = data.filter((user) => user.id == id);

    filteredData.push(user);

    await fs.writeFile(this.path, JSON.stringify(filteredData, null, 2));

    return { oldDataUser, newDataUser: user };
  }
}
