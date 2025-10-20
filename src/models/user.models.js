export class User {
  constructor(id = null, mail, password, name) {
    this.id = id ?? randomBytes(4).toString('hex');
    this.mail = mail;
    this.password = password;
    this.name = name;
    this.createdAt = this.createdAt = new Date();
  }
}
